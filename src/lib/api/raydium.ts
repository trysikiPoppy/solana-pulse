import axios from "axios";
import { RaydiumTokenPrice, RaydiumPoolInfo } from "@/types/raydium";

const raydiumApi = axios.create({
  baseURL: "https://api.raydium.io/v2",
  timeout: 10000,
});

export const raydiumService = {
  async getTokenPrice(tokenAddress: string): Promise<RaydiumTokenPrice | null> {
    try {
      const response = await raydiumApi.get(`/main/price`);
      const prices = response.data;

      const tokenPrice = prices[tokenAddress];
      if (!tokenPrice) {
        return null;
      }

      return {
        id: tokenAddress,
        mintSymbol: "UNKNOWN",
        vsToken: "USDC",
        vsTokenSymbol: "USDC",
        price: tokenPrice,
        volume24h: 0,
        priceChange24h: 0,
      };
    } catch (error) {
      console.error("Error fetching token price from Raydium:", error);
      return null;
    }
  },

  async getPoolInfo(poolId: string): Promise<RaydiumPoolInfo | null> {
    try {
      const response = await raydiumApi.get(`/main/pairs`);
      const pools = response.data;

      const pool = pools.find((p: RaydiumPoolInfo) => p.id === poolId);
      if (!pool) {
        return null;
      }

      return pool;
    } catch (error) {
      console.error("Error fetching pool info from Raydium:", error);
      return null;
    }
  },

  async getAllPrices(): Promise<Record<string, number>> {
    try {
      const response = await raydiumApi.get("/main/price");
      return response.data || {};
    } catch (error) {
      console.error("Error fetching all prices from Raydium:", error);
      return {};
    }
  },
};
