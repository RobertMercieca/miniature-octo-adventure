import { useShallow } from 'zustand/react/shallow';

import { useWalletStore } from '@/stores/wallets/walletStore';
import InfoGrid, { type GridItem } from './info-grid';
import { useChainStore } from '@/stores/chains/chainStore';
import utilService from '@/app/utils/utilService';

export default function WalletAnalysis() {
  const wallet = useWalletStore((state) => state.connectedWallet);
  const assetInformation = useChainStore((state) =>
    state.getAssetInformation()
  );
  const walletInfoForNetwork = useWalletStore(
    useShallow((state) => state.getWalletInfoForNetwork())
  );

  if (!wallet || !assetInformation || !walletInfoForNetwork) {
    return null;
  }

  const gridItems: GridItem[] = [
    {
      label: 'Wallet address',
      value: wallet.address,
      spanWholeColumn: true,
    },
    {
      label: 'Native token total stake',
      value: walletInfoForNetwork.totalStakeTokens,
      indicator: assetInformation.symbol,
    },
    {
      label: 'Total stake',
      value: utilService.prettifyNumber(walletInfoForNetwork.totalStakePrice),
      indicator: '$',
      displayIndicatorBeforeValue: true,
    },
    {
      label: 'Estimated mo. rewards',
      value: walletInfoForNetwork.estMonthlyRewards.toFixed(4),
      indicator: assetInformation.symbol,
    },
  ];

  return <InfoGrid items={gridItems} />;
}
