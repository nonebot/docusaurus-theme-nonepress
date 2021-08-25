/// <reference types="@docusaurus/module-type-aliases" />

declare module "@theme/hooks/useDocs" {
  import {
    GlobalVersion,
    GlobalPluginData,
  } from "@docusaurus/plugin-content-docs/lib/types";
  import { GlobalPluginData as GlobalLoadedDocs } from "docusaurus-theme-nonepress/types";
  import {
    ActivePlugin,
    ActiveDocContext,
    DocVersionSuggestions,
    GetActivePluginOptions,
  } from "@docusaurus/plugin-content-docs/lib/client/docsClientUtils";
  export const useAllDocsData: () => Record<string, GlobalPluginData>;
  export const useDocsData: (pluginId: string | undefined) => GlobalPluginData;
  export const useActivePlugin: (
    options?: GetActivePluginOptions
  ) => ActivePlugin | undefined;
  export const useActivePluginAndVersion: (options?: GetActivePluginOptions) =>
    | {
        activePlugin: ActivePlugin;
        activeVersion: GlobalVersion | undefined;
      }
    | undefined;
  export const useVersions: (pluginId: string | undefined) => GlobalVersion[];
  export const useLatestVersion: (
    pluginId: string | undefined
  ) => GlobalVersion;
  export const useActiveVersion: (
    pluginId: string | undefined
  ) => GlobalVersion | undefined;
  export const useActiveDocContext: (
    pluginId: string | undefined
  ) => ActiveDocContext;
  export const useDocVersionSuggestions: (
    pluginId: string | undefined
  ) => DocVersionSuggestions;
  export const useLoadedVersions: (
    pluginId: string | undefined
  ) => GlobalLoadedDocs;
}

declare module "@theme/hooks/useTransition" {
  import { RefObject } from "react";
  export type useTransitionReturns<T> = {
    readonly element: RefObject<T>;
    readonly active: boolean;
    readonly transitionClasses: Array<string>;
    readonly enter: () => Promise<void>;
    readonly leave: () => Promise<void>;
  };
  const useTransition: <T>() => useTransitionReturns<T>;
  export default useTransition;
}

declare module "@theme/hooks/useTheme" {
  export type useThemeReturns = {
    readonly isDarkTheme: boolean;
    readonly setLightTheme: () => void;
    readonly setDarkTheme: () => void;
    readonly toggleTheme: () => void;
  };

  const useTheme: () => useThemeReturns;
  export default useTheme;
}

declare module "@theme/hooks/useThemeContext" {
  export type ThemeContextProps = {
    isDarkTheme: boolean;
    setLightTheme: () => void;
    setDarkTheme: () => void;
    toggleTheme: () => void;
  };

  export default function useThemeContext(): ThemeContextProps;
}

declare module "@theme/hooks/useHideableNavbar" {
  export type useHideableNavbarReturns = {
    readonly navbarRef: (node: HTMLElement | null) => void;
    readonly isNavbarVisible: boolean;
  };

  const useHideableNavbar: (hideOnScroll: boolean) => useHideableNavbarReturns;
  export default useHideableNavbar;
}

declare module "@theme/hooks/useScrollPosition" {
  export type ScrollPosition = { scrollX: number; scrollY: number };

  const useScrollPosition: (
    effect: (
      position: ScrollPosition,
      lastPosition: ScrollPosition | null
    ) => void,
    deps?: unknown[]
  ) => void;
  export default useScrollPosition;
}

declare module "@theme/CodeBlock" {
  import { PropsWithChildren } from "react";

  export type Props = PropsWithChildren<{
    title?: string;
    metastring?: string;
    className?: string;
    languageClassName?: string;
  }>;

  const CodeBlock: (props: Props) => JSX.Element;
  export default CodeBlock;
}

declare module "@theme/DocItem" {
  import type { TOCItem } from "@docusaurus/types";
  import type { PropVersionMetadata } from "@theme/DocPage";

  export type DocumentRoute = {
    readonly component: () => JSX.Element;
    readonly exact: boolean;
    readonly path: string;
    readonly sidebar?: string;
  };

  export type FrontMatter = {
    readonly id: string;
    readonly title: string;
    readonly image?: string;
    readonly keywords?: readonly string[];
    readonly hide_title?: boolean;
    readonly hide_table_of_contents?: boolean;
  };

  export type Metadata = {
    readonly description?: string;
    readonly title?: string;
    readonly permalink?: string;
    readonly editUrl?: string;
    readonly lastUpdatedAt?: number;
    readonly formattedLastUpdatedAt?: string;
    readonly lastUpdatedBy?: string;
    readonly version?: string;
    readonly previous?: { readonly permalink: string; readonly title: string };
    readonly next?: { readonly permalink: string; readonly title: string };
  };

  export type Props = {
    readonly route: DocumentRoute;
    readonly versionMetadata: PropVersionMetadata;
    readonly content: {
      readonly frontMatter: FrontMatter;
      readonly metadata: Metadata;
      readonly toc: readonly TOCItem[];
      readonly contentTitle: string | undefined;
      (): JSX.Element;
    };
  };

  const DocItem: (props: Props) => JSX.Element;
  export default DocItem;
}

declare module "@theme/DocPage" {
  import type { DocumentRoute } from "@theme/DocItem";
  import { VersionBanner } from "@docusaurus/plugin-content-docs/lib/types";

  type PropsSidebarItemBase = {
    customProps?: Record<string, unknown>;
  };

  export type PropSidebarItemLink = PropsSidebarItemBase & {
    type: "link";
    href: string;
    label: string;
  };

  export type PropSidebarItemCategory = PropsSidebarItemBase & {
    type: "category";
    label: string;
    items: PropSidebarItem[];
    collapsed: boolean;
    collapsible: boolean;
  };

  export type PropSidebarItem = PropSidebarItemLink | PropSidebarItemCategory;

  export type PropSidebars = {
    [sidebarId: string]: PropSidebarItem[];
  };

  export type PropVersionMetadata = {
    pluginId: string;
    version: string;
    label: string;
    banner: VersionBanner;
    isLast: boolean;
    docsSidebars: PropSidebars;
  };

  export type Props = {
    readonly location: { readonly pathname: string };
    readonly versionMetadata: PropVersionMetadata;
    readonly route: {
      readonly path: string;
      readonly component: () => JSX.Element;
      readonly routes: DocumentRoute[];
    };
  };

  const DocPage: (props: Props) => JSX.Element;
  export default DocPage;
}

declare module "@theme/Heading" {
  import type { ComponentProps } from "react";

  export type HeadingType = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  export type Props = ComponentProps<HeadingType>;

  const Heading: (Tag: HeadingType) => (props: Props) => JSX.Element;
  export default Heading;
  export const MainHeading: (props: Props) => JSX.Element;
}

declare module "@theme/ThemeContext" {
  import type { Context } from "react";
  import type { ThemeContextProps } from "@theme/hooks/useThemeContext";

  const ThemeContext: Context<ThemeContextProps | undefined>;
  export default ThemeContext;
}

declare module "docusaurus-theme-nonepress/types" {
  import { LoadedVersion } from "@docusaurus/plugin-content-docs/lib/types";
  export type GlobalPluginData = {
    versions: Array<LoadedVersion>;
  };
}
