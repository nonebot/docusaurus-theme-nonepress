/// <reference types="@docusaurus/module-type-aliases" />

declare module "@theme/hooks/useDocs" {
  import {
    GlobalPluginData,
    GlobalVersion,
  } from "@docusaurus/plugin-content-docs/lib/types";
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
  export const useActivePluginAndVersion: (
    options?: GetActivePluginOptions
  ) =>
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
}

declare module "@theme/hooks/useTransition" {
  import { RefObject } from "react";
  export type useTransitionReturns<T> = {
    readonly element: RefObject<T>;
    readonly active: boolean;
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

declare module "@theme/ThemeContext" {
  import type { Context } from "react";
  import type { ThemeContextProps } from "@theme/hooks/useThemeContext";

  const ThemeContext: Context<ThemeContextProps | undefined>;
  export default ThemeContext;
}
