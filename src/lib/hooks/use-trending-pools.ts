import { useQuery } from "@tanstack/react-query";
import { coinGeckoService } from "../api/coingecko";

export const useTrendingPools = () => {
  const query = useQuery({
    queryKey: ["trending-pools"],
    queryFn: async () => {
      const solanaTokens = await coinGeckoService.getSolanaTokens();
      return solanaTokens.slice(0, 25);
    },
    staleTime: 60000,
    gcTime: 600_000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  });

  return query;
};
