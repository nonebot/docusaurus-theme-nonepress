import React, { useContext, useEffect, useState, type ReactNode } from "react";

import { ReactContextError } from "@docusaurus/theme-common";

import type { TOCItem } from "@docusaurus/mdx-loader";

type Content = {
  readonly toc: readonly TOCItem[];
  readonly minHeadingLevel: number;
  readonly maxHeadingLevel: number;
  readonly hideTableOfContents: boolean;
} | null;

type ContextValue = [
  content: Content,
  setContent: React.Dispatch<React.SetStateAction<Content>>,
];

const Context = React.createContext<ContextValue | undefined>(undefined);

export function TOCContentProvider({
  children,
}: {
  children: ReactNode;
}): React.ReactNode {
  const value = useState<Content>(null);

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useTOCContent(): ContextValue {
  const value = useContext(Context);
  if (!value) {
    throw new ReactContextError("TOCContentProvider");
  }
  return value;
}

export function TOCContentFiller({
  toc,
  minHeadingLevel = 2,
  maxHeadingLevel = 3,
  hideTableOfContents = false,
}: {
  readonly toc: readonly TOCItem[];
  readonly minHeadingLevel?: number;
  readonly maxHeadingLevel?: number;
  readonly hideTableOfContents?: boolean;
}): null {
  const [, setContent] = useTOCContent();

  useEffect(() => {
    setContent({ toc, minHeadingLevel, maxHeadingLevel, hideTableOfContents });
  }, [setContent, toc, minHeadingLevel, maxHeadingLevel, hideTableOfContents]);

  useEffect(() => () => setContent(null), [setContent]);

  return null;
}
