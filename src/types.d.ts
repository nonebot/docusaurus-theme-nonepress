/// <reference types="@docusaurus/module-type-aliases" />
/// <reference types="@docusaurus/plugin-content-docs" />

declare module "@theme/hooks/useAlgoliaContextualFacetFilters" {
  export type AlgoliaContextualFacetFilters = readonly [
    string,
    readonly string[]
  ];

  function useAlgoliaContextualFacetFilters(): AlgoliaContextualFacetFilters;
  export default useAlgoliaContextualFacetFilters;
}

declare module "@theme/hooks/useContextualSearchFilters" {
  export type ContextualSearchFilters = {
    locale: string;
    tags: string[];
  };

  function useContextualSearchFilters(): ContextualSearchFilters;
  export default useContextualSearchFilters;
}

declare module "@theme/hooks/useDocs" {
  import type { GlobalPluginData } from "docusaurus-theme-nonepress/types";
  export function useLoadedVersions(
    pluginId: string | undefined
  ): GlobalPluginData;
}

declare module "@theme/hooks/useHideableNavbar" {
  export type HideableNavbar = {
    readonly navbarRef: (node: HTMLElement | null) => void;
    readonly isNavbarVisible: boolean;
  };

  function useHideableNavbar(hideOnScroll: boolean): HideableNavbar;
  export default useHideableNavbar;
}

declare module "@theme/hooks/usePrismTheme" {
  import type { PrismTheme } from "prism-react-renderer";

  function usePrismTheme(): PrismTheme;
  export default usePrismTheme;
}

declare module "@theme/hooks/useScrollPosition" {
  export type ScrollPosition = { scrollX: number; scrollY: number };

  function useScrollPosition(
    effect: (
      position: ScrollPosition,
      lastPosition: ScrollPosition | null
    ) => void,
    deps?: unknown[]
  ): void;
  export default useScrollPosition;
}

declare module "@theme/hooks/useSearchQuery" {
  export type SearchQuery = {
    searchValue: string;
    updateSearchPath: (searchValue: string) => void;
    generateSearchPageLink: (searchValue: string) => string;
  };
  function useSearchQuery(): SearchQuery;

  export default useSearchQuery;
}

declare module "@theme/hooks/useTheme" {
  export type useThemeReturns = {
    readonly isDarkTheme: boolean;
    readonly setLightTheme: () => void;
    readonly setDarkTheme: () => void;
    readonly toggleTheme: () => void;
  };

  function useTheme(): useThemeReturns;
  export default useTheme;
}

declare module "@theme/hooks/useThemeConfig" {
  import type { PrismTheme } from "prism-react-renderer";
  import type { DocusaurusConfig } from "@docusaurus/types";

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

  export type AlgoliaConfig = {
    contextualSearch?: boolean;
    appId?: string;
    apiKey: string;
    indexName: string;
    searchParameters?: {
      [key: string]: any;
    };
  };

  export type ThemeConfig = {
    colorMode?: ColorModeConfig;
    docs: DocsConfig;
    metadatas?: Array<MetadataConfig>;
    logo: LogoConfig;
    navbar?: NavbarConfig;
    footer?: FooterConfig;
    prism?: PrismConfig;
    algolia?: AlgoliaConfig;
    tailwindConfig?: { [key: string]: any };
    customCss?: string | string[];
  };

  export function useSiteConfig(): DocusaurusConfig;
  function useThemeConfig(): ThemeConfig;
  export default useThemeConfig;
}

declare module "@theme/hooks/useThemeContext" {
  export type ThemeContextProps = {
    isDarkTheme: boolean;
    setLightTheme: () => void;
    setDarkTheme: () => void;
    toggleTheme: () => void;
  };

  function useThemeContext(): ThemeContextProps;
  export default useThemeContext;
}

declare module "@theme/hooks/useTOCHighlight" {
  export type Params = {
    linkClassName: string;
    linkActiveClassName: string;
  };

  function useTOCHighlight(params: Params): void;
  export default useTOCHighlight;
}

declare module "@theme/hooks/useTransition" {
  import type { RefObject } from "react";

  export type useTransitionReturns<T> = {
    readonly element: RefObject<T>;
    readonly active: boolean;
    readonly transitionClasses: Array<string>;
    readonly enter: () => Promise<void>;
    readonly leave: () => Promise<void>;
  };

  function useTransition<T extends HTMLElement>(): useTransitionReturns<T>;
  export default useTransition;
}

declare module "@theme/hooks/useWindowSize" {
  export const windowSizes: {
    desktop: "desktop";
    mobile: "mobile";
    ssr: "ssr";
  };

  export type WindowSize = keyof typeof windowSizes;

  function useWindowSize(): WindowSize;
  export default useWindowSize;
}

declare module "@theme/BackToTopButton" {
  function BackToTopButton(): JSX.Element;
  export default BackToTopButton;
}

declare module "@theme/CodeBlock" {
  import type { PropsWithChildren } from "react";

