import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatPrice, formatPercentage } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface TokenHeaderProps {
  name: string;
  symbol: string;
  image?: string;
  price: number;
  priceChange24h: number;
}

export default function TokenHeader({
  name,
  symbol,
  image,
  price,
  priceChange24h,
}: TokenHeaderProps): React.JSX.Element {
  const isPositive = priceChange24h >= 0;

  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center space-x-4">
        <Link href="/">
          <Button variant="outline" size="sm">
            ← Back to Trending Pools
          </Button>
        </Link>
        <div className="flex items-center space-x-3">
          {image && (
            <div className="relative w-12 h-12">
              <Image
                src={image}
                alt={name}
                fill
                sizes="48px"
                className="rounded-full"
              />
            </div>
          )}
          <div>
            <h1 className="text-3xl font-bold">{name}</h1>
            <p className="text-lg text-muted-foreground uppercase">{symbol}</p>
          </div>
        </div>
      </div>
      <div className="text-right">
        <div className="text-3xl font-bold">{formatPrice(price)}</div>
        <Badge
          variant={isPositive ? "success" : "destructive"}
          className="mt-2"
        >
          {formatPercentage(priceChange24h)}
        </Badge>
      </div>
    </div>
  );
}
