import { useRef, useState, useCallback, useEffect, RefObject } from "react";

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

async function runTransition(
  element: RefObject<HTMLElement>,
  dir: "enter" | "leave"
): Promise<void> {
  const activeClasses = getTransitionClasses(element, `${dir}-active`);
  const fromClasses = getTransitionClasses(element, `${dir}-from`);
  const toClasses = getTransitionClasses(element, `${dir}-to`);

  element.current.classList.add(...activeClasses);
  element.current.classList.add(...fromClasses);

  await nextFrame();

  element.current.classList.remove(...fromClasses);
  element.current.classList.add(...toClasses);

  await afterTransition(element);

  element.current.classList.remove(...toClasses);
  element.current.classList.remove(...activeClasses);
}

export default function useTransition<
  T extends HTMLElement
>(): useTransitionReturns<T> {
  const element = useRef<T>(null);
  const [active, setActive] = useState(false);

  const enter = useCallback(async () => {
    element.current.classList.remove("hidden");
    await runTransition(element, "enter");
    setActive(true);
  }, [element, setActive]);

  const leave = useCallback(async () => {
    await runTransition(element, "leave");
    setActive(false);
  }, [element, setActive]);

  // useEffect(() => {
  //   console.log(shouldEnter);
  //   if (shouldEnter) {
  //     setShouldEnter(false);
  //     runTransition(element, "enter");
  //   }
  // }, [shouldEnter]);
  return { element, active, enter, leave };
}
