import type { ThemeConfig } from "@theme/hooks/useThemeConfig";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import type { DocusaurusContext, DocusaurusConfig } from "@docusaurus/types";

export function useSiteConfig(): DocusaurusConfig {
  const ctx = useDocusaurusContext() as DocusaurusContext;
  return ctx.siteConfig;
}

export default function useThemeConfig(): ThemeConfig {
  return useSiteConfig().themeConfig as ThemeConfig;
}
