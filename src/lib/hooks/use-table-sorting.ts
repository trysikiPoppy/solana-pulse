import { useState, useMemo } from "react";
import { CoinGeckoCoinData } from "@/types/coingecko";

export type SortField = "name" | "price" | "change" | "marketCap" | "volume";
export type SortDirection = "asc" | "desc" | null;

interface UseSortingReturn {
  sortField: SortField | null;
  sortDirection: SortDirection;
  sortedData: CoinGeckoCoinData[];
  handleSort: (field: SortField) => void;
}

export const useTableSorting = (
  data: CoinGeckoCoinData[]
): UseSortingReturn => {
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      if (sortDirection === "asc") {
        setSortDirection("desc");
      } else if (sortDirection === "desc") {
        setSortField(null);
        setSortDirection(null);
      } else {
        setSortDirection("asc");
      }
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedData = useMemo(() => {
    if (!sortField || !sortDirection) {
      return data;
    }

    return [...data].sort((a, b) => {
      let aValue: number | string;
      let bValue: number | string;

      switch (sortField) {
        case "name":
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case "price":
          aValue = a.current_price || a.market_data?.current_price?.usd || 0;
          bValue = b.current_price || b.market_data?.current_price?.usd || 0;
          break;
        case "change":
          aValue =
            a.price_change_percentage_24h ||
            a.market_data?.price_change_percentage_24h ||
            0;
          bValue =
            b.price_change_percentage_24h ||
            b.market_data?.price_change_percentage_24h ||
            0;
          break;
        case "marketCap":
          aValue = a.market_cap || a.market_data?.market_cap?.usd || 0;
          bValue = b.market_cap || b.market_data?.market_cap?.usd || 0;
          break;
        case "volume":
          aValue = a.total_volume || a.market_data?.total_volume?.usd || 0;
          bValue = b.total_volume || b.market_data?.total_volume?.usd || 0;
          break;
        default:
          return 0;
      }

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDirection === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      const numA = Number(aValue);
      const numB = Number(bValue);

      return sortDirection === "asc" ? numA - numB : numB - numA;
    });
  }, [data, sortField, sortDirection]);

  return {
    sortField,
    sortDirection,
    sortedData,
    handleSort,
  };
};
