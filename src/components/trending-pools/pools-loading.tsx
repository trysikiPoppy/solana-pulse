import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";

export default function PoolsLoading(): React.JSX.Element {
  return (
    <>
      {Array.from({ length: 5 }).map((_, index) => (
        <TableRow key={index}>
          <TableCell>
            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
          </TableCell>
          <TableCell>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="space-y-1">
                <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-3 w-12 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          </TableCell>
          <TableCell>
            <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
          </TableCell>
          <TableCell>
            <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
          </TableCell>
          <TableCell>
            <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
          </TableCell>
          <TableCell>
            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}
