"use client";

import React from "react";
import { useAutoRefresh } from "@/lib/hooks/use-auto-refresh";
import { useRefreshContext } from "@/lib/context/refresh-context";

interface RefreshTimerProps {
  onRefresh?: () => void;
}

const RefreshTimer = React.memo(function RefreshTimer({
  onRefresh,
}: RefreshTimerProps): React.JSX.Element {
  const { interval } = useRefreshContext();
  const { timeLeft, resetTimer } = useAutoRefresh(interval, onRefresh);

  const handleRefresh = () => {
    onRefresh?.();
    resetTimer();
  };

  return (
    <div className="flex items-center gap-3 text-sm text-muted-foreground">
      <div className="flex items-center">
        <span className="mr-2">Next refresh in:</span>
        <span className="font-medium w-8 text-left">
          {Math.ceil(timeLeft)}s
        </span>
      </div>
      <button
        onClick={handleRefresh}
        className="px-3 py-1 text-xs bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors"
      >
        Refresh Now
      </button>
    </div>
  );
});

export default RefreshTimer;
