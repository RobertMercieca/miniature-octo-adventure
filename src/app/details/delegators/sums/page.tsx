'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useShallow } from 'zustand/shallow';

import Heading from '@/components/common/heading';
import Layout from '@/components/layout/layout';
import LineChartWrapper from '@/components/charts/line/line-chart-wrapper';
import { useChainStore } from '@/stores/chains/chainStore';

import styles from './network-delegation-sums.module.css';

export default function DelegatorSums() {
  const router = useRouter();
  const assetInformation = useChainStore((state) =>
    state.getAssetInformation()
  );
  const delegationSumChartData = useChainStore(
    useShallow((state) => state.getNetworkDelegationSums())
  );

  useEffect(() => {
    if (!assetInformation) {
      router.push('/');
    }
  }, []);

  return (
    <Layout>
      <div className={styles['container']}>
        <Heading text='Hourly delegation sums' />
        <LineChartWrapper data={delegationSumChartData} />
      </div>
    </Layout>
  );
}
