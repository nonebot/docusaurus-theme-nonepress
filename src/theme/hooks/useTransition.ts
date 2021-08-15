import { useRef, useState, useCallback, RefObject } from "react";

import { useTransitionReturns } from "@theme/hooks/useTransition";

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

const useTransition = <T extends HTMLElement>(): useTransitionReturns<T> => {
  const element = useRef<T>(null);
  const [active, setActive] = useState(false);
  const [transitionClasses, setTransition] = useState<Array<string>>([]);

  const runTransition = useCallback(
    async (dir: "enter" | "leave") => {
      const activeClasses = getTransitionClasses(element, `${dir}-active`);
      const fromClasses = getTransitionClasses(element, `${dir}-from`);
      const toClasses = getTransitionClasses(element, `${dir}-to`);

      setTransition([...activeClasses, ...fromClasses]);

      await nextFrame();

      setTransition([...activeClasses, ...toClasses]);

      await afterTransition(element);

      setTransition([]);
    },
    [element, setTransition]
  );

  const enter = useCallback(async () => {
    setActive(true);
    await runTransition("enter");
  }, [setActive]);

  const leave = useCallback(async () => {
    await runTransition("leave");
    setActive(false);
  }, [setActive]);

  return { element, active, transitionClasses, enter, leave };
};

export default useTransition;
