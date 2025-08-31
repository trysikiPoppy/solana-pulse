"use client";

import React, { useState } from "react";
import Header from "@/components/layout/header";
import TokenHeader from "@/components/token-details/token-header";
import TokenStats from "@/components/token-details/token-stats";
import TokenMetadata from "@/components/token-details/token-metadata";
import PriceInfo from "@/components/token-details/price-info";
import RefreshTimer from "@/components/trending-pools/refresh-timer";
import RateLimitBanner from "@/components/ui/rate-limit-banner";
import { useTokenData } from "@/lib/hooks/use-token-data";
import { useAutoRefresh } from "@/lib/hooks/use-auto-refresh";
import { useRefreshContext } from "@/lib/context/refresh-context";

interface TokenDetailsPageProps {
  tokenId: string;
}

export default function TokenDetailsPage({
  tokenId,
}: TokenDetailsPageProps): React.JSX.Element {
  const { interval } = useRefreshContext();
  const { data: tokenData, isLoading, error, refetch } = useTokenData(tokenId);
  const { timeLeft } = useAutoRefresh(interval, () => refetch());
  const [bannerClosed, setBannerClosed] = useState(false);

  const isCompletelyUnknown = tokenData?.combinedData?.name === "Unknown Token";
  const isPartiallyLoaded =
    tokenData &&
    !isCompletelyUnknown &&
    (tokenData.combinedData?.symbol === "UNKNOWN" ||
      !tokenData.combinedData?.image ||
      tokenData.combinedData?.price === 0 ||
      tokenData.combinedData?.marketCap === 0);

  const shouldShowBanner =
    !bannerClosed && !isLoading && (isCompletelyUnknown || isPartiallyLoaded);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading token data...</p>
          </div>
        </main>
      </div>
    );
  }

  if (error || !tokenData) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <p className="text-red-500 text-lg">Error loading token data</p>
            <p className="text-sm text-muted-foreground mt-2">
              {error instanceof Error ? error.message : "Token not found"}
            </p>
          </div>
        </main>
      </div>
    );
  }

  const { combinedData, solanaMetadata, raydiumPrice, coinGeckoData } =
    tokenData;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {shouldShowBanner && (
          <RateLimitBanner
            timeLeft={timeLeft}
            onClose={() => setBannerClosed(true)}
            isCompletelyUnknown={isCompletelyUnknown}
          />
        )}
        <div className="flex items-center justify-between mb-6">
          <TokenHeader
            name={combinedData.name}
            symbol={combinedData.symbol}
            image={combinedData.image}
            price={combinedData.price}
            priceChange24h={combinedData.priceChange24h}
          />
          <RefreshTimer onRefresh={() => refetch()} />
        </div>

        <TokenStats
          marketCap={combinedData.marketCap}
          volume24h={combinedData.volume24h}
          supply={combinedData.supply}
          decimals={combinedData.decimals}
        />

        <PriceInfo
          coinGeckoPrice={coinGeckoData?.market_data?.current_price?.usd}
          raydiumPrice={raydiumPrice?.price}
          source={
            coinGeckoData && raydiumPrice
              ? "both"
              : coinGeckoData
              ? "coingecko"
              : "raydium"
          }
        />

        <TokenMetadata
          tokenId={tokenId}
          name={combinedData.name}
          symbol={combinedData.symbol}
          description={solanaMetadata?.description}
          solanaData={
            solanaMetadata
              ? {
                  mint: solanaMetadata.mint,
                  decimals: solanaMetadata.decimals,
                  supply: solanaMetadata.supply,
                }
              : undefined
          }
        />
      </main>
    </div>
  );
}
