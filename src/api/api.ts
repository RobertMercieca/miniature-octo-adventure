import { type ChainDetailsResponse } from './apiTypes';

async function fetchChainsDetails(): Promise<{
  data?: ChainDetailsResponse;
  error?: unknown;
}> {
  try {
    const res = await fetch('https://chains.cosmos.directory');
    const json = await res.json();
    return { data: json, error: undefined };
  } catch (error) {
    return { data: undefined, error };
  }
}

const api = {
  fetchChainsDetails,
}

export default api;
