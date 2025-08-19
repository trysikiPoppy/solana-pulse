import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface TokenMetadataProps {
  tokenId: string;
  name: string;
  symbol: string;
  description?: string;
  solanaData?: {
    mint: string;
    decimals: number;
    supply: string;
  };
}

export default function TokenMetadata({
  tokenId,
  name,
  symbol,
  description,
  solanaData,
}: TokenMetadataProps): React.JSX.Element {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Token Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground">
              Name
            </label>
            <div className="text-lg font-semibold">{name}</div>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">
              Symbol
            </label>
            <div className="text-lg font-semibold uppercase">{symbol}</div>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">
              Token ID
            </label>
            <div className="text-sm font-mono bg-muted p-2 rounded break-all">
              {tokenId}
            </div>
          </div>
          {description && (
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Description
              </label>
              <div className="text-sm mt-1">{description}</div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Solana Network Data
            <Badge variant="outline">RPC</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground">
              Mint Address
            </label>
            <div className="text-sm font-mono bg-muted p-2 rounded break-all">
              {solanaData?.mint ?? "Not on Solana"}
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">
              Decimals
            </label>
            <div className="text-lg font-semibold">
              {solanaData?.decimals ?? "—"}
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">
              Raw Supply
            </label>
            <div className="text-sm font-mono bg-muted p-2 rounded break-all">
              {solanaData?.supply ?? "—"}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
