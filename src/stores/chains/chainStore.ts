import { create } from 'zustand';

import { type ChainStore, type ChainOption } from './chainStoreTypes';
import api from '@/api/api';
import { processChainDetails } from './chainStore.service';
import utilService from '@/app/utils/utilService';

export const useChainStore = create<ChainStore>((set, get) => ({
  // state
  selectedChain: 'unselected',
  selectedNetwork: undefined,
  chainData: {
    status: 'NOT_SET',
    chainDetails: {},
  },

  // actions
  setSelectedChain: (chain: ChainOption) =>
    set(() => ({ selectedChain: chain })),
  setSelectedNetwork: (network?: string) => set(() => ({ selectedNetwork: network })),
  fetchChainsDetails: async () => {
    if (['FETCHING', 'SUCCESS'].includes(get().chainData.status)) {
      return;
    }

    set((state) => ({
      chainData: {
        status: 'FETCHING',
        chainDetails: state.chainData.chainDetails,
      },
    }));

    const { data } = await api.fetchChainsDetails();

    if (data) {
      const processedChainData = processChainDetails(data);
      const selectedChain = get().selectedChain;
      if (selectedChain !== 'unselected') {
        set(() => ({
          selectedNetwork: processedChainData[selectedChain].assets[0].name,
        }));
      }
      set(() => ({
        chainData: {
          status: 'SUCCESS',
          chainDetails: processedChainData,
        },
      }));
    } else {
      set(() => ({
        chainData: {
          status: 'ERROR',
          chainDetails: {},
        },
      }));
    }
  },

  // getters
  getIsChainSelected: () => get().selectedChain !== 'unselected',
  getSelectedChainNetworks: () =>
    get().chainData.chainDetails[get().selectedChain]?.assets ?? [],
  getSelectedNetwork: () =>
    !utilService.isUndefined(get().selectedNetwork)
      ? get().selectedNetwork!
      : get().chainData.chainDetails[get().selectedChain]?.assets[0]?.name,
  getAssetInformation: () => get().chainData.chainDetails[get().selectedChain]?.assets.find((asset) => asset.name === get().selectedNetwork) ?? undefined,
  getNetworkDelegators: () => {
    const selectedNetwork = get().selectedNetwork;
    if (!selectedNetwork) {
      return [];
    }

    const assetInformation = get().getAssetInformation();

    if (!assetInformation) {
      return [];
    }

    return assetInformation.delegators;
  },
  getNetworkDelegationSums: () => get().getAssetInformation()?.chartDelegationSumsChartData ?? [],
  getNetworkDelegatorCounts: () => get().getAssetInformation()?.chartDelegatorCountsChartData ?? [],
}));
