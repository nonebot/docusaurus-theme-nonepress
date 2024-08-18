import React, { useContext, useState, type ReactNode, useEffect } from "react";

import { ReactContextError } from "@docusaurus/theme-common";
import type { PropSidebarItem } from "@docusaurus/plugin-content-docs";

type Content = readonly PropSidebarItem[] | null;

type ContextValue = [
  content: Content,
  setContent: React.Dispatch<React.SetStateAction<Content>>,
];

const Context = React.createContext<ContextValue | undefined>(undefined);

export function SidebarContentProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const value = useState<Content>(null);

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useSidebarContent(): ContextValue {
  const value = useContext(Context);
  if (!value) {
    throw new ReactContextError("SidebarContentProvider");
  }
  return value;
}

export function SidebarContentFiller({
  items,
}: {
  readonly items: Content;
}): null {
  const [, setContent] = useSidebarContent();

  useEffect(() => {
    setContent(items);
  }, [setContent, items]);

  useEffect(() => () => setContent(null), [setContent]);

  return null;
}
