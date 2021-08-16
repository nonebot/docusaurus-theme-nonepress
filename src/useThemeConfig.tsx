import { PrismTheme } from "prism-react-renderer";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { DocusaurusContext, DocusaurusConfig } from "@docusaurus/types";

export type ColorModeConfig = {
  defaultMode?: "light" | "dark";
  disableSwitch?: boolean;
  switchConfig?: {
    darkIcon?: string;
    darkIconText?: string;
    lightIcon?: string;
    lightIconText?: string;
  };
};

export type DocsConfig = {
  versionPersistence?: "localStorage" | "none";
};

export type MetadataConfig = {
  id?: string;
  name?: string;
  property?: string;
  content?: string;
  itemprop?: string;
};

export type LogoConfig = {
  alt?: string;
  src: string;
  srcDark?: string;
  href?: string;
  target?: string;
};

export type NavbarItem = {
  type?: string;
  label?: string;
  icon?: string;
  className?: string;
};

export type NavbarLink = NavbarItem & {
  to?: string;
  href?: string;
  prependBaseUrlToHref?: boolean;
};

export type NavbarDropdown = NavbarItem & {
  to?: string;
  href?: string;
  prependBaseUrlToHref?: boolean;
  items: Array<NavbarLink>;
};

export type NavbarDocsMenu = NavbarItem & {
  type: "docsMenu";
  category?: string;
};

export type NavbarConfig = {
  hideOnScroll?: boolean;
  items?: Array<NavbarItem>;
};

export type FooterLinkConfig = {
  title?: string;
  icon?: string;
  items?: Array<{
    to?: string;
    href?: string;
    html?: string;
    label?: string;
    icon?: string;
    prependBaseUrlToHref?: boolean;
  }>;
};

export type FooterIconLinkConfig = {
  icon: string;
  to?: string;
  href?: string;
  description?: string;
  prependBaseUrlToHref?: boolean;
};

export type FooterConfig = {
  copyright?: string;
  links?: Array<FooterLinkConfig>;
  iconLinks?: Array<FooterIconLinkConfig>;
};

export type PrismConfig = {
  theme?: PrismTheme;
  darkTheme?: PrismTheme;
  defaultLanguage?: string;
  additionalLanguages?: string[];
};

export type ThemeConfig = {
  colorMode?: ColorModeConfig;
  docs: DocsConfig;
  metadatas?: Array<MetadataConfig>;
  logo: LogoConfig;
  navbar?: NavbarConfig;
  footer?: FooterConfig;
  prism?: PrismConfig;
  tailwindConfig?: { [key: string]: any };
  customCss?: string | string[];
};

export function useSiteConfig(): DocusaurusConfig {
  const ctx = useDocusaurusContext() as DocusaurusContext;
  return ctx.siteConfig;
}

export default function useThemeConfig(): ThemeConfig {
  return useSiteConfig().themeConfig as ThemeConfig;
}
