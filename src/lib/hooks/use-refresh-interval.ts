import { useState, useCallback } from "react";

export const useRefreshInterval = () => {
  const [isFastMode, setIsFastMode] = useState(true);

  const getInterval = useCallback(() => {
    return isFastMode ? 10000 : 60000;
  }, [isFastMode]);

  const toggleInterval = useCallback(() => {
    setIsFastMode((prev) => !prev);
  }, []);

  return {
    isFastMode,
    interval: getInterval(),
    toggleInterval,
  };
};
