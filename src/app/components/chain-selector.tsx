'use client';
import { useRouter } from 'next/navigation';

import ConnectWalletButton from '@/components/common/connect-wallet-button';
import SelectorDialog from '@/components/common/selector-dialog';
import Heading from '@/components/common/heading';
import { type ChainOption } from '@/stores/chains/chainStoreTypes';
import { useChainStore } from '@/stores/chains/chainStore';
import { SUPPORTED_CHAINS } from '@/stores/chains/chainStore.service';
import Select from '@/components/form/select';

import styles from './chain-selector.module.css';

export default function ChainSelector() {
  const router = useRouter();
  const chainStore = useChainStore();

  function onSelectChain(value: string) {
    chainStore.setSelectedChain(value as ChainOption);
    chainStore.setSelectedNetwork(undefined);
    router.push('/details');
  }

  return (
    <div className={styles['container']}>
      <SelectorDialog>
        <div className={styles['info-container']}>
          <Heading text='Choose a network to start' />
          <span className={styles['info']}>
            Connect your wallet, then choose a network to view delegation data
            specific to that network.
          </span>
        </div>

        <div className={styles['action-container']}>
          <Select
            value='Select a chain'
            options={Object.values(SUPPORTED_CHAINS).map((chain) => ({
              id: chain,
              value: chain,
              label: chain,
            }))}
            onValueChange={(value: string) => onSelectChain(value)}
          />
          <ConnectWalletButton />
        </div>
      </SelectorDialog>
    </div>
  );
}
