import { type ChainDetailsResponse } from '@/api/apiTypes';
import {
  type NetworkAssetDelegator,
  type ChainDetails,
  type ChainOption,
} from './chainStoreTypes';
import utilService from '@/app/utils/utilService';
import { type LineChartData } from '@/components/charts/line/line-chart-wrapper';

// Key corresponds to api response's chain_name, value corresponds to prettified version for user to select
export const SUPPORTED_CHAINS: Record<string, ChainOption> = {
  cosmoshub: 'Cosmoshub',
  osmosis: 'Osmosis',
  omniflixhub: 'Omniflix',
};

export function processChainDetails(
  chainDetails: ChainDetailsResponse
): Record<ChainOption, ChainDetails> {
  const validChainNames = Object.keys(SUPPORTED_CHAINS);
  const filteredChains = chainDetails.chains.filter((chain) =>
    validChainNames.includes(chain.chain_name)
  );

  return filteredChains.reduce<Record<string, ChainDetails>>((acc, curr) => {
    const apr = curr.params.calculated_apr;
    const formattedChainDetails: ChainDetails = {
      assets: curr.assets.map((asset) => {
        const price =
          asset.prices?.coingecko?.usd ?? utilService.randomNumber(1, 10);
        const commissionRate = utilService.randomNumber(5, 13);
        const totalDelegations = utilService.randomNumber(60000, 300000);
        const uniqueDelegators = utilService.randomNumber(300, 4000);

        return {
          id: crypto.randomUUID(),
          name: asset.name,
          symbol: asset.symbol,
          logo: {
            png: asset.logo_URIs?.png,
            svg: asset.logo_URIs?.svg,
          },
          price,
          apr,
          commissionRate,
          totalDelegations,
          monthlyRevenue:
            (apr * price * totalDelegations * commissionRate) / 12,
          uniqueDelegators,
          delegators: generateDelegatorsForNetwork(
            curr.bech32_prefix,
            uniqueDelegators,
            totalDelegations,
            price
          ),
          chartDelegationSumsChartData: generateChartDelegationSumsData(
            asset.symbol,
            totalDelegations,
            price
          ),
          chartDelegatorCountsChartData:
            generateChartDelegatorCountsData(uniqueDelegators),
        };
      }),
    };

    return {
      ...acc,
      [SUPPORTED_CHAINS[curr.chain_name]]: formattedChainDetails,
    };
  }, {});
}

function generateDelegatorsForNetwork(
  addressIdentifier: string,
  numberOfDelegators: number, // total token holders
  totalDelegations: number, // total supply of tokens
  tokenPrice: number
) {
  const delegators: NetworkAssetDelegator[] = [];
  let remainingDelegations = totalDelegations;

  // TODO: improve algorithm
  for (let i = 0; i < numberOfDelegators; i++) {
    const walletAddress = `${addressIdentifier}${crypto
      .randomUUID()
      .replaceAll('-', '')}`;

    if (i === numberOfDelegators - 1) {
      delegators.push({
        address: walletAddress,
        totalTokens: remainingDelegations,
        totalPrice: remainingDelegations * tokenPrice,
      });
      break;
    }

    const tokens = utilService.randomNumber(
      1,
      Math.max(1, remainingDelegations * 0.05)
    ); // max of 5% of total supply

    delegators.push({
      address: walletAddress,
      totalTokens: tokens,
      totalPrice: tokens * tokenPrice,
    });

    remainingDelegations -= tokens;
  }

  return delegators.sort((a, b) => b.totalTokens - a.totalTokens);
}

function generateChartDelegationSumsData(
  symbol: string,
  totalDelegations: number,
  tokenPrice: number
): LineChartData[] {
  const date = new Date();
  return [...Array(24).keys()].map((index) => {
    const delegations =
      index === 24
        ? totalDelegations
        : utilService.randomNumber(
            Math.trunc(totalDelegations / 2),
            Math.trunc(totalDelegations * 2)
          );
    return {
      hour: index + 1,
      date,
      symbol,
      value: delegations,
      price: delegations * tokenPrice,
    };
  });
}

function generateChartDelegatorCountsData(
  totalDelegators: number
): LineChartData[] {
  const date = new Date();
  return [...Array(24).keys()].map((index) => {
    const delegators =
      index === 24
        ? totalDelegators
        : utilService.randomNumber(
            Math.trunc(totalDelegators / 2),
            Math.trunc(totalDelegators * 2)
          );
    return {
      hour: index + 1,
      date,
      value: delegators,
    };
  });
}
