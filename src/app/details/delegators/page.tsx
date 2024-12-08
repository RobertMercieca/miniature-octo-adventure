'use client';
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useShallow } from 'zustand/shallow';

import Layout from '@/components/layout/layout';
import DelegatorsTable, {
  type DelegatorTableColumn,
  type DelegatorTableRow,
} from './components/delegators-table';
import InfoGrid, { type GridItem } from '../components/info-grid';
import { useChainStore } from '@/stores/chains/chainStore';
import utilService from '@/app/utils/utilService';

import styles from './network-delegations.module.css';

export default function NetworkDelegations() {
  const router = useRouter();
  const assetInformation = useChainStore((state) =>
    state.getAssetInformation()
  );
  const assetDelegators = useChainStore(
    useShallow((state) => state.getNetworkDelegators())
  );

  const [page, setPage] = useState<number>(1);

  const delegatorsTableRows: () => DelegatorTableRow[] = useCallback(() => {
    return assetDelegators.map((delegator) => ({
      address: delegator.address,
      tokenAmount: delegator.totalTokens,
      priceAmount: delegator.totalPrice,
    }));
  }, [assetDelegators]);

  useEffect(() => {
    if (!assetInformation) {
      router.push('/');
    }
  }, []);

  useEffect(() => {
    setPage(1);
  }, [assetDelegators]);

  if (!assetInformation) {
    return null;
  }

  const gridItems: GridItem[] = [
    {
      label: 'APR',
      value: assetInformation.apr.toFixed(2),
      indicator: '%',
    },
    {
      label: 'Calculated monthly revenue',
      value: utilService.prettifyNumber(assetInformation.monthlyRevenue),
      indicator: '$',
      displayIndicatorBeforeValue: true,
      url: '/details/delegators/sums',
    },
    {
      label: 'Unique delegators',
      value: assetInformation.uniqueDelegators,
      url: '/details/delegators/counts',
    },
  ];

  const cols: DelegatorTableColumn[] = [
    { key: 'address', name: 'Delegator' },
    { key: 'tokenAmount', name: `Amount (${assetInformation.symbol})` },
    { key: 'priceAmount', name: 'Amount (USD)' },
  ];

  return (
    <Layout>
      <div className={styles['container']}>
        <InfoGrid items={gridItems} />
        <DelegatorsTable
          columns={cols}
          rows={delegatorsTableRows()}
          page={page}
          setPage={setPage}
        />
      </div>
    </Layout>
  );
}
