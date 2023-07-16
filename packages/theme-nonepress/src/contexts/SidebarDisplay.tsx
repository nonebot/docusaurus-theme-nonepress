import React, {
  useState,
  useContext,
  useMemo,
  type ReactNode,
  useEffect,
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

  // Auto close mobile sidebar on desktop window resize
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

export function SidebarDisplayProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const value = useContextValue();
  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useSidebarDisplay(): ContextValue {
  const value = useContext(Context);
  if (!value) {
    throw new ReactContextError("SidebarDisplayProvider");
  }
  return value;
}
