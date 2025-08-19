import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatNumber, formatPrice } from "@/lib/utils";

interface TokenStatsProps {
  marketCap: number;
  volume24h: number;
  supply: string;
  decimals: number;
}

export default function TokenStats({
  marketCap,
  volume24h,
  supply,
  decimals,
}: TokenStatsProps): React.JSX.Element {
  const formatSupply = (supply: string, decimals: number): string => {
    const supplyNumber = parseInt(supply) / Math.pow(10, decimals);
    return formatNumber(supplyNumber);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Market Cap
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="text-2xl font-bold">{formatPrice(marketCap)}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Volume (24h)
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="text-2xl font-bold">{formatPrice(volume24h)}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total Supply
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="text-2xl font-bold">
            {formatSupply(supply, decimals)}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Decimals
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="text-2xl font-bold">{decimals}</div>
        </CardContent>
      </Card>
    </div>
  );
}
