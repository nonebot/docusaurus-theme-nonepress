import { useRef, useState, useEffect, useCallback, RefObject } from "react";

import type { useTransitionReturns } from "@theme/hooks/useTransition";

function getTransitionClasses(
  element: RefObject<HTMLElement>,
  name: string
): string[] {
  return (
    element.current.getAttribute(`data-transition-${name}`)?.split(" ") ?? []
  );
}

function nextFrame(): Promise<number> {
  return new Promise((resolve) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(resolve);
    });
  });
}

function afterTransition(element: RefObject<HTMLElement>): Promise<void> {
  return new Promise((resolve) => {
    const duration =
      Number(
        getComputedStyle(element.current)
          .transitionDuration.split(",")[0]
          .replace("s", "")
      ) * 1000;

    setTimeout(() => {
      resolve();
    }, duration);
  });
}

function useTransition<T extends HTMLElement>(): useTransitionReturns<T> {
  const element = useRef<T>(null);
  const mounted = useRef<boolean>(true);
  const [active, setActive] = useState(false);
  const [transitionClasses, setTransition] = useState<Array<string>>([]);

  const runTransition = useCallback(
    (dir: "enter" | "leave", callback: () => void = null) => {
      const activeClasses = getTransitionClasses(element, `${dir}-active`);
      const fromClasses = getTransitionClasses(element, `${dir}-from`);
      const toClasses = getTransitionClasses(element, `${dir}-to`);

      if (!mounted.current) return;
      setTransition([...activeClasses, ...fromClasses]);

      nextFrame().then(() => {
        if (!mounted.current) return;
        setTransition([...activeClasses, ...toClasses]);
        afterTransition(element).then(() => {
          if (mounted.current) {
            setTransition([]);
          }
          if (callback) callback();
        });
      });
    },
    [element, setTransition]
  );

  const enter = useCallback(() => {
    if (!mounted.current) return;
    setActive(true);
    runTransition("enter");
  }, [setActive]);

  const leave = useCallback(() => {
    runTransition("leave", () => {
      if (!mounted.current) return;
      setActive(false);
    });
  }, [setActive]);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  return { element, active, transitionClasses, enter, leave };
}

export default useTransition;
