import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";

interface PriceInfoProps {
  coinGeckoPrice?: number;
  raydiumPrice?: number;
  source: "coingecko" | "raydium" | "both";
}

export default function PriceInfo({
  coinGeckoPrice,
  raydiumPrice,
  source,
}: PriceInfoProps): React.JSX.Element {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Price Information
          <Badge variant="outline">Live Data</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {coinGeckoPrice !== undefined && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-muted-foreground">
                  CoinGecko Price
                </label>
                <Badge variant="success" className="text-xs">
                  Market Data
                </Badge>
              </div>
              <div className="text-2xl font-bold">
                {formatPrice(coinGeckoPrice)}
              </div>
            </div>
          )}

          {raydiumPrice !== undefined && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-muted-foreground">
                  Raydium Price
                </label>
                <Badge variant="outline" className="text-xs">
                  DEX Data
                </Badge>
              </div>
              <div className="text-2xl font-bold">
                {formatPrice(raydiumPrice)}
              </div>
            </div>
          )}
        </div>

        {source === "both" && coinGeckoPrice && raydiumPrice && (
          <div className="mt-4 p-3 bg-muted rounded-lg">
            <div className="text-sm text-muted-foreground mb-1">
              Price Difference
            </div>
            <div className="text-lg font-semibold">
              {Math.abs(
                ((coinGeckoPrice - raydiumPrice) / coinGeckoPrice) * 100
              ).toFixed(2)}
              %
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
