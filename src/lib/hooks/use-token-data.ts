import { useQuery } from "@tanstack/react-query";
import { coinGeckoService } from "../api/coingecko";
import { solanaService } from "../api/solana-rpc";
import { raydiumService } from "../api/raydium";

const TOKEN_ADDRESS_MAP: Record<string, string> = {
  tether: "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
  "usd-coin": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
  bonk: "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263",
  solana: "So11111111111111111111111111111111111111112",
  jupiter: "JUP4Fb2cqiRUcaTHdrPC8h2gNsA2ETXiPDD33WcGuJB",
  chainlink: "CWE8jPTUYhdCTZYWPTe1o5DFqfdjzWKc9WKz6rSjQUdG",
  "usd-stablecoin-usds": "5SjhLeRkqC26Uwfk3wnRfa4WyuVQdTgXo1LKMhV2bfs6",
  usde: "B8gbe1sY691cXwJze9xGt6a71bEGo1oUf9VwpQx7Xsgy",
  fartcoin: "9BB6NFEcjBCtnNLFko2FqVQBq8HHM13kCyYcdQbgpump",
};

export const useTokenData = (tokenId: string) => {
  return useQuery({
    queryKey: ["token-data", tokenId],
    queryFn: async () => {
      const solanaAddress = TOKEN_ADDRESS_MAP[tokenId];

      const [coinGeckoData, raydiumPrice, solanaMetadata] =
        await Promise.allSettled([
          coinGeckoService.getCoinData(tokenId),
          solanaAddress
            ? raydiumService.getTokenPrice(solanaAddress)
            : Promise.resolve(null),
          solanaAddress
            ? solanaService.getTokenMetadata(solanaAddress)
            : Promise.resolve(null),
        ]);

      const coinGeckoResult =
        coinGeckoData.status === "fulfilled" ? coinGeckoData.value : null;
      const raydiumResult =
        raydiumPrice.status === "fulfilled" ? raydiumPrice.value : null;
      const solanaResult =
        solanaMetadata.status === "fulfilled" ? solanaMetadata.value : null;

      return {
        coinGeckoData: coinGeckoResult,
        solanaMetadata: solanaResult,
        raydiumPrice: raydiumResult,
        combinedData: {
          id: tokenId,
          name: coinGeckoResult?.name || solanaResult?.name || "Unknown Token",
          symbol: coinGeckoResult?.symbol || solanaResult?.symbol || "UNKNOWN",
          _timestamp: Date.now(),
          image:
            (typeof coinGeckoResult?.image === "object"
              ? coinGeckoResult?.image?.large
              : coinGeckoResult?.image) || solanaResult?.image,
          price:
            raydiumResult?.price ||
            coinGeckoResult?.market_data?.current_price?.usd ||
            0,
          marketCap: coinGeckoResult?.market_data?.market_cap?.usd || 0,
          supply: solanaResult?.supply || "0",
          decimals: solanaResult?.decimals || 9,
          priceChange24h:
            coinGeckoResult?.market_data?.price_change_percentage_24h || 0,
          volume24h: coinGeckoResult?.market_data?.total_volume?.usd || 0,
        },
      };
    },
    staleTime: 120000,
    gcTime: 600000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
    enabled: !!tokenId,
  });
};
