export type WalletProvider = 'keplr' | 'ledger';

type Provider = {
  name: WalletProvider;
  logoSrc: string;
};

export const supportedWalletProviders: Provider[] = [
  {
    name: 'keplr',
    logoSrc: '/images/keplr-logo.png',
  },
  {
    name: 'ledger',
    logoSrc: '/images/ledger-logo.png',
  },
];
