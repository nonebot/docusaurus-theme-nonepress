/// <reference types="@docusaurus/module-type-aliases" />
/// <reference types="@docusaurus/plugin-content-docs" />
/// <reference types="@docusaurus/plugin-content-pages" />

declare module "@nullbot/docusaurus-theme-nonepress" {
  import type { ThemeConfig as defaultThemeConfig } from "@docusaurus/theme-common";
  import type { LoadContext, Plugin, PluginModule } from "@docusaurus/types";
  import type { Config as tailwindConfig } from "tailwindcss";
  import type { DeepPartial } from "utility-types";

  export type PluginOptions = {
    customCss: string[];
  };
  export type Options = {
    customCss?: string[] | string;
  };

  export const getSwizzleConfig: PluginModule["getSwizzleConfig"];

  export type SocialLink = {
    icon: [string, string];
    href: string;
  };

  export type NavbarItemBase = {
    label?: string;
    html?: string;
    className?: string;
  };
  export type NavbarLink = NavbarItemBase & {
    to?: string;
    href?: string;
    prependBaseUrlToHref?: boolean;
  };
  export type NavbarDocsVersion = NavbarItemBase & {
    type: "docsVersion";
    to?: string;
    docsPluginId?: string;
  };
  export type NavbarDocLink = NavbarItemBase & {
    type: "doc";
    docId: string;
    docsPluginId?: string;
  };
  export type NavbarDocSidebar = NavbarItemBase & {
    type: "docSidebar";
    sidebarId: string;
    docsPluginId?: string;
  };
  export type NavbarHtml = NavbarItemBase & {
    type: "html";
    className?: string;
    value: string;
  };
  export type DocsVersionDropdownSubitem =
    | NavbarLink
    | NavbarDocsVersion
    | NavbarDocLink
    | NavbarDocSidebar
    | NavbarHtml;

  export type DocsVersionDropdown = {
    enable: boolean;
    docsPluginId?: string;
    dropdownActiveClassDisabled: boolean;
    dropdownItemsBefore?: DocsVersionDropdownSubitem;
    dropdownItemsAfter?: DocsVersionDropdownSubitem;
  };

  export type ThemeConfig = defaultThemeConfig & {
    nonepress: {
      tailwindConfig?: tailwindConfig;
      navbar?: {
        docsVerisonDropdown?: DocsVersionDropdown;
        socialLinks?: SocialLink[];
      };
      footer?: {
        socialLinks?: SocialLink[];
      };
    };
  };

  export type UserThemeConfig = DeepPartial<ThemeConfig>;

  export default async function themeNonepress(
    context: LoadContext,
    options: PluginOptions,
  ): Promise<Plugin<void>>;
}

declare module "@nullbot/docusaurus-theme-nonepress/client" {
  import type { ThemeConfig } from "@nullbot/docusaurus-theme-nonepress";

  export function useNonepressThemeConfig(): ThemeConfig;
}

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
    pluginId: string | undefined,
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
  import defaultTheme from "prism-react-renderer/themes/palenight";

  function usePrismTheme(): typeof defaultTheme;
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

declare module "@theme/Admonition" {
  import type { ReactNode } from "react";
  export interface Props {
    readonly children: ReactNode;
    readonly type: "note" | "tip" | "danger" | "info" | "caution";
    readonly icon?: ReactNode;
    readonly title?: ReactNode;
  }
  export default function Admonition(props: Props): JSX.Element;
}

declare module "@theme/AnnouncementBar" {
  export default function AnnouncementBar(): JSX.Element | null;
}
declare module "@theme/AnnouncementBar/Content" {
  import type { ComponentProps } from "react";

  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Props extends ComponentProps<"div"> {}

  export default function AnnouncementBarContent(props: Props): JSX.Element;
}
declare module "@theme/AnnouncementBar/CloseButton" {
  import type { ComponentProps } from "react";

  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Props extends ComponentProps<"button"> {}

  export default function AnnouncementBarCloseButton(props: Props): JSX.Element;
}

