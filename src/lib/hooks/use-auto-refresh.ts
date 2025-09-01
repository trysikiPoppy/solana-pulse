import { useEffect, useState } from "react";

export const useAutoRefresh = (
  refreshInterval: number,
  onRefresh?: () => void
) => {
  const [timeLeft, setTimeLeft] = useState(refreshInterval / 1000);

  useEffect(() => {
    setTimeLeft(refreshInterval / 1000);
  }, [refreshInterval]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          onRefresh?.();
          return refreshInterval / 1000;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [refreshInterval, onRefresh]);

  const getTimeUntilRefresh = (): number => {
    return timeLeft;
  };

  const resetTimer = () => {
    setTimeLeft(refreshInterval / 1000);
  };

  return {
    getTimeUntilRefresh,
    timeLeft,
    resetTimer,
  };
};
