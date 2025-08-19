import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatNumber, formatPrice, formatPercentage } from "@/lib/utils";
import { CoinGeckoCoinData } from "@/types/coingecko";
import Link from "next/link";
import Image from "next/image";

interface PoolRowProps {
  token: CoinGeckoCoinData;
  rank: number;
}

const PoolRow = React.memo(function PoolRow({
  token,
  rank,
}: PoolRowProps): React.JSX.Element {
  const priceChange =
    token.price_change_percentage_24h ||
    token.market_data?.price_change_percentage_24h ||
    0;
  const isPositive = priceChange >= 0;
  const imageUrl =
    typeof token.image === "string"
      ? token.image
      : token.image?.thumb || "/placeholder-token.svg";

  return (
    <TableRow className="hover:bg-muted/50 cursor-pointer">
      <TableCell className="font-medium">{rank}</TableCell>
      <TableCell>
        <Link
          href={`/token/${token.id}`}
          className="flex items-center space-x-3"
        >
          <div className="relative w-8 h-8">
            <Image
              src={imageUrl}
              alt={token.name}
              fill
              sizes="32px"
              className="rounded-full"
            />
          </div>
          <div>
            <div className="font-medium">{token.name}</div>
            <div className="text-sm text-muted-foreground uppercase">
              {token.symbol}
            </div>
          </div>
        </Link>
      </TableCell>
      <TableCell>
        {formatPrice(
          token.current_price || token.market_data?.current_price?.usd || 0
        )}
      </TableCell>
      <TableCell>
        <Badge variant={isPositive ? "success" : "destructive"}>
          {formatPercentage(priceChange)}
        </Badge>
      </TableCell>
      <TableCell>
        {formatNumber(
          token.market_cap || token.market_data?.market_cap?.usd || 0
        )}
      </TableCell>
      <TableCell>
        {formatNumber(
          token.total_volume || token.market_data?.total_volume?.usd || 0
        )}
      </TableCell>
    </TableRow>
  );
});

export default PoolRow;
