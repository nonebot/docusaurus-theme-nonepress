import type { DocusaurusConfig } from "@docusaurus/types";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import type { ThemeConfig } from "@nullbot/docusaurus-theme-nonepress";

export function useSiteConfig(): DocusaurusConfig {
  const ctx = useDocusaurusContext();
  return ctx.siteConfig;
}

export function useNonepressThemeConfig(): ThemeConfig {
  return useSiteConfig().themeConfig as ThemeConfig;
}
