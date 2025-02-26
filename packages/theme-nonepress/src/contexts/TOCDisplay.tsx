import React, {
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { ReactContextError } from "@docusaurus/theme-common";
import { useWindowSize } from "@nullbot/docusaurus-theme-nonepress/client";

type ContextValue = {
  shown: boolean;
  setShown: React.Dispatch<React.SetStateAction<boolean>>;
};

const Context = React.createContext<ContextValue | null>(null);

function useContextValue(): ContextValue {
  const [shown, setShown] = useState(false);
  const windowSize = useWindowSize();

  // Auto close mobile toc on desktop window resize
  useEffect(() => {
    if (windowSize === "desktop") {
      setShown(false);
    }
  }, [windowSize]);

  return useMemo(
    () => ({
      shown,
      setShown,
    }),
    [shown, setShown],
  );
}

export function TOCDisplayProvider({
  children,
}: {
  children: ReactNode;
}): React.ReactNode {
  const value = useContextValue();
  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useTOCDisplay(): ContextValue {
  const value = useContext(Context);
  if (!value) {
    throw new ReactContextError("TOCDisplayProvider");
  }
  return value;
}
