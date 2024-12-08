import { create } from 'zustand';

import { WalletDetails, type WalletStore } from './walletStoreTypes';
import { useChainStore } from '../chains/chainStore';
import { generateWalletInfoForNetwork } from './walletStore.service';
import utilService from '@/app/utils/utilService';

export const useWalletStore = create<WalletStore>((set, get) => ({
  // state
  connectedWallet: undefined,
  walletNetworkInfo: {},

  // actions
  setConnectedWallet: (walletDetails?: WalletDetails) =>
    set(() => ({ connectedWallet: walletDetails })),
  setWalletInfoForNetwork: (networkName: string) => {
    const currentWalletAddress = get().connectedWallet?.address;
    if (utilService.isUndefined(currentWalletAddress)) {
      return;
    }

    // already have network info for this wallet
    if (get().walletNetworkInfo[currentWalletAddress]?.[networkName]) {
      return;
    }

    const assetInformation = useChainStore.getState().getAssetInformation();

    if (utilService.isUndefined(assetInformation)) {
      return;
    }

    const allNetworkInfoForWallet =
      get().walletNetworkInfo[currentWalletAddress];

    set(() => ({
      walletNetworkInfo: {
        ...get().walletNetworkInfo,
        [currentWalletAddress]: {
          ...allNetworkInfoForWallet,
          [networkName]: generateWalletInfoForNetwork(assetInformation),
        },
      },
    }));
  },

  // getters
  getIsWalletConnected: () => !utilService.isUndefined(get().connectedWallet),
  getWalletInfoForNetwork: () => {
    const currentWalletAddress = get().connectedWallet?.address;
    if (utilService.isUndefined(currentWalletAddress)) {
      return undefined;
    }

    const selectedChain = useChainStore.getState().selectedNetwork;
    if (!selectedChain) {
      return undefined;
    }

    return get().walletNetworkInfo[currentWalletAddress]?.[selectedChain];
  },
}));
