import { useState, useCallback } from "react";

export const useRefreshAnimation = () => {
  const [isAnimating, setIsAnimating] = useState(false);

  const triggerAnimation = useCallback(() => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
    }, 300);
  }, []);

  return { isAnimating, triggerAnimation };
};