  export type Props = PropsWithChildren<{
    readonly title?: string;
    readonly metastring?: string;
    readonly className?: string;
    readonly languageClassName?: string;
  }>;

  function CodeBlock(props: Props): JSX.Element;
  export default CodeBlock;
}

declare module "@theme/Content" {
  import type { PropsWithChildren } from "react";

  export type Props = PropsWithChildren<unknown>;

  function Content(props: Props): JSX.Element;
  export default Content;
}

declare module "@theme/Details" {
  import { Details, DetailsProps } from "@docusaurus/theme-common";

  export type Props = DetailsProps;
  export default Details;
}

declare module "@theme/DocSidebar" {
  import type { PropSidebarItem } from "@docusaurus/plugin-content-docs-types";

  export type Props = {
    readonly path: string;
    readonly sidebar: readonly PropSidebarItem[];
    readonly onCollapse: () => void;
    readonly isHidden: boolean;
  };

  function DocSidebar(props: Props): JSX.Element;
  export default DocSidebar;
}

declare module "@theme/Footer" {
  function Footer(): JSX.Element;
  export default Footer;
}

declare module "@theme/FooterCopyright" {
  function FooterCopyright(): JSX.Element;
  export default FooterCopyright;
}

declare module "@theme/FooterLinks" {
  function FooterLinks(): JSX.Element;
  export default FooterLinks;
}

declare module "@theme/Heading" {
  import type { ComponentProps } from "react";

  export type HeadingType = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  export type Props = ComponentProps<HeadingType>;

  export function MainHeading(props: Props): JSX.Element;
  function Heading(Tag: HeadingType): (props: Props) => JSX.Element;
  export default Heading;
}

declare module "@theme/Hero" {
  import type { PropsWithChildren } from "react";

  export type Feature = {
    readonly title: string;
    readonly tagline?: string;
    readonly description?: string;
    readonly annotaion?: string;
  };

  export default function Hero(): JSX.Element;
  export function HeroFeatureSingle(
    props: PropsWithChildren<Feature>
  ): JSX.Element;
  export function HeroFeatureDouble(
    props: PropsWithChildren<{ readonly features: readonly [Feature, Feature] }>
  ): JSX.Element;
}

declare module "@theme/Layout" {
  import type { PropsWithChildren } from "react";
  export type Props = PropsWithChildren<unknown>;

  function Layout(props: Props): JSX.Element;
  export default Layout;
}

declare module "@theme/LayoutProvider" {
  import type { PropsWithChildren } from "react";
  export type Props = PropsWithChildren<unknown>;

  function LayoutProvider(props: Props): JSX.Element;
  export default LayoutProvider;
}

declare module "@theme/Logo" {
  import type { PropsWithChildren } from "react";

  export type Props = PropsWithChildren<{ readonly imageClassName?: string }>;
  function Logo(props: Props): JSX.Element;
  export default Logo;
}

declare module "@theme/MDXComponents" {
  import type { ComponentProps } from "react";
  import type Head from "@docusaurus/Head";
  import type CodeBlock from "@theme/CodeBlock";

  export type MDXComponentsObject = {
    readonly head: typeof Head;
    readonly code: typeof CodeBlock;
    readonly a: (props: ComponentProps<"a">) => JSX.Element;
    readonly pre: typeof CodeBlock;
    readonly details: (props: ComponentProps<"details">) => JSX.Element;
    readonly h1: (props: ComponentProps<"h1">) => JSX.Element;
    readonly h2: (props: ComponentProps<"h2">) => JSX.Element;
    readonly h3: (props: ComponentProps<"h3">) => JSX.Element;
    readonly h4: (props: ComponentProps<"h4">) => JSX.Element;
    readonly h5: (props: ComponentProps<"h5">) => JSX.Element;
    readonly h6: (props: ComponentProps<"h6">) => JSX.Element;
  };

  const MDXComponents: MDXComponentsObject;
  export default MDXComponents;
}

declare module "@theme/MDXPage" {
  // TODO
  export type Props = {};
  function MDXPage(props: Props): JSX.Element;
  export default MDXPage;
}

declare module "@theme/Navbar" {
  function Navbar(): JSX.Element;
  export default Navbar;
}

declare module "@theme/NavbarItem" {
  import type { PropsWithChildren } from "react";
  import type { NavbarItem as NavItem } from "@theme/hooks/useThemeConfig";
  export type Props = PropsWithChildren<{
    readonly item: NavItem & { readonly [key: string]: any };
    readonly isMobile?: boolean;
  }>;

  function NavbarItem(props: Props): JSX.Element;
  export default NavbarItem;
}

declare module "@theme/NavbarItem/NavbarLink" {
  import type { PropsWithChildren } from "react";
  import type { NavbarLink as NavLink } from "@theme/hooks/useThemeConfig";
  export type Props = PropsWithChildren<NavLink & { linkClassName?: string }>;

