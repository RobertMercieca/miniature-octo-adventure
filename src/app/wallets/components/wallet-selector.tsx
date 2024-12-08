'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Image from 'next/image';

import Heading from '@/components/common/heading';
import SelectorDialog from '@/components/common/selector-dialog';
import {
  type WalletProvider,
  supportedWalletProviders,
} from '@/app/configs/walletProviders';
import utilService from '@/app/utils/utilService';
import { useAlertStore } from '@/stores/alerts/alertStore';
import { useKeplr } from '@/app/hooks/useKeplr';
import { useWalletStore } from '@/stores/wallets/walletStore';
import { useChainStore } from '@/stores/chains/chainStore';

import styles from './wallet-selector.module.css';

export default function WalletSelector() {
  const router = useRouter();
  const alertStore = useAlertStore();
  const isWalletConnected = useWalletStore((state) =>
    state.getIsWalletConnected()
  );
  const isChainSelected = useChainStore((state) => state.getIsChainSelected());

  const { connectToKeplr } = useKeplr();

  useEffect(() => {
    if (isWalletConnected) {
      if (isChainSelected) {
        router.push('/details');
      } else {
        router.push('/');
      }
    }
  }, [isWalletConnected, router]);

  async function onProviderClick(WalletProvider: WalletProvider) {
    if (WalletProvider === 'ledger') {
      alertStore.add({
        message: 'Ledger wallet provider is not implemented!',
        type: 'danger',
      });
    } else if (WalletProvider === 'keplr') {
      await connectToKeplr();
    }
  }

  return (
    <div className={styles['container']}>
      <SelectorDialog>
        <div className={styles['inner-container']}>
          <Heading text='Choose a wallet' />
          <div className={styles['wallet-providers']}>
            {supportedWalletProviders.map((provider) => {
              return (
                <div
                  key={provider.name}
                  className={styles['provider-container']}
                  onClick={() => onProviderClick(provider.name)}
                >
                  <Image
                    src={provider.logoSrc}
                    width={40}
                    height={40}
                    style={{ width: 'auto', height: 'auto' }}
                    alt={`${provider.name.split('-')[0]} wallet logo`}
                  />
                  <span className={styles['provider-name']}>
                    {utilService.capitalizeFirstLetter(provider.name)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </SelectorDialog>
    </div>
  );
}
