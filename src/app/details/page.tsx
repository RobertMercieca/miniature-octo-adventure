'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useChainStore } from '@/stores/chains/chainStore';
import Layout from '@/components/layout/layout';
import NetworkAnalysis from './components/network-analysis';
import NetworkSelector from './components/network-selector';
import WalletAnalysis from './components/wallet-analysis';
import { useWalletStore } from '@/stores/wallets/walletStore';
import Loader from '@/components/common/loader';

import styles from './chain-details.module.css';

export default function ChainDetails() {
  const router = useRouter();
  const chainStore = useChainStore();
  const walletStore = useWalletStore();
  const isLoading = useChainStore(
    (state) => state.chainData.status === 'FETCHING'
  );
  const isWalletConnected = useWalletStore((state) =>
    state.getIsWalletConnected()
  );
  const selectedChain = useChainStore((state) => state.selectedChain);

  useEffect(() => {
    if (chainStore.selectedChain === 'unselected') {
      router.push('/');
      return;
    }

    chainStore.fetchChainsDetails().then(() => {
      if (isWalletConnected) {
        const selectedNetwork = chainStore.getSelectedNetwork();
        walletStore.setWalletInfoForNetwork(selectedNetwork);
      }
    });
  }, []);

  useEffect(() => {
    if (isWalletConnected) {
      const selectedNetwork = chainStore.getSelectedNetwork();
      walletStore.setWalletInfoForNetwork(selectedNetwork);
    }
  }, [selectedChain]);

  if (isLoading)
    return (
      <Layout>
        <Loader />
      </Layout>
    );

  return (
    <Layout>
      <div className={styles['container']}>
        <NetworkSelector />

        <div className={styles['analysis-container']}>
          <NetworkAnalysis />
          {isWalletConnected && <WalletAnalysis />}
        </div>
      </div>
    </Layout>
  );
}
