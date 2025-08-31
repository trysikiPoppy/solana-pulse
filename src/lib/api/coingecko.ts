import axios from "axios";

import {
  CoinGeckoTrendingResponse,
  CoinGeckoCoinData,
} from "@/types/coingecko";

const coinGeckoApi = axios.create({
  baseURL: "https://api.coingecko.com/api/v3",
  timeout: 10000,
});

type CacheEntry<T> = { data: T; timestamp: number };
const responseCache = new Map<string, CacheEntry<unknown>>();
const CACHE_TTL_MS = 15_000;
let lastRequestMs = 0;
const MIN_INTERVAL_MS = 4000;

function makeKey(
  path: string,
  params: Record<string, string | number | boolean> = {}
): string {
  const search = new URLSearchParams(
    params as Record<string, string>
  ).toString();
  return `${path}?${search}`;
}

async function rateLimit(): Promise<void> {
  const now = Date.now();
  const delta = now - lastRequestMs;
  if (delta < MIN_INTERVAL_MS) {
    await new Promise((resolve) =>
      setTimeout(resolve, MIN_INTERVAL_MS - delta)
    );
  }
  lastRequestMs = Date.now();
}

async function getWithCache<T>(
  path: string,
  params?: Record<string, string | number | boolean>
): Promise<T> {
  const key = makeKey(path, params || {});
  const now = Date.now();
  const cached = responseCache.get(key) as CacheEntry<T> | undefined;

  if (cached && now - cached.timestamp < CACHE_TTL_MS) {
    return cached.data;
  }
  if (cached && now - lastRequestMs < MIN_INTERVAL_MS) {
    return cached.data;
  }

  await rateLimit();
  try {
    const response = await coinGeckoApi.get(path, { params });
    responseCache.set(key, { data: response.data, timestamp: Date.now() });
    return response.data as T;
  } catch (error) {
    if (cached) {
      return cached.data;
    }
    throw error;
  }
}

export const coinGeckoService = {
  async getTrendingCoins(): Promise<CoinGeckoTrendingResponse> {
    return getWithCache<CoinGeckoTrendingResponse>("/search/trending");
  },

  async getCoinData(coinId: string): Promise<CoinGeckoCoinData> {
    return getWithCache<CoinGeckoCoinData>(`/coins/${coinId}`, {
      localization: false,
      tickers: false,
      market_data: true,
      community_data: false,
      developer_data: false,
      sparkline: false,
    });
  },

  async getSolanaTokens(): Promise<CoinGeckoCoinData[]> {
    return getWithCache<CoinGeckoCoinData[]>("/coins/markets", {
      vs_currency: "usd",
      category: "solana-ecosystem",
      order: "market_cap_desc",
      per_page: 50,
      page: 1,
      sparkline: false,
      price_change_percentage: "24h",
    });
  },
};
