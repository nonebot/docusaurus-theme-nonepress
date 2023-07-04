import React, { useContext, useState, type ReactNode } from "react";

import { TOCItem } from "@docusaurus/mdx-loader";
import { ReactContextError } from "@docusaurus/theme-common";

import type { ContextValue } from "@theme/Layout/Provider/TOCProvider";

const Context = React.createContext<ContextValue | undefined>(undefined);

function useContextValue(): ContextValue {
  const [toc, setTOC] = useState<TOCItem[] | null>(null);
  return { toc, setTOC };
}

export function TOCProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const value = useContextValue();

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useTOC(): ContextValue {
  const value = useContext(Context);
  if (!value) {
    throw new ReactContextError("TOCProvider");
  }
  return value;
}
