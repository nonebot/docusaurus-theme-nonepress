/// <reference types="@docusaurus/module-type-aliases" />
/// <reference types="@docusaurus/plugin-content-docs" />
/// <reference types="@docusaurus/plugin-content-pages" />

declare module "@theme/hooks/useAlgoliaContextualFacetFilters" {
  export type useAlgoliaContextualFacetFiltersReturns = [string, string[]];

  function useAlgoliaContextualFacetFilters(): useAlgoliaContextualFacetFiltersReturns;
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

  export * from "@docusaurus/plugin-content-docs/lib/theme/hooks/useDocs";
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

declare module "@theme/hooks/useSearchQuery" {
  export type SearchQuery = {
    searchQuery: string;
    setSearchQuery(newSearchQuery: string): void;
    generateSearchPageLink(targetSearchQuery: string): string;
  };

  function useSearchQuery(): SearchQuery;
  export default useSearchQuery;
}

declare module "@theme/hooks/useTabGroupChoice" {
  export type useTabGroupChoiceReturns = {
    readonly tabGroupChoices: { readonly [groupId: string]: string };
    readonly setTabGroupChoices: (groupId: string, newChoice: string) => void;
  };

  function useTabGroupChoice(): useTabGroupChoiceReturns;
  export default useTabGroupChoice;
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
  import type { IconPrefix, IconName } from "@fortawesome/fontawesome-svg-core";

  export type ColorModeConfig = {
    defaultMode?: "light" | "dark";
    disableSwitch?: boolean;
    respectPrefersColorScheme?: boolean;
    switchConfig?: {
      darkIcon?: [IconPrefix, IconName];
      darkIconText?: string;
      lightIcon?: [IconPrefix, IconName];
      lightIconText?: string;
    };
  };

  export type DocsConfig = {
    versionPersistence?: "localStorage" | "none";
  };