declare module "@theme/BackToTopButton" {
  export default function BackToTopButton(): JSX.Element;
}

declare module "@theme/CodeBlock" {
  import type { ReactNode } from "react";

  export interface Props {
    readonly children: ReactNode;
    readonly className?: string;
    readonly metastring?: string;
    readonly title?: string;
    readonly language?: string;
    readonly showLineNumbers?: boolean;
  }

  export default function CodeBlock(props: Props): JSX.Element;
}

declare module "@theme/CodeBlock/Container" {
  import type { ComponentProps } from "react";

  export default function CodeBlockContainer(
    props: ComponentProps<"div">,
  ): JSX.Element;
}

declare module "@theme/CodeBlock/Content/Element" {
  import type { Props } from "@theme/CodeBlock";

  export type { Props };

  export default function CodeBlockElementContent(props: Props): JSX.Element;
}

declare module "@theme/CodeBlock/Content/String" {
  import type { Props as CodeBlockProps } from "@theme/CodeBlock";

  export interface Props extends Omit<CodeBlockProps, "children"> {
    readonly children: string;
  }

  export default function CodeBlockStringContent(props: Props): JSX.Element;
}

declare module "@theme/CodeBlock/CopyButton" {
  export interface Props {
    readonly code: string;
    readonly className?: string;
  }

  export default function CopyButton(props: Props): JSX.Element;
}

declare module "@theme/CodeBlock/Line" {
  import type { ComponentProps } from "react";

  import type Highlight from "prism-react-renderer";

  // Lib does not make this easy
  type RenderProps = Parameters<
    ComponentProps<typeof Highlight>["children"]
  >[0];
  type GetLineProps = RenderProps["getLineProps"];
  type GetTokenProps = RenderProps["getTokenProps"];
  type Token = RenderProps["tokens"][number][number];

  export interface Props {
    readonly line: Token[];
    readonly classNames: string[] | undefined;
    readonly showLineNumbers: boolean;
    readonly getLineProps: GetLineProps;
    readonly getTokenProps: GetTokenProps;
  }

  export default function CodeBlockLine(props: Props): JSX.Element;
}

declare module "@theme/CodeBlock/WordWrapButton" {
  export interface Props {
    readonly className?: string;
    readonly onClick: React.MouseEventHandler;
    readonly isEnabled: boolean;
  }

  export default function WordWrapButton(props: Props): JSX.Element;
}

declare module "@theme/ColorModeToggle" {
  import type { ColorMode } from "@docusaurus/theme-common";

  export interface Props {
    readonly className?: string;
    readonly value: ColorMode;
    readonly onChange: (colorMode: ColorMode) => void;
  }
  export default function ColorModeToggle(props: Props): JSX.Element;
}

declare module "@theme/Details" {
  import { Details, type DetailsProps } from "@docusaurus/theme-common/Details";

  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Props extends DetailsProps {}

  export default Details;
}

declare module "@theme/DocBreadcrumbs" {
  export default function DocBreadcrumbs(): JSX.Element | null;
}

declare module "@theme/DocBreadcrumbs/Items/Home" {
  export default function HomeBreadcrumbItem(): JSX.Element;
}

declare module "@theme/DocCard" {
  import type { PropSidebarItem } from "@docusaurus/plugin-content-docs";

  export interface Props {
    readonly item: PropSidebarItem;
  }
  export default function DocCard(props: Props): JSX.Element;
}

declare module "@theme/DocCardList" {
  import type { PropSidebarItem } from "@docusaurus/plugin-content-docs";

  export interface Props {
    readonly items?: PropSidebarItem[];
    readonly className?: string;
  }
  export default function DocCardList(props: Props): JSX.Element;
}

declare module "@theme/DocItem/Content" {
  export interface Props {
    readonly children: JSX.Element;
  }

  export default function DocItemContent(props: Props): JSX.Element;
}

declare module "@theme/DocItem/Footer" {
  export default function DocItemFooter(): JSX.Element;
}

declare module "@theme/DocItem/Layout" {
  export interface Props {
    readonly children: JSX.Element;
  }

