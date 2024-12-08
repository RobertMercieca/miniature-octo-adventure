'use client';
import { useRouter } from 'next/navigation';

import { useAlertStore } from '@/stores/alerts/alertStore';
import { useWalletStore } from '@/stores/wallets/walletStore';
import utilService from '@/app/utils/utilService';

export default function ConnectWalletButton() {
  const router = useRouter();
  const alertStore = useAlertStore();

  const setConnectedWallet = useWalletStore(
    (state) => state.setConnectedWallet
  );
  const isWalletConnected = useWalletStore((state) =>
    state.getIsWalletConnected()
  );
  const provider = useWalletStore((state) => state.connectedWallet?.provider);

  async function onClick() {
    if (isWalletConnected) {
      alertStore.add({
        message: `Wallet disconnected but proper disconnection needs to be done through the ${utilService.capitalizeFirstLetter(
          provider
        )} extension.`,
        type: 'warning',
      });
      setConnectedWallet(undefined);
      return;
    }

    router.push('/wallets');
  }

  return (
    <button
      className={`${
        isWalletConnected ? 'bg-wine-red' : 'bg-sky-blue'
      } text-white sm:px-4 sm:py-2 rounded-xl font-bold sm:text-lg px-3 py-2 text-sm flex-shrink-0 z-10`}
      onClick={onClick}
    >
      {isWalletConnected ? 'Disconnect wallet' : 'Connect wallet'}
    </button>
  );
}
