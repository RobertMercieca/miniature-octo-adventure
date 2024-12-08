export type ChainDetailsResponse = {
  repository: Repository;
  chains: ChainDetails_Raw[];
};

type Repository = {
  url: string;
  branch: string;
  commit: string;
  timestamp: number;
};

type ChainDetails_Raw = {
  name: string;
  path: string;
  chain_name: string;
  network_type: string;
  pretty_name: string;
  chain_id: string;
  status: string;
  bech32_prefix: string;
  slip44: number;
  symbol: string;
  display: string;
  denom: string;
  decimals: number;
  image: string;
  website: string;
  height: number;
  best_apis: BestApis;
  proxy_status: ProxyStatus;
  versions: Versions;
  explorers: Explorer[];
  params: Params;
  assets: ChainAsset_Raw[];
};

type BestApis = {
  rest: Rest[];
  rpc: Rpc[];
};

type Rest = {
  address: string;
  provider: string;
};

type Rpc = {
  address: string;
  provider: string;
};

type ProxyStatus = {
  rest: boolean;
  rpc: boolean;
};

type Versions = {
  cosmos_sdk_version: string;
  tendermint_version: string;
  application_version: string;
};

type Explorer = {
  kind: string;
  url: string;
  tx_page: string;
  account_page: string;
};

type Params = {
  authz: boolean;
  actual_block_time: number;
  actual_blocks_per_year: number;
  current_block_height: string;
  unbonding_time: number;
  max_validators: number;
  bonded_tokens: string;
  staking: Staking;
  slashing: Slashing;
  blocks_per_year: number;
  block_time: number;
  base_inflation: number;
  mint: Mint;
  community_tax: number;
  distribution: Distribution;
  annual_provision: string;
  estimated_apr: number;
  calculated_apr: number;
};

type Staking = {
  unbonding_time: string;
  max_validators: number;
  max_entries: number;
  historical_entries: number;
  bond_denom: string;
  min_commission_rate: string;
};

type Slashing = {
  signed_blocks_window: string;
  min_signed_per_window: string;
  downtime_jail_duration: string;
  slash_fraction_double_sign: string;
  slash_fraction_downtime: string;
};

type Mint = {
  mint_denom: string;
  inflation_rate_change: string;
  inflation_max: string;
  inflation_min: string;
  goal_bonded: string;
  blocks_per_year: string;
};

type Distribution = {
  community_tax: string;
  base_proposer_reward: string;
  bonus_proposer_reward: string;
  withdraw_addr_enabled: boolean;
};

type ChainAsset_Raw = {
  name: string;
  description: string;
  symbol: string;
  denom: string;
  decimals: number;
  base: DenomUnit;
  display: DenomUnit;
  denom_units: DenomUnit[];
  logo_URIs: {
    png?: string;
    svg?: string;
  };
  prices: {
    coingecko: {
      usd: number;
    };
  };
  image: string;
};

type DenomUnit = {
  denom: string;
  exponent: number;
};