  export default function DocItemLayout(props: Props): JSX.Element;
}

declare module "@theme/DocItem/Metadata" {
  export default function DocItemMetadata(): JSX.Element;
}

declare module "@theme/DocItem/Paginator" {
  export default function DocItemPaginator(): JSX.Element;
}

declare module "@theme/DocItem/TOC/Desktop" {
  export default function DocItemTOCDesktop(): JSX.Element;
}

declare module "@theme/DocItem/TOC/Mobile" {
  export default function DocItemTOCMobile(): JSX.Element;
}

declare module "@theme/DocPage/Layout" {
  import type { ReactNode } from "react";

  export interface Props {
    readonly children: ReactNode;
  }

  export default function DocPageLayout(props: Props): JSX.Element;
}

declare module "@theme/DocPage/Layout/Main" {
  import type { ReactNode } from "react";

  export interface Props {
    readonly hiddenSidebarContainer: boolean;
    readonly children: ReactNode;
  }

  export default function DocPageLayoutMain(props: Props): JSX.Element;
}

declare module "@theme/DocPage/Layout/Sidebar" {
  import type { Dispatch, SetStateAction } from "react";

  import type { PropSidebar } from "@docusaurus/plugin-content-docs";

  export interface Props {
    readonly sidebar: PropSidebar;
    readonly hiddenSidebarContainer: boolean;
    readonly setHiddenSidebarContainer: Dispatch<SetStateAction<boolean>>;
  }

  export default function DocPageLayoutSidebar(props: Props): JSX.Element;
}

declare module "@theme/DocPage/Layout/Sidebar/ExpandButton" {
  export interface Props {
    toggleSidebar: () => void;
  }

  export default function DocPageLayoutSidebarExpandButton(
    props: Props,
  ): JSX.Element;
}

declare module "@theme/DocPaginator" {
  import type { PropNavigation } from "@docusaurus/plugin-content-docs";

  // May be simpler to provide a {navigation: PropNavigation} prop?
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Props extends PropNavigation {}

  export default function DocPaginator(props: Props): JSX.Element;
}

declare module "@theme/DocSidebar" {
  import type { PropSidebarItem } from "@docusaurus/plugin-content-docs";

  export interface Props {
    readonly path: string;
    readonly sidebar: readonly PropSidebarItem[];
    readonly onCollapse: () => void;
    readonly isHidden: boolean;
  }

  export default function DocSidebar(props: Props): JSX.Element;
}

declare module "@theme/DocSidebar/Mobile" {
  import type { Props as DocSidebarProps } from "@theme/DocSidebar";

  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Props extends DocSidebarProps {}

  export default function DocSidebarMobile(props: Props): JSX.Element;
}

declare module "@theme/DocSidebar/Desktop" {
  import type { Props as DocSidebarProps } from "@theme/DocSidebar";

  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Props extends DocSidebarProps {}

  export default function DocSidebarDesktop(props: Props): JSX.Element;
}

declare module "@theme/DocSidebar/Desktop/Content" {
  import type { PropSidebarItem } from "@docusaurus/plugin-content-docs";

  export interface Props {
    readonly className?: string;
    readonly path: string;
    readonly sidebar: readonly PropSidebarItem[];
  }

  export default function Content(props: Props): JSX.Element;
}

declare module "@theme/DocSidebar/Desktop/CollapseButton" {
  export interface Props {
    readonly onClick: React.MouseEventHandler;
  }

  export default function CollapseButton(props: Props): JSX.Element;
}

declare module "@theme/DocSidebarItem" {
  import type { PropSidebarItem } from "@docusaurus/plugin-content-docs";

  export interface Props {
    readonly activePath: string;
    readonly onItemClick?: (item: PropSidebarItem) => void;
    readonly level: number;
    readonly tabIndex?: number;
    readonly item: PropSidebarItem;
    readonly index: number;
  }

  export default function DocSidebarItem(props: Props): JSX.Element;
}

