import utilService from "@/app/utils/utilService";
import { type NetworkAsset } from "../chains/chainStoreTypes";
import { type WalletNetworkInfo } from "./walletStoreTypes";

export function generateWalletInfoForNetwork(assetInformation: NetworkAsset): WalletNetworkInfo {
  const totalStakeTokens = utilService.randomNumber(1, 400);
  const totalStakePrice = assetInformation.price * totalStakeTokens;

  const monthlyApr = assetInformation.apr / 12;
  const rewards = monthlyApr * totalStakeTokens;
  const estMonthlyTokens = rewards * (1 - (assetInformation.commissionRate / 100 ));
  const estMonthlyRewards = estMonthlyTokens * assetInformation.price;

  return {
    totalStakeTokens,
    totalStakePrice,
    estMonthlyRewards,
  }
}