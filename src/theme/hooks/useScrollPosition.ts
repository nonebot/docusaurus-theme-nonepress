import { useEffect, useRef } from "react";

import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";

import type { ScrollPosition } from "@theme/hooks/useScrollPosition";

function getScrollPosition(): ScrollPosition | null {
  return ExecutionEnvironment.canUseDOM
    ? {
        scrollX: window.pageXOffset,
        scrollY: window.pageYOffset,
      }
    : null;
}

function useScrollPosition(
  effect: (
    position: ScrollPosition,
    lastPosition: ScrollPosition | null
  ) => void,
  deps = []
): void {
  const lastPositionRef = useRef<ScrollPosition | null>(getScrollPosition());

  const handleScroll = () => {
    const currentPosition = getScrollPosition()!;

    if (effect) {
      effect(currentPosition, lastPositionRef.current);
    }

    lastPositionRef.current = currentPosition;
  };

  useEffect(() => {
    const opts: AddEventListenerOptions & EventListenerOptions = {
      passive: true,
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, opts);

    return () => window.removeEventListener("scroll", handleScroll, opts);
  }, deps);
}

export default useScrollPosition;