declare module "@theme/DocSidebarItem/Link" {
  import type { PropSidebarItemLink } from "@docusaurus/plugin-content-docs";

  import type { Props as DocSidebarItemProps } from "@theme/DocSidebarItem";

  export interface Props extends DocSidebarItemProps {
    readonly item: PropSidebarItemLink;
  }

  export default function DocSidebarItemLink(props: Props): JSX.Element;
}

declare module "@theme/DocSidebarItem/Html" {
  import type { PropSidebarItemHtml } from "@docusaurus/plugin-content-docs";

  import type { Props as DocSidebarItemProps } from "@theme/DocSidebarItem";

  export interface Props extends DocSidebarItemProps {
    readonly item: PropSidebarItemHtml;
  }

  export default function DocSidebarItemHtml(props: Props): JSX.Element;
}

declare module "@theme/DocSidebarItem/Category" {
  import type { PropSidebarItemCategory } from "@docusaurus/plugin-content-docs";

  import type { Props as DocSidebarItemProps } from "@theme/DocSidebarItem";

  export interface Props extends DocSidebarItemProps {
    readonly item: PropSidebarItemCategory;
  }

  export default function DocSidebarItemCategory(props: Props): JSX.Element;
}

declare module "@theme/DocSidebarItems" {
  import type { PropSidebarItem } from "@docusaurus/plugin-content-docs";

  import type { Props as DocSidebarItemProps } from "@theme/DocSidebarItem";

  export interface Props extends Omit<DocSidebarItemProps, "item" | "index"> {
    readonly items: readonly PropSidebarItem[];
  }

  export default function DocSidebarItems(props: Props): JSX.Element;
}

declare module "@theme/DocVersionBanner" {
  export interface Props {
    readonly className?: string;
  }

  export default function DocVersionBanner(props: Props): JSX.Element;
}

declare module "@theme/DocVersionBadge" {
  export interface Props {
    readonly className?: string;
  }

  export default function DocVersionBadge(props: Props): JSX.Element;
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

  type HeadingType = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

  export interface Props extends ComponentProps<HeadingType> {
    readonly as: HeadingType;
  }

  export default function Heading(props: Props): JSX.Element;
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
    props: PropsWithChildren<Feature>,
  ): JSX.Element;
  export function HeroFeatureDouble(
    props: PropsWithChildren<{
      readonly features: readonly [Feature, Feature];
    }>,
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
    readonly imageClassName?: string;
    readonly titleClassName?: string;
  }

  export default function Logo(props: Props): JSX.Element;
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

declare module "@theme/MDXContent" {
  import type { ReactNode } from "react";

  export interface Props {
    readonly children: ReactNode;
  }

  export default function MDXContent(props: Props): JSX.Element;
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

declare module "@theme/PaginatorNavLink" {
  import type { ReactNode } from "react";

  import type { PropNavigationLink } from "@docusaurus/plugin-content-docs";

  export interface Props extends Omit<PropNavigationLink, "title"> {
    readonly title: ReactNode;
    readonly subLabel?: JSX.Element;
    readonly isNext?: boolean;
  }

  export default function PaginatorNavLink(props: Props): JSX.Element;
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
  import type { TagsListItem } from "@docusaurus/utils";
  import type { Optional } from "utility-types";

  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Props extends Optional<TagsListItem, "count"> {}

  export default function Tag(props: Props): JSX.Element;
}

declare module "@theme/TagsListByLetter" {
  import type { TagsListItem } from "@docusaurus/utils";

  export interface Props {
    readonly tags: readonly TagsListItem[];
  }

  export default function TagsListByLetter(props: Props): JSX.Element;
}

declare module "@theme/TagsListInline" {
  import type { Tag } from "@docusaurus/utils";

  export interface Props {
    readonly tags: readonly Tag[];
  }

  export default function TagsListInline(props: Props): JSX.Element;
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

declare module "@theme/prism-include-languages" {
  import type * as PrismNamespace from "prismjs";

  export default function prismIncludeLanguages(
    PrismObject: typeof PrismNamespace,
  ): void;
}
