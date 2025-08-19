"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTrendingPools } from "@/lib/hooks/use-trending-pools";
import { useTableSorting } from "@/lib/hooks/use-table-sorting";
import { useRefreshAnimation } from "@/lib/hooks/use-refresh-animation";

import PoolRow from "./pool-row";
import PoolsLoading from "./pools-loading";
import RefreshTimer from "./refresh-timer";
import SortIcon from "@/components/ui/sort-icon";

export default function PoolsTable(): React.JSX.Element {
  const {
    data: tokens = [],
    isLoading,
    error,
    dataUpdatedAt,
    refetch,
  } = useTrendingPools();
  const { sortField, sortDirection, sortedData, handleSort } =
    useTableSorting(tokens);
  const { isAnimating, triggerAnimation } = useRefreshAnimation();

  React.useEffect(() => {
    if (tokens.length > 0) {
      triggerAnimation();
    }
  }, [dataUpdatedAt, tokens.length, triggerAnimation]);

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">Error loading trending pools</p>
        <p className="text-sm text-muted-foreground mt-2">
          {error instanceof Error ? error.message : "Unknown error"}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Trending Solana Pools</h2>
        <RefreshTimer onRefresh={() => refetch()} />
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">#</TableHead>
              <TableHead
                className="cursor-pointer hover:bg-muted/50 select-none"
                onClick={() => handleSort("name")}
              >
                <div className="flex items-center">
                  Token
                  <SortIcon
                    direction={sortField === "name" ? sortDirection : null}
                  />
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer hover:bg-muted/50 select-none"
                onClick={() => handleSort("price")}
              >
                <div className="flex items-center">
                  Price
                  <SortIcon
                    direction={sortField === "price" ? sortDirection : null}
                  />
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer hover:bg-muted/50 select-none"
                onClick={() => handleSort("change")}
              >
                <div className="flex items-center">
                  24h Change
                  <SortIcon
                    direction={sortField === "change" ? sortDirection : null}
                  />
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer hover:bg-muted/50 select-none"
                onClick={() => handleSort("marketCap")}
              >
                <div className="flex items-center">
                  Market Cap
                  <SortIcon
                    direction={sortField === "marketCap" ? sortDirection : null}
                  />
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer hover:bg-muted/50 select-none"
                onClick={() => handleSort("volume")}
              >
                <div className="flex items-center">
                  Volume (24h)
                  <SortIcon
                    direction={sortField === "volume" ? sortDirection : null}
                  />
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody
            className={`transition-opacity duration-300 ease-in-out ${
              isAnimating ? "opacity-50" : "opacity-100"
            }`}
          >
            {isLoading ? (
              <PoolsLoading />
            ) : (
              sortedData.map((token, index) => (
                <PoolRow key={token.id} token={token} rank={index + 1} />
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
