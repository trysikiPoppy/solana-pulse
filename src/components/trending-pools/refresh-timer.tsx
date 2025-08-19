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
  const { timeLeft } = useAutoRefresh(interval, onRefresh);

  return (
    <div className="flex items-center text-sm text-muted-foreground">
      <span className="mr-2">Next refresh in:</span>
      <span className="font-medium w-8 text-left">{Math.ceil(timeLeft)}s</span>
    </div>
  );
});

export default RefreshTimer;
