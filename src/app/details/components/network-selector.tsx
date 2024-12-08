import { useCallback, useEffect, useMemo } from 'react';
import { useShallow } from 'zustand/react/shallow';

import Heading from '@/components/common/heading';
import { useChainStore } from '@/stores/chains/chainStore';
import SelectorDialog from '@/components/common/selector-dialog';
import Select, { type SelectValue } from '@/components/form/select';
import { useWalletStore } from '@/stores/wallets/walletStore';

import styles from './network-selector.module.css';

export default function NetworkSelector() {
  const chainStore = useChainStore();
  const walletStore = useWalletStore();
  const selectedNetwork = useChainStore((state) => state.getSelectedNetwork());
  const availableNetworksForSelectedChain = useChainStore(
    useShallow((state) => state.getSelectedChainNetworks())
  );
  const isWalletConnected = useWalletStore((state) =>
    state.getIsWalletConnected()
  );

  const formatNetworkSelectOptions = useCallback(() => {
    return availableNetworksForSelectedChain.map((network) => ({
      id: network.id,
      value: network.name,
      label: formatNetworkName(network.name, network.symbol),
      info: network.symbol,
      logo: network.logo?.png ?? network.logo?.svg ?? undefined,
    }));
  }, [availableNetworksForSelectedChain]);

  const networkSelectOptions = useMemo(
    () => formatNetworkSelectOptions(),
    [formatNetworkSelectOptions]
  );

  useEffect(() => {
    onNetworkSelect(selectedNetwork);
  }, []);

  function onNetworkSelect(value: string) {
    chainStore.setSelectedNetwork(value);
    if (isWalletConnected) {
      walletStore.setWalletInfoForNetwork(value);
    }
  }

  function formatNetworkName(name: string, symbol: string): string {
    const splitLowerName = name.toLowerCase().split(' ');

    if (splitLowerName.length === 1) {
      return name;
    }

    const indexOfSymbolInName = splitLowerName.indexOf(symbol.toLowerCase());

    if (indexOfSymbolInName === -1) {
      return name;
    }

    const splitName = name.split(' ');
    splitName.splice(indexOfSymbolInName, 1);
    return splitName.join(' ');
  }

  function selectValue(): SelectValue {
    const networkDetails = networkSelectOptions.find(
      (network) => network.value === selectedNetwork
    );

    if (!networkDetails) {
      return selectedNetwork;
    }

    return {
      label: networkDetails.label,
      logo: networkDetails.logo,
      info: networkDetails.info,
    };
  }

  return (
    <SelectorDialog size='small'>
      <div className={styles['container']}>
        <Heading text='Network' />

        <Select
          value={selectValue()}
          valueColour={'#F3F5F9'}
          options={networkSelectOptions}
          onValueChange={(value: string) => onNetworkSelect(value)}
        />
      </div>
    </SelectorDialog>
  );
}
