import React from "react";
import { SortDirection } from "@/lib/hooks/use-table-sorting";

interface SortIconProps {
  direction: SortDirection;
}

const SortIcon = React.memo(function SortIcon({
  direction,
}: SortIconProps): React.JSX.Element {
  return (
    <div className="inline-flex flex-col ml-1">
      <svg
        className={`w-3 h-3 ${
          direction === "asc" ? "text-blue-500" : "text-gray-300"
        }`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
          clipRule="evenodd"
        />
      </svg>
      <svg
        className={`w-3 h-3 -mt-1 ${
          direction === "desc" ? "text-blue-500" : "text-gray-300"
        }`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );
});

export default SortIcon;
