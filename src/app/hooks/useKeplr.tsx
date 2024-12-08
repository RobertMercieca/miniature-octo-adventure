import { useEffect } from 'react';
import { Window as KeplrWindow } from '@keplr-wallet/types';
import { type Keplr } from '@keplr-wallet/types';

import { useAlertStore } from '@/stores/alerts/alertStore';
import { useWalletStore } from '@/stores/wallets/walletStore';
import { useChainStore } from '@/stores/chains/chainStore';

const KEPLR_CHAIN_ID = 'cosmoshub-4';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface Window extends KeplrWindow {} // @typescript-eslint/no-empty-object-type
}

export function useKeplr() {
  const alertStore = useAlertStore();
  const walletStore = useWalletStore();
  const chainStore = useChainStore();

  useEffect(() => {
    window.addEventListener('keplr_keystorechange', onWalletChange);
  }, []);

  async function getKeplr(): Promise<Keplr | undefined> {
    if (window.keplr) {
      return window.keplr;
    }

    if (document.readyState === 'complete') {
      return window.keplr;
    }

    return new Promise((resolve) => {
      const documentStateChange = (event: Event) => {
        if (
          event.target &&
          (event.target as Document).readyState === 'complete'
        ) {
          resolve(window.keplr);
          document.removeEventListener('readystatechange', documentStateChange);
        }
      };

      document.addEventListener('readystatechange', documentStateChange);
    });
  }

  async function connectToKeplr() {
    const keplr = await getKeplr();
    if (!keplr) {
      alertStore.add({
        message:
          'Install the keplr extension to be able to connect your wallet.',
        type: 'warning',
      });
      return;
    }

    try {
      const key = await keplr.getKey(KEPLR_CHAIN_ID);

      walletStore.setConnectedWallet({
        name: key.name,
        address: key.bech32Address,
        provider: 'keplr',
      });

      alertStore.add({
        message: `Successfully connected to wallet: ${key.name}`,
        type: 'success',
      });
    } catch (error) {
      console.error(error);
      walletStore.setConnectedWallet(undefined);
      alertStore.add({
        message: 'Wallet connection unsuccessful, try again later!',
        type: 'danger',
      });
    }
  }

  async function onWalletChange() {
    const keplr = await getKeplr();

    if (!keplr) {
      return;
    }

    try {
      const key = await keplr.getKey(KEPLR_CHAIN_ID);

      walletStore.setConnectedWallet({
        name: key.name,
        address: key.bech32Address,
        provider: 'keplr',
      });

      walletStore.setWalletInfoForNetwork(chainStore.getSelectedNetwork());

      alertStore.add({
        message: `Wallet changed, statistics will now be shown for wallet: ${key.name}`,
        type: 'success',
      });
    } catch (error) {
      console.error(error);
      walletStore.setConnectedWallet(undefined);
      alertStore.add({
        message: 'Wallet connection unsuccessful, try again later!',
        type: 'danger',
      });
    }
  }

  return { connectToKeplr };
}
