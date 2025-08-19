import React from "react";
import { X } from "lucide-react";
import { Button } from "./button";

interface RateLimitBannerProps {
  timeLeft: number;
  onClose: () => void;
  isCompletelyUnknown?: boolean;
}

export default function RateLimitBanner({
  timeLeft,
  onClose,
  isCompletelyUnknown = false,
}: RateLimitBannerProps): React.JSX.Element {
  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <span className="text-yellow-400 text-xl">⚠️</span>
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-800">
              <span className="font-medium">
                {isCompletelyUnknown
                  ? "CoinGecko rate limit exceeded."
                  : "Data incomplete, updating..."}
              </span>{" "}
              {isCompletelyUnknown
                ? "Data will refresh in:"
                : "Next update in:"}{" "}
              <span className="font-bold">{Math.ceil(timeLeft)}s</span>
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="text-yellow-800 hover:text-yellow-900"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
