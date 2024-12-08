import { LineChartData } from "@/components/charts/line/line-chart-wrapper";

export type ChainOption = 'Cosmoshub' | 'Osmosis' | 'Omniflix';

type DATA_STATUS =  'FETCHING' | 'SUCCESS' | 'ERROR' | 'NOT_SET';

export type NetworkLogo = Record<'png' | 'svg', string | undefined>;

export type NetworkAssetDelegator = {
  address: string;
  totalTokens: number;
  totalPrice: number;
}

export type NetworkAsset = {
  id: string;
  name: string;
  symbol: string;
  logo: NetworkLogo;
  apr: number;
  commissionRate: number;
  totalDelegations: number;
  uniqueDelegators: number;
  monthlyRevenue: number;
  price: number;
  delegators: NetworkAssetDelegator[];
  chartDelegationSumsChartData: LineChartData[];
  chartDelegatorCountsChartData: LineChartData[];
}

export type ChainDetails = {
  assets: NetworkAsset[];
}

export type ChainStore = {
  // state
  selectedChain: ChainOption | 'unselected';
  selectedNetwork?: string;
  chainData: {
    status: DATA_STATUS;
    chainDetails: Record<string, ChainDetails>;
  };

  // actions
  setSelectedChain: (chain: ChainOption) => void;
  setSelectedNetwork: (network?: string) => void;
  fetchChainsDetails: () => Promise<void>;

  // getters
  getIsChainSelected: () => boolean;
  getSelectedChainNetworks: () => NetworkAsset[];
  getSelectedNetwork: () => string;
  getAssetInformation: () => NetworkAsset | undefined;
  getNetworkDelegators: () => NetworkAssetDelegator[];
  getNetworkDelegationSums: () => LineChartData[];
  getNetworkDelegatorCounts: () => LineChartData[];
}