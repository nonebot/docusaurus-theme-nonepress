import React, { useEffect, useState, useMemo, type ReactNode } from "react";

import { ReactContextError } from "@docusaurus/theme-common";
import { useHistoryPopHandler } from "@docusaurus/theme-common/internal";

import { useWindowSize } from "@nullbot/docusaurus-theme-nonepress/client";

type ContextValue = {
  shown: boolean;
  setShown: React.Dispatch<React.SetStateAction<boolean>>;
};

const Context = React.createContext<ContextValue | undefined>(undefined);

function useContextValue(): ContextValue {
  const windowSize = useWindowSize();

  const [shown, setShown] = useState(false);

  // Close mobile sidebar on navigation pop
  // Most likely firing when using the Android back button (but not only)
  useHistoryPopHandler(() => {
    if (shown) {
      setShown(false);
      // Prevent pop navigation; seems desirable enough
      // See https://github.com/facebook/docusaurus/pull/5462#issuecomment-911699846
      return false;
    }
    return undefined;
  });

  // Auto close mobile menu on desktop window resize
  useEffect(() => {
    if (windowSize === "desktop") {
      setShown(false);
    }
  }, [windowSize]);

  return useMemo(() => ({ shown, setShown }), [shown, setShown]);
}

export function MobileMenuProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const value = useContextValue();
  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useMobileMenu(): ContextValue {
  const value = React.useContext(Context);
  if (value === undefined) {
    throw new ReactContextError("MobileMenuProvider");
  }
  return value;
}
