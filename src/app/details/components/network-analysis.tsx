import { useChainStore } from '@/stores/chains/chainStore';
import InfoGrid, { GridItem } from './info-grid';
import utilService from '@/app/utils/utilService';

export default function NetworkAnalysis() {
  const assetInformation = useChainStore((state) =>
    state.getAssetInformation()
  );

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
      label: 'Token Price',
      value: assetInformation.price.toFixed(2),
      indicator: '$',
      displayIndicatorBeforeValue: true,
    },
    {
      label: 'Total delegations',
      value: utilService.prettifyNumber(assetInformation.totalDelegations),
      indicator: assetInformation.symbol,
      url: '/details/delegators',
    },
    {
      label: 'Commission Rate',
      value: assetInformation.commissionRate.toFixed(2),
      indicator: '%',
    },
    {
      label: 'Calculated monthly revenue',
      value: utilService.prettifyNumber(assetInformation.monthlyRevenue),
      indicator: '$',
      displayIndicatorBeforeValue: true,
    },
    {
      label: 'Unique delegators',
      value: assetInformation.uniqueDelegators,
      url: '/details/delegators',
    },
  ];

  return <InfoGrid items={gridItems} />;
}