  export type TOCConfig = {
    minHeadingLevel: number;
    maxHeadingLevel: number;
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

  export type NavbarItemBase = {
    type?: string;
    label?: string;
    icon?: [IconPrefix, IconName];
    className?: string;
  };

  export type NavbarLink = NavbarItemBase & {
    to?: string;
    href?: string;
    prependBaseUrlToHref?: boolean;
  };

  export type NavbarDocLink = NavbarItemBase & {
    docId: string;
  };

  export type NavbarDropdown = NavbarItemBase & {
    to?: string;
    href?: string;
    prependBaseUrlToHref?: boolean;
    items: Array<NavbarLink>;
  };

  export type NavbarDocsMenu = NavbarItemBase & {
    docId?: string;
    type: "docsMenu";
    category?: string;
  };

  export type NavbarItem =
    | NavbarLink
    | NavbarDocLink
    | NavbarDropdown
    | NavbarDocsMenu;

  export type NavbarConfig = {
    hideOnScroll?: boolean;
    items?: NavbarItem[];
  };

  export type FooterLinkConfig = {
    title?: string;
    icon?: [IconPrefix, IconName];
    items?: Array<{
      to?: string;
      href?: string;
      html?: string;
      label?: string;
      icon?: [IconPrefix, IconName];
      prependBaseUrlToHref?: boolean;
    }>;
  };

  export type FooterIconLinkConfig = {
    icon: [IconPrefix, IconName];
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
    externalUrlRegex?: string;
    appId?: string;
    apiKey: string;
    indexName: string;
    searchParameters?: {
      [key: string]: any;
    };
  };

  export type ThemeConfig = {
    colorMode?: ColorModeConfig;
    docs?: DocsConfig;
    tableOfContents?: TOCConfig;
    metadatas?: MetadataConfig[];
    logo: LogoConfig;
    navbar?: NavbarConfig;
    footer?: FooterConfig;
    hideableSidebar?: boolean;
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

declare module "@theme/hooks/useTransition" {
  import type { RefObject } from "react";

  export type useTransitionReturns<T> = {
    readonly element: RefObject<T>;
    readonly active: boolean;
    readonly transitionClasses: Array<string>;
    readonly enter: () => void;
    readonly leave: () => void;
  };

  function useTransition<T extends HTMLElement>(): useTransitionReturns<T>;
  export default useTransition;
}

declare module "@theme/hooks/useUserPreferencesContext" {
  export type UserPreferencesContextProps = {
    tabGroupChoices: { readonly [groupId: string]: string };
    setTabGroupChoices: (groupId: string, newChoice: string) => void;
  };

  function useUserPreferencesContext(): UserPreferencesContextProps;
  export default useUserPreferencesContext;
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
  import { ReactElement } from "react";

  export interface Props {
    readonly children: string | ReactElement;
    readonly className?: string;
    readonly metastring?: string;
    readonly title?: string | boolean;
  }

  function CodeBlock(props: Props): JSX.Element;
  export default CodeBlock;
}

declare module "@theme/Details" {
  import { Details, DetailsProps } from "@docusaurus/theme-common";

  export interface Props extends DetailsProps {}
  export default Details;
}

declare module "@theme/DocPaginator" {
  type PageInfo = { readonly permalink: string; readonly title: string };

  export type Props = {
    readonly metadata: {
      readonly previous?: PageInfo;
      readonly next?: PageInfo;
    };
  };

  function DocPaginator(props: Props): JSX.Element;
  export default DocPaginator;
}

declare module "@theme/DocSidebar" {
  import type { PropSidebarItem } from "@docusaurus/plugin-content-docs-types";

  export interface Props {
    readonly path: string;
    readonly sidebar: readonly PropSidebarItem[];
    readonly onCollapse: () => void;
    readonly isHidden: boolean;
    // MobileSecondaryFilter expects Record<string, unknown>
    readonly [key: string]: unknown;
  }

  function DocSidebar(props: Props): JSX.Element;
  export default DocSidebar;
}

declare module "@theme/DocSidebarItem" {
  import type { PropSidebarItem } from "@docusaurus/plugin-content-docs-types";

  type DocSidebarPropsBase = {
    readonly activePath: string;
    readonly onItemClick?: () => void;
    readonly level: number;
    readonly tabIndex?: number;
  };

  export interface Props extends DocSidebarPropsBase {
    readonly item: PropSidebarItem;
  }
  function DocSidebarItem(props: Props): JSX.Element;
  export default DocSidebarItem;

  export type DocSidebarItemsProps = DocSidebarPropsBase & {
    readonly items: readonly PropSidebarItem[];
  };
  export function DocSidebarItems(props: DocSidebarItemsProps): JSX.Element;
}

declare module "@theme/EditThisPage" {
  export interface Props {
    readonly editUrl: string;
  }
  function EditThisPage(props: Props): JSX.Element;
  export default EditThisPage;
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

declare module "@theme/IconExternalLink" {
  import type { ComponentProps } from "react";

  export type Props = ComponentProps<"svg">;

  function IconExternalLink(props: Props): JSX.Element;
  export default IconExternalLink;
}

declare module "@theme/LastUpdated" {
  export interface Props {
    readonly lastUpdatedAt?: number;
    readonly formattedLastUpdatedAt?: string;
    readonly lastUpdatedBy?: string;
  }

  function LastUpdated(props: Props): JSX.Element;
  export default LastUpdated;
}

declare module "@theme/Layout" {
  import type { ReactNode } from "react";

  export interface Props {
    readonly children: ReactNode;
    readonly title?: string;
    readonly noFooter?: boolean;
    readonly description?: string;
    readonly image?: string;
    readonly keywords?: string | string[];
    readonly permalink?: string;
    readonly wrapperClassName?: string;
    readonly pageClassName?: string;
    readonly searchMetadata?: {
      readonly version?: string;
      readonly tag?: string;
    };
  }

  const Layout: (props: Props) => JSX.Element;
  export default Layout;
}

declare module "@theme/LayoutHead" {
  import type { Props as LayoutProps } from "@theme/Layout";

  export interface Props extends Omit<LayoutProps, "children"> {}

  function LayoutHead(props: Props): JSX.Element;
  export default LayoutHead;
}

declare module "@theme/LayoutProviders" {
  import type { PropsWithChildren } from "react";
  export type Props = PropsWithChildren<unknown>;

  function LayoutProviders(props: Props): JSX.Element;
  export default LayoutProviders;
}

declare module "@theme/Logo" {
  import type { ComponentProps } from "react";

  export interface Props extends ComponentProps<"a"> {
    readonly className?: string;
    readonly imageClassName?: string;
    readonly disabled?: boolean;
  }
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

declare module "@theme/Navbar" {
  function Navbar(): JSX.Element;
  export default Navbar;
}

declare module "@theme/NavbarItem" {
  import type { PropsWithChildren } from "react";
  import type { NavbarItemBase as NavItem } from "@theme/hooks/useThemeConfig";
  export type Props = PropsWithChildren<{
    readonly item: NavItem & { readonly [key: string]: any };
    readonly isMobile?: boolean;
  }>;

  function NavbarItem(props: Props): JSX.Element;
  export default NavbarItem;
}

declare module "@theme/NavbarItem/NavbarDocLink" {
  import type { PropsWithChildren } from "react";
  import type { NavbarDocLink as NavDocLink } from "@theme/hooks/useThemeConfig";
  export type Props = PropsWithChildren<
    NavDocLink & { linkClassName?: string }
  >;

  function NavbarDocLink(props: Props): JSX.Element;
  export default NavbarDocLink;
}

declare module "@theme/NavbarItem/NavbarDocLinkMobile" {
  import type { Props } from "@theme/NavbarItem/NavbarDocLink";
  export type { Props } from "@theme/NavbarItem/NavbarDocLink";

  function NavbarDocLinkMobile(props: Props): JSX.Element;
  export default NavbarDocLinkMobile;
}

declare module "@theme/NavbarItem/NavbarDocsMenu" {
  import type { PropsWithChildren } from "react";
  import type { NavbarDocsMenu as NavDocsMenu } from "@theme/hooks/useThemeConfig";

  export type Props = PropsWithChildren<NavDocsMenu>;

  function NavbarDocsMenu(props: Props): JSX.Element;
  export default NavbarDocsMenu;
}

declare module "@theme/NavbarItem/NavbarDocsMenuMobile" {
  import type { Props } from "@theme/NavbarItem/NavbarDocsMenu";
  export type { Props } from "@theme/NavbarItem/NavbarDocsMenu";

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
  import type { Props } from "@theme/NavbarItem/NavbarDropdown";
  export type { Props } from "@theme/NavbarItem/NavbarDropdown";

  function NavbarDropdownMobile(props: Props): JSX.Element;
  export default NavbarDropdownMobile;
}

declare module "@theme/NavbarItem/NavbarLink" {
  import type { PropsWithChildren } from "react";
  import type { NavbarLink as NavLink } from "@theme/hooks/useThemeConfig";
  export type Props = PropsWithChildren<NavLink & { linkClassName?: string }>;

  function NavbarLink(props: Props): JSX.Element;
  export default NavbarLink;
}

declare module "@theme/NavbarItem/NavbarLinkMobile" {
  import type { Props } from "@theme/NavbarItem/NavbarLink";
  export type { Props } from "@theme/NavbarItem/NavbarLink";

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

declare module "@theme/SearchMetadata" {
  export type SearchMetadataProps = {
    readonly locale?: string;
    readonly version?: string;
    readonly tag?: string;
  };

  function SearchMetadata(props: SearchMetadataProps): JSX.Element;
  export default SearchMetadata;
}

declare module "@theme/SearchPage" {
  function SearchPage(): JSX.Element;
  export default SearchPage;
}

declare module "@theme/TabItem" {
  import type { ReactNode } from "react";

  export interface Props {
    readonly children: ReactNode;
    readonly value: string;
    readonly default?: boolean;
    readonly label?: string;
    readonly hidden?: boolean;
    readonly className?: string;
  }

  function TabItem(props: Props): JSX.Element;
  export default TabItem;
}

declare module "@theme/Tabs" {
  import type { ReactElement } from "react";
  import type { Props as TabItemProps } from "@theme/TabItem";

  export interface Props {
    readonly lazy?: boolean;
    readonly children: readonly ReactElement<TabItemProps>[];
    readonly defaultValue?: string | null;
    readonly values?: readonly { value: string; label?: string }[];
    readonly groupId?: string;
    readonly className?: string;
  }

  function Tabs(props: Props): JSX.Element;
  export default Tabs;
}

declare module "@theme/Tag" {
  import type { Optional } from "utility-types";
  import type { TagsListItem } from "@theme/TagsListByLetter";

  export interface Props extends Optional<TagsListItem, "count"> {}

  function Tag(props: Props): JSX.Element;
  export default Tag;
}

declare module "@theme/TagsListByLetter" {
  export type TagsListItem = Readonly<{
    name: string;
    permalink: string;
    count: number;
  }>;
  export interface Props {
    readonly tags: readonly TagsListItem[];
  }
  function TagsListByLetter(props: Props): JSX.Element;
  export default TagsListByLetter;
}

declare module "@theme/TagsListInline" {
  export type Tag = Readonly<{ label: string; permalink: string }>;
  export interface Props {
    readonly tags: readonly Tag[];
  }
  function TagsListInline(props: Props): JSX.Element;
  export default TagsListInline;
}

declare module "@theme/ThemeContext" {
  import type { Context } from "react";
  import type { ThemeContextProps } from "@theme/hooks/useThemeContext";

  const ThemeContext: Context<ThemeContextProps | undefined>;
  export default ThemeContext;
}

declare module "@theme/ThemedImage" {
  import type { ComponentProps } from "react";

  export interface Props extends Omit<ComponentProps<"img">, "src"> {
    readonly sources: {
      readonly light: string;
      readonly dark: string;
    };
  }

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

  // minHeadingLevel only exists as a per-doc option,
  // and won't have a default set by Joi. See TOC, TOCInline,
  // TOCCollapsible for examples
  export type TOCProps = {
    readonly toc: readonly TOCItem[];
    readonly minHeadingLevel?: number;
    readonly maxHeadingLevel?: number;
    readonly className?: string;
  };

  export type TOCHeadingsProps = {
    readonly toc: readonly TOCItem[];
    readonly minHeadingLevel?: number;
    readonly maxHeadingLevel?: number;
  };

  export function TOCHeadings(props: TOCHeadingsProps): JSX.Element;

  function TOC(props: TOCProps): JSX.Element;
  export default TOC;
}

declare module "@theme/TOCCollapsible" {
  import type { TOCItem } from "@docusaurus/types";

  export type TOCCollapsibleProps = {
    readonly className?: string;
    readonly minHeadingLevel?: number;
    readonly maxHeadingLevel?: number;
    readonly toc: readonly TOCItem[];
  };

  function TOCCollapsible(props: TOCCollapsibleProps): JSX.Element;
  export default TOCCollapsible;
}

declare module "@theme/TOCItems" {
  import type { TOCItem } from "@docusaurus/types";

  export type TOCItemsProps = {
    readonly toc: readonly TOCItem[];
    readonly minHeadingLevel?: number;
    readonly maxHeadingLevel?: number;
    readonly className?: string;
    readonly linkClassName?: string | null;
    readonly linkActiveClassName?: string;
  };

  function TOCItems(props: TOCItemsProps): JSX.Element;
  export default TOCItems;
}

declare module "@theme/TOCInline" {
  import type { TOCItem } from "@docusaurus/types";

  export type TOCInlineProps = {
    readonly toc: readonly TOCItem[];
    readonly minHeadingLevel?: number;
    readonly maxHeadingLevel?: number;
  };

  function TOCInline(props: TOCInlineProps): JSX.Element;
  export default TOCInline;
}

declare module "@theme/UserPreferencesContext" {
  import type { Context } from "react";
  import type { UserPreferencesContextProps } from "@theme/hooks/useUserPreferencesContext";

  const UserPreferencesContext: Context<
    UserPreferencesContextProps | undefined
  >;
  export default UserPreferencesContext;
}

declare module "@theme/UserPreferencesProvider" {
  import type { ReactNode } from "react";

  export interface Props {
    readonly children: ReactNode;
  }

  function UserPreferencesProvider(props: Props): JSX.Element;
  export default UserPreferencesProvider;
}

declare module "docusaurus-theme-nonepress/types" {
  import type { GlobalDataVersion } from "@docusaurus/plugin-content-docs-types";

  export type GlobalFrontMatter = {
    options?: { menu?: { weight?: number; category?: Array<string> } };
  };

  export type GlobalDoc = {
    title: string;
    description: string;
    permalink: string;
    frontMatter: GlobalFrontMatter;
  };

  export type GlobalVersion = {
    name: GlobalDataVersion["name"];
    mainDocId: GlobalDataVersion["mainDocId"];
    docs: GlobalDoc[];
  };

  export type GlobalPluginData = {
    versions: GlobalVersion[];
  };

  export type { ThemeConfig } from "@theme/hooks/useThemeConfig";
}
