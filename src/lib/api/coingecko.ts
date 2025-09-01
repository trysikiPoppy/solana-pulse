import axios from "axios";

import {
  CoinGeckoTrendingResponse,
  CoinGeckoCoinData,
} from "@/types/coingecko";

const coinGeckoApi = axios.create({
  baseURL: "https://api.coingecko.com/api/v3",
  timeout: 10000,
});

let lastRequestMs = 0;
const MIN_INTERVAL_MS = 4000;

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

async function apiRequest<T>(
  path: string,
  params?: Record<string, string | number | boolean>
): Promise<T> {
  await rateLimit();
  const response = await coinGeckoApi.get(path, { params });
  return response.data as T;
}

export const coinGeckoService = {
  async getTrendingCoins(): Promise<CoinGeckoTrendingResponse> {
    return apiRequest<CoinGeckoTrendingResponse>("/search/trending");
  },

  async getCoinData(coinId: string): Promise<CoinGeckoCoinData> {
    return apiRequest<CoinGeckoCoinData>(`/coins/${coinId}`, {
      localization: false,
      tickers: false,
      market_data: true,
      community_data: false,
      developer_data: false,
      sparkline: false,
    });
  },

  async getSolanaTokens(): Promise<CoinGeckoCoinData[]> {
    return apiRequest<CoinGeckoCoinData[]>("/coins/markets", {
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