  function NavbarLink(props: Props): JSX.Element;
  export default NavbarLink;
}

declare module "@theme/NavbarItem/NavbarDocsMenu" {
  import type { PropsWithChildren } from "react";
  import type { DocFrontMatter } from "@docusaurus/plugin-content-docs/lib/types";
  import type { NavbarDocsMenu as NavDocsMenu } from "@theme/hooks/useThemeConfig";

  export type CustomDocFrontMatter = DocFrontMatter & {
    options?: { menu?: { weight?: number; category?: Array<string> } };
  };
  export type Props = PropsWithChildren<NavDocsMenu>;

  function NavbarDocsMenu(props: Props): JSX.Element;
  export default NavbarDocsMenu;
}

declare module "@theme/NavbarItem/NavbarDocsMenuMobile" {
  import type { PropsWithChildren } from "react";
  import type { NavbarDocsMenu } from "@theme/hooks/useThemeConfig";
  export type Props = PropsWithChildren<NavbarDocsMenu>;

  function NavbarDocsMenuMobile(props: Props): JSX.Element;
  export default NavbarDocsMenuMobile;
}

declare module "@theme/NavbarItem/NavbarDropdown" {
  import type { PropsWithChildren } from "react";
  import type { NavbarDropdown as NavDropdown } from "@theme/hooks/useThemeConfig";
  export type Props = PropsWithChildren<NavDropdown>;

  function NavbarDropdown(props: Props): JSX.Element;
  export default NavbarDropdown;
}

declare module "@theme/NavbarItem/NavbarDropdownMobile" {
  import type { PropsWithChildren } from "react";
  import type { NavbarDropdown } from "@theme/hooks/useThemeConfig";
  export type Props = PropsWithChildren<NavbarDropdown>;

  function NavbarDropdownMobile(props: Props): JSX.Element;
  export default NavbarDropdownMobile;
}

declare module "@theme/NavbarItem/NavbarLinkMobile" {
  import type { PropsWithChildren } from "react";
  import type { NavbarLink } from "@theme/hooks/useThemeConfig";
  export type Props = PropsWithChildren<NavbarLink>;

  function NavbarLinkMobile(props: Props): JSX.Element;
  export default NavbarLinkMobile;
}

declare module "@theme/NavbarMobile" {
  import type { useTransitionReturns } from "@theme/hooks/useTransition";
  export type Props = useTransitionReturns<HTMLDivElement>;

  function NavbarMobile(props: Props): JSX.Element;
  export default NavbarMobile;
}

declare module "@theme/NavbarPC" {
  export type Props = { readonly openMobileMenu: () => void };

  function NavbarPC(props: Props): JSX.Element;
  export default NavbarPC;
}

declare module "@theme/SearchBar" {
  function SearchBar(): JSX.Element;
  export default SearchBar;
}

declare module "@theme/SearchMetadatas" {
  export type Props = {
    readonly locale: string;
    readonly version: string;
    readonly tag: string;
  };

  function SearchMetadata(props: Props): JSX.Element;
  export default SearchMetadata;
}

declare module "@theme/SearchPage" {
  function SearchPage(): JSX.Element;
  export default SearchPage;
}

declare module "@theme/ThemeContext" {
  import type { Context } from "react";
  import type { ThemeContextProps } from "@theme/hooks/useThemeContext";

  const ThemeContext: Context<ThemeContextProps | undefined>;
  export default ThemeContext;
}

declare module "@theme/ThemedImage" {
  import type { PropsWithChildren } from "react";
  export type Props = PropsWithChildren<{
    readonly sources: { readonly light: string; readonly dark: string };
    readonly className?: string;
    readonly alt?: string;
  }>;

  function ThemedImage(props: Props): JSX.Element;
  export default ThemedImage;
}

declare module "@theme/ThemeProvider" {
  import type { PropsWithChildren } from "react";
  export type Props = PropsWithChildren<unknown>;

  function ThemeProvider(props: Props): JSX.Element;
  export default ThemeProvider;
}

declare module "@theme/ThemeSwitcher" {
  import type { PropsWithChildren } from "react";
  export type Props = PropsWithChildren<{ readonly className: string }>;

  function ThemeSwitcher(props: Props): JSX.Element;
  export default ThemeSwitcher;
}

declare module "@theme/TOC" {
  import type { TOCItem } from "@docusaurus/types";

  export type TOCProps = {
    readonly toc: readonly TOCItem[];
  };

  export type TOCHeadingsProps = {
    readonly toc: readonly TOCItem[];
    readonly isChild?: boolean;
  };

  export function TOCHeadings(props: TOCHeadingsProps): JSX.Element;

  function TOC(props: TOCProps): JSX.Element;
  export default TOC;
}

declare module "docusaurus-theme-nonepress/types" {
  import type { LoadedVersion } from "@docusaurus/plugin-content-docs/lib/types";

  export type GlobalPluginData = {
    versions: Array<LoadedVersion>;
  };
}
