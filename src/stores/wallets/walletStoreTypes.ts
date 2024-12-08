import { type WalletProvider } from '@/app/configs/walletProviders';

export type WalletDetails = {
  name: string;
  address: string;
  provider: WalletProvider;
};

export type WalletNetworkInfo = {
  totalStakeTokens: number;
  totalStakePrice: number;
  estMonthlyRewards: number;
};

export type WalletStore = {
  // state
  connectedWallet?: WalletDetails;
  walletNetworkInfo: Record<string, Record<string, WalletNetworkInfo>>; // wallet address -> network name -> network info

  // actions
  setConnectedWallet: (walletDetails?: WalletDetails) => void;
  setWalletInfoForNetwork: (networkName: string) => void;

  // getters
  getIsWalletConnected: () => boolean;
  getWalletInfoForNetwork: () => WalletNetworkInfo | undefined;
};
