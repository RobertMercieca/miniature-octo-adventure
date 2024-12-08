'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useShallow } from 'zustand/shallow';

import Heading from '@/components/common/heading';
import Layout from '@/components/layout/layout';
import LineChartWrapper from '@/components/charts/line/line-chart-wrapper';
import { useChainStore } from '@/stores/chains/chainStore';

import styles from './network-delegator-counts.module.css';

export default function DelegatorCounts() {
  const router = useRouter();
  const assetInformation = useChainStore((state) =>
    state.getAssetInformation()
  );
  const delegatorCountsChartData = useChainStore(
    useShallow((state) => state.getNetworkDelegatorCounts())
  );

  useEffect(() => {
    if (!assetInformation) {
      router.push('/');
    }
  }, []);

  return (
    <Layout>
      <div className={styles['container']}>
        <Heading text='Hourly delegator counts' />
        <LineChartWrapper data={delegatorCountsChartData} />
      </div>
    </Layout>
  );
}
