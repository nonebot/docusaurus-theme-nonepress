/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference types="@docusaurus/module-type-aliases" />
/// <reference types="@docusaurus/plugin-content-docs" />
/// <reference types="@docusaurus/plugin-content-pages" />

declare module "@nullbot/docusaurus-theme-nonepress" {
  import type { ThemeConfig as DefaultThemeConfig } from "@docusaurus/theme-common";
  import type { ThemeConfig as SearchThemeConfig } from "@docusaurus/theme-search-algolia";
  import type { LoadContext, Plugin, PluginModule } from "@docusaurus/types";
  import type { IconProp } from "@fortawesome/fontawesome-svg-core";
  import type { Config as tailwindConfig } from "tailwindcss";
  import type { DeepPartial } from "utility-types";

  import type {
    LinkLikeNavbarItemProps,
    NavbarItemProps,
  } from "@theme/NavbarItem";

  export type PluginOptions = {
    customCss: string[];
  };
  export type Options = {
    customCss?: string[] | string;
  };

  export const getSwizzleConfig: PluginModule["getSwizzleConfig"];

  export type SocialLink = {
    icon: IconProp;
    href: string;
  };

  export type DocsVersionDropdown = {
    enabled: boolean;
    docsPluginId?: string;
    dropdownItemsBefore: LinkLikeNavbarItemProps[];
    dropdownItemsAfter: LinkLikeNavbarItemProps[];
  };
  export type LocaleDropdown = {
    enabled: boolean;
    dropdownItemsBefore: LinkLikeNavbarItemProps[];
    dropdownItemsAfter: LinkLikeNavbarItemProps[];
    queryString?: string;
  };

  type DeepOverwrite<T, U> = U extends (infer V)[]
    ? V[]
    : U extends object
    ? {
        [K in keyof (T & U)]: K extends keyof U
          ? K extends keyof T
            ? DeepOverwrite<T[K], U[K]>
            : U[K]
          : T[K];
      }
    : U;

  type OverwriteConfig = {
    navbar: {
      items: NavbarItemProps[];
    };
    nonepress: {
      tailwindConfig?: tailwindConfig;
      navbar: {
        docsVersionDropdown: DocsVersionDropdown;
        localeDropdown: LocaleDropdown;
        socialLinks?: SocialLink[];
      };
      footer: {
        socialLinks?: SocialLink[];
      };
    };
  };

  export type ThemeConfig = DeepOverwrite<
    DefaultThemeConfig & SearchThemeConfig,
    OverwriteConfig
  >;

  export type UserThemeConfig = DeepPartial<ThemeConfig>;

  export default async function themeNonepress(
    context: LoadContext,
    options: PluginOptions,
  ): Promise<Plugin<void>>;
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
    readonly dark?: boolean;
    readonly value: ColorMode;
    /**
     * The parameter represents the "to-be" value. For example, if currently in
     * dark mode, clicking the button should call `onChange("light")`
     */
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

declare module "@theme/DocVersionSuggestions" {
  export default function DocVersionSuggestions(): JSX.Element;
}

declare module "@theme/EditThisPage" {
  export interface Props {
    readonly editUrl: string;
  }

  export default function EditThisPage(props: Props): JSX.Element;
}

declare module "@theme/ErrorPageContent" {
  import type ErrorComponent from "@theme/Error";

  const ErrorPageContent: typeof ErrorComponent;
  export default ErrorPageContent;
}

declare module "@theme/Footer" {
  export default function Footer(): JSX.Element | null;
}

declare module "@theme/Footer/Copyright" {
  export interface Props {
    readonly copyright: string;
  }

  export function DocusaurusLogo(props: { className?: string }): JSX.Element;
  export default function FooterCopyright(props: Props): JSX.Element;
}

declare module "@theme/Footer/Layout" {
  import type { ReactNode } from "react";

  export interface Props {
    readonly style: "light" | "dark";
    readonly links: ReactNode;
    readonly logo: ReactNode;
    readonly socialLinks: ReactNode;
    readonly copyright: ReactNode;
  }

  export default function FooterLayout(props: Props): JSX.Element;
}

declare module "@theme/Footer/LinkItem" {
  import type { FooterLinkItem } from "@docusaurus/theme-common";

  export interface Props {
    readonly item: FooterLinkItem;
  }

  export default function FooterLinkItem(props: Props): JSX.Element;
}

declare module "@theme/Footer/Links" {
  import type { Footer } from "@docusaurus/theme-common";

  export interface Props {
    readonly links: Footer["links"];
  }

  export default function FooterLinks(props: Props): JSX.Element;
}

declare module "@theme/Footer/Links/MultiColumn" {
  import type { MultiColumnFooter } from "@docusaurus/theme-common";

  export interface Props {
    readonly columns: MultiColumnFooter["links"];
  }

  export default function FooterLinksMultiColumn(props: Props): JSX.Element;
}

declare module "@theme/Footer/Links/Simple" {
  import type { SimpleFooter } from "@docusaurus/theme-common";

  export interface Props {
    readonly links: SimpleFooter["links"];
  }

  export default function FooterLinksSimple(props: Props): JSX.Element;
}

declare module "@theme/Footer/Logo" {
  import type { FooterLogo } from "@docusaurus/theme-common";

  export interface Props {
    readonly logo: FooterLogo;
  }

  export default function FooterLogo(props: Props): JSX.Element;
}

declare module "@theme/Footer/SocialLink" {
  import type { SocialLink } from "@nullbot/docusaurus-theme-nonepress";

  export interface Props {
    readonly socialLinks: SocialLink[];
  }

  export default function FooterSocialLink(props: Props): JSX.Element;
}

declare module "@theme/Heading" {
  import type { ComponentProps } from "react";

  type HeadingType = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

  export interface Props extends ComponentProps<HeadingType> {
    readonly as: HeadingType;
  }

  export default function Heading(props: Props): JSX.Element;
}

declare module "@theme/Icon/Close" {
  import type { FontAwesomeIconProps } from "@fortawesome/react-fontawesome";

  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Props extends Omit<FontAwesomeIconProps, "icon"> {}

  export default function IconClose(props: Props): JSX.Element;
}

declare module "@theme/Icon/Category" {
  import type { FontAwesomeIconProps } from "@fortawesome/react-fontawesome";

  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Props extends Omit<FontAwesomeIconProps, "icon"> {}

  export default function IconCategory(props: Props): JSX.Element;
}

declare module "@theme/Icon/Copy" {
  import type { FontAwesomeIconProps } from "@fortawesome/react-fontawesome";

  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Props extends Omit<FontAwesomeIconProps, "icon"> {}

  export default function IconCopy(props: Props): JSX.Element;
}

declare module "@theme/Icon/DarkMode" {
  import type { ComponentProps } from "react";

  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Props extends Omit<ComponentProps<"svg">, "viewBox"> {}

  export default function IconDarkMode(props: Props): JSX.Element;
}

declare module "@theme/Icon/Docusaurus" {
  import type { ComponentProps } from "react";

  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Props extends Omit<ComponentProps<"svg">, "viewBox"> {}

  export default function IconDocusaurus(props: Props): JSX.Element;
}

declare module "@theme/Icon/Dropdown" {
  import type { FontAwesomeIconProps } from "@fortawesome/react-fontawesome";

  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Props extends Omit<FontAwesomeIconProps, "icon"> {}

  export default function IconDropdown(props: Props): JSX.Element;
}

declare module "@theme/Icon/Edit" {
  import type { FontAwesomeIconProps } from "@fortawesome/react-fontawesome";

  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Props extends Omit<FontAwesomeIconProps, "icon"> {}

  export default function IconEdit(props: Props): JSX.Element;
}

declare module "@theme/Icon/ExternalLink" {
  import type { FontAwesomeIconProps } from "@fortawesome/react-fontawesome";

  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Props extends Omit<FontAwesomeIconProps, "icon"> {}

  export default function IconExternalLink(props: Props): JSX.Element;
}

declare module "@theme/Icon/File" {
  import type { FontAwesomeIconProps } from "@fortawesome/react-fontawesome";

  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Props extends Omit<FontAwesomeIconProps, "icon"> {}

  export default function IconFile(props: Props): JSX.Element;
}

declare module "@theme/Icon/Home" {
  import type { FontAwesomeIconProps } from "@fortawesome/react-fontawesome";

  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Props extends Omit<FontAwesomeIconProps, "icon"> {}

  export default function IconHome(props: Props): JSX.Element;
}

declare module "@theme/Icon/Language" {
  import type { FontAwesomeIconProps } from "@fortawesome/react-fontawesome";

  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Props extends Omit<FontAwesomeIconProps, "icon"> {}

  export default function IconLanguage(props: Props): JSX.Element;
}

declare module "@theme/Icon/LightMode" {
  import type { ComponentProps } from "react";

  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Props extends Omit<ComponentProps<"svg">, "viewBox"> {}

  export default function IconLightMode(props: Props): JSX.Element;
}

declare module "@theme/Icon/Link" {
  import type { FontAwesomeIconProps } from "@fortawesome/react-fontawesome";

  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Props extends Omit<FontAwesomeIconProps, "icon"> {}

  export default function IconLink(props: Props): JSX.Element;
}

declare module "@theme/Icon/Menu" {
  import type { FontAwesomeIconProps } from "@fortawesome/react-fontawesome";

  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Props extends Omit<FontAwesomeIconProps, "icon"> {}

  export default function IconMenu(props: Props): JSX.Element;
}

declare module "@theme/Icon/React" {
  import type { FontAwesomeIconProps } from "@fortawesome/react-fontawesome";

  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Props extends Omit<FontAwesomeIconProps, "icon"> {}

  export default function IconReact(props: Props): JSX.Element;
}

declare module "@theme/Icon/Search" {
  import type { FontAwesomeIconProps } from "@fortawesome/react-fontawesome";

  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Props extends Omit<FontAwesomeIconProps, "icon"> {}

  export default function IconSearch(props: Props): JSX.Element;
}

declare module "@theme/Icon/Success" {
  import type { FontAwesomeIconProps } from "@fortawesome/react-fontawesome";

  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Props extends Omit<FontAwesomeIconProps, "icon"> {}

  export default function IconSuccess(props: Props): JSX.Element;
}

declare module "@theme/Icon/WordWrap" {
  import type { ComponentProps } from "react";

  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Props extends Omit<ComponentProps<"svg">, "viewBox"> {}

  export default function IconWordWrap(props: Props): JSX.Element;
}

declare module "@theme/LastUpdated" {
  export interface Props {
    readonly lastUpdatedAt?: number;
    readonly formattedLastUpdatedAt?: string;
    readonly lastUpdatedBy?: string;
  }

  export default function LastUpdated(props: Props): JSX.Element;
}

declare module "@theme/Layout" {
  import type { ReactNode } from "react";

  export interface Props {
    readonly children?: ReactNode;
    readonly noFooter?: boolean;
    readonly wrapperClassName?: string;

    // Not really layout-related, but kept for convenience/retro-compatibility
    readonly title?: string;
    readonly description?: string;
  }

  export default function Layout(props: Props): JSX.Element;
}

declare module "@theme/Layout/Provider" {
  import type { ReactNode } from "react";

  export interface Props {
    readonly children: ReactNode;
  }

  export default function LayoutProvider(props: Props): JSX.Element;
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
  import type { ComponentType, ComponentProps } from "react";

  import type Admonition from "@theme/Admonition";
  import type MDXA from "@theme/MDXComponents/A";
  import type MDXCode from "@theme/MDXComponents/Code";
  import type MDXDetails from "@theme/MDXComponents/Details";
  import type MDXHead from "@theme/MDXComponents/Head";
  import type MDXImg from "@theme/MDXComponents/Img";
  import type MDXPre from "@theme/MDXComponents/Pre";
  import type MDXUl from "@theme/MDXComponents/Ul";
  import type Mermaid from "@theme/Mermaid";

  export type MDXComponentsObject = {
    readonly head: typeof MDXHead;
    readonly code: typeof MDXCode;
    readonly a: typeof MDXA;
    readonly pre: typeof MDXPre;
    readonly details: typeof MDXDetails;
    readonly ul: typeof MDXUl;
    readonly img: typeof MDXImg;
    readonly h1: (props: ComponentProps<"h1">) => JSX.Element;
    readonly h2: (props: ComponentProps<"h2">) => JSX.Element;
    readonly h3: (props: ComponentProps<"h3">) => JSX.Element;
    readonly h4: (props: ComponentProps<"h4">) => JSX.Element;
    readonly h5: (props: ComponentProps<"h5">) => JSX.Element;
    readonly h6: (props: ComponentProps<"h6">) => JSX.Element;
    readonly admonition: typeof Admonition;
    readonly mermaid: typeof Mermaid;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [tagName: string]: ComponentType<any>;
  };

  const MDXComponents: MDXComponentsObject;
  export default MDXComponents;
}

declare module "@theme/MDXComponents/A" {
  import type { ComponentProps } from "react";

  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Props extends ComponentProps<"a"> {}

  export default function MDXA(props: Props): JSX.Element;
}

declare module "@theme/MDXComponents/Code" {
  import type { ComponentProps } from "react";

  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Props extends ComponentProps<"code"> {}

  export default function MDXCode(props: Props): JSX.Element;
}

declare module "@theme/MDXComponents/Details" {
  import type { ComponentProps } from "react";

  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Props extends ComponentProps<"details"> {}

  export default function MDXDetails(props: Props): JSX.Element;
}

declare module "@theme/MDXComponents/Head" {
  import type { ComponentProps } from "react";

  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Props extends ComponentProps<"head"> {}

  export default function MDXHead(props: Props): JSX.Element;
}

declare module "@theme/MDXComponents/Heading" {
  import type { ComponentProps } from "react";

  import type Heading from "@theme/Heading";

  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Props extends ComponentProps<typeof Heading> {}

  export default function MDXHeading(props: Props): JSX.Element;
}

declare module "@theme/MDXComponents/Img" {
  import type { ComponentProps } from "react";

  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Props extends ComponentProps<"img"> {}

  export default function MDXImg(props: Props): JSX.Element;
}

declare module "@theme/MDXComponents/Pre" {
  import type { ComponentProps } from "react";

  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Props extends ComponentProps<"pre"> {}

  export default function MDXPre(props: Props): JSX.Element;
}

declare module "@theme/MDXComponents/Ul" {
  import type { ComponentProps } from "react";

  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Props extends ComponentProps<"ul"> {}

  export default function MDXUl(props: Props): JSX.Element;
}

declare module "@theme/MDXContent" {
  import type { ReactNode } from "react";

  export interface Props {
    readonly children: ReactNode;
  }

  export default function MDXContent(props: Props): JSX.Element;
}

declare module "@theme/Mermaid" {
  export interface Props {
    value: string;
  }

  export default function Mermaid(props: Props): JSX.Element;
}

declare module "@theme/Navbar" {
  export default function Navbar(): JSX.Element;
}

declare module "@theme/Navbar/ColorModeToggle" {
  export interface Props {
    readonly className?: string;
    readonly mobile?: boolean;
  }

  export default function NavbarColorModeToggle(props: Props): JSX.Element;
}

declare module "@theme/Navbar/Content" {
  export default function NavbarContent(): JSX.Element;
}

declare module "@theme/Navbar/DocsVersion" {
  import type { DocsVersionDropdown } from "@nullbot/docusaurus-theme-nonepress";

  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Props extends Omit<DocsVersionDropdown, "enabled"> {}

  export default function DocsVersion(props: Props): JSX.Element;
}

declare module "@theme/Navbar/Layout" {
  export interface Props {
    readonly children: React.ReactNode;
  }

  export default function NavbarLayout(props: Props): JSX.Element;
}

declare module "@theme/Navbar/LocaleDropdown" {
  import type { LocaleDropdown } from "@nullbot/docusaurus-theme-nonepress";

  export interface Props extends Omit<LocaleDropdown, "enabled"> {
    readonly mobile?: boolean;
  }

  export default function LocaleDropdown(props: Props): JSX.Element;
}

declare module "@theme/Navbar/Logo" {
  export default function NavbarLogo(): JSX.Element;
}

declare module "@theme/Navbar/MobileSidebar" {
  export default function NavbarMobileSidebar(): JSX.Element | null;
}

declare module "@theme/Navbar/MobileSidebar/Header" {
  export default function NavbarMobileSidebarHeader(): JSX.Element;
}

declare module "@theme/Navbar/MobileSidebar/Layout" {
  import type { ReactNode } from "react";

  export interface Props {
    readonly header: ReactNode;
    readonly primaryMenu: ReactNode;
    readonly secondaryMenu: ReactNode;
  }

  export default function NavbarMobileSidebarLayout(props: Props): JSX.Element;
}

declare module "@theme/Navbar/MobileSidebar/PrimaryMenu" {
  export default function NavbarMobileSidebarPrimaryMenu(): JSX.Element;
}

declare module "@theme/Navbar/MobileSidebar/SecondaryMenu" {
  export default function NavbarMobileSidebarSecondaryMenu(): JSX.Element;
}

declare module "@theme/Navbar/MobileSidebar/Toggle" {
  export default function NavbarMobileSidebarToggle(): JSX.Element;
}

declare module "@theme/Navbar/Search" {
  import type { ReactNode } from "react";

  export interface Props {
    readonly children: ReactNode;
    readonly className?: string;
  }

  export default function NavbarSearch(props: Props): JSX.Element;
}

declare module "@theme/Navbar/SocialLinks" {
  import type { SocialLink } from "@nullbot/docusaurus-theme-nonepress";

  export interface Props {
    readonly links: SocialLink[];
    readonly className?: string;
  }

  export default function SocialLinks(props: Props): JSX.Element;
}

declare module "@theme/NavbarItem" {
  import type { ComponentProps } from "react";

  import type { Props as DefaultNavbarItemProps } from "@theme/NavbarItem/DefaultNavbarItem";
  import type { Props as DocNavbarItemProps } from "@theme/NavbarItem/DocNavbarItem";
  import type { Props as DocSidebarNavbarItemProps } from "@theme/NavbarItem/DocSidebarNavbarItem";
  import type { Props as DocsMenuDropdownNavbarItemProps } from "@theme/NavbarItem/DocsMenuDropdownNavbarItem";
  import type { Props as DocsVersionNavbarItemProps } from "@theme/NavbarItem/DocsVersionNavbarItem";
  import type { Props as DropdownNavbarItemProps } from "@theme/NavbarItem/DropdownNavbarItem";
  import type { Props as HtmlNavbarItemProps } from "@theme/NavbarItem/HtmlNavbarItem";

  export type LinkLikeNavbarItemProps =
    | ({ readonly type?: "default" } & DefaultNavbarItemProps)
    | ({ readonly type: "doc" } & DocNavbarItemProps)
    | ({ readonly type: "docsVersion" } & DocsVersionNavbarItemProps)
    | ({ readonly type: "docSidebar" } & DocSidebarNavbarItemProps)
    | ({ readonly type: "html" } & HtmlNavbarItemProps);

  export type NavbarItemProps =
    | LinkLikeNavbarItemProps
    | ({ readonly type?: "dropdown" } & DropdownNavbarItemProps)
    | ({ readonly type: "docsMenu" } & DocsMenuDropdownNavbarItemProps)
    | ({
        readonly type: `custom-${string}`;
        readonly [key: string]: unknown;
      } & DefaultNavbarItemProps);

  export type Props = ComponentProps<"a"> & NavbarItemProps;

  export type NavbarItemType = Props["type"];

  export default function NavbarItem(props: Props): JSX.Element;
}

declare module "@theme/NavbarItem/ComponentTypes" {
  import type { ComponentType } from "react";

  import type DefaultNavbarItem from "@theme/NavbarItem/DefaultNavbarItem";
  import type DocNavbarItem from "@theme/NavbarItem/DocNavbarItem";
  import type DocSidebarNavbarItem from "@theme/NavbarItem/DocSidebarNavbarItem";
  import type DocsMenuDropdownNavbarItem from "@theme/NavbarItem/DocsMenuDropdownNavbarItem";
  import type DocsVersionNavbarItem from "@theme/NavbarItem/DocsVersionNavbarItem";
  import type DropdownNavbarItem from "@theme/NavbarItem/DropdownNavbarItem";
  import type HtmlNavbarItem from "@theme/NavbarItem/HtmlNavbarItem";

  export type ComponentTypesObject = {
    readonly default: typeof DefaultNavbarItem;
    readonly doc: typeof DocNavbarItem;
    readonly docSidebar: typeof DocSidebarNavbarItem;
    readonly docsMenu: typeof DocsMenuDropdownNavbarItem;
    readonly docsVersion: typeof DocsVersionNavbarItem;
    readonly dropdown: typeof DropdownNavbarItem;
    readonly html: typeof HtmlNavbarItem;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [customComponentType: string]: ComponentType<any>;
  };

  const ComponentTypes: ComponentTypesObject;
  export default ComponentTypes;
}

declare module "@theme/NavbarItem/DefaultNavbarItem" {
  import type { Props as NavbarNavLinkProps } from "@theme/NavbarItem/NavbarNavLink";

  export type DesktopOrMobileNavBarItemProps = NavbarNavLinkProps & {
    readonly isDropdownItem?: boolean;
    readonly className?: string;
  };

  export interface Props extends DesktopOrMobileNavBarItemProps {
    readonly mobile?: boolean;
  }

  export default function DefaultNavbarItem(props: Props): JSX.Element;
}

declare module "@theme/NavbarItem/DocNavbarItem" {
  import type { Props as DefaultNavbarItemProps } from "@theme/NavbarItem/DefaultNavbarItem";

  export interface Props extends DefaultNavbarItemProps {
    readonly docId: string;
    readonly docsPluginId?: string;
  }

  export default function DocNavbarItem(props: Props): JSX.Element | null;
}

declare module "@theme/NavbarItem/DocSidebarNavbarItem" {
  import type { Props as DefaultNavbarItemProps } from "@theme/NavbarItem/DefaultNavbarItem";

  export interface Props extends DefaultNavbarItemProps {
    readonly sidebarId: string;
    readonly docsPluginId?: string;
  }

  export default function DocSidebarNavbarItem(props: Props): JSX.Element;
}

declare module "@theme/NavbarItem/DocsMenuDropdownNavbarItem" {
  import type { Props as NavbarNavLinkProps } from "@theme/NavbarItem/NavbarNavLink";

  export type DesktopOrMobileNavBarItemProps = NavbarNavLinkProps & {
    readonly docId?: string;
    readonly docsPluginId?: string;
    readonly category: string;
  };

  export interface Props extends DesktopOrMobileNavBarItemProps {
    readonly mobile?: boolean;
  }

  export default function DocsMenuDropdownNavbarItem(props: Props): JSX.Element;
}

declare module "@theme/NavbarItem/DocsVersionNavbarItem" {
  import type { Props as DefaultNavbarItemProps } from "@theme/NavbarItem/DefaultNavbarItem";

  export interface Props extends DefaultNavbarItemProps {
    readonly docsPluginId?: string;
  }

  export default function DocsVersionNavbarItem(props: Props): JSX.Element;
}

declare module "@theme/NavbarItem/DropdownNavbarItem" {
  import type { LinkLikeNavbarItemProps } from "@theme/NavbarItem";
  import type { Props as NavbarNavLinkProps } from "@theme/NavbarItem/NavbarNavLink";

  export type DesktopOrMobileNavBarItemProps = NavbarNavLinkProps & {
    readonly items: readonly LinkLikeNavbarItemProps[];
    readonly className?: string;
  };

  export interface Props extends DesktopOrMobileNavBarItemProps {
    readonly mobile?: boolean;
  }

  export default function DropdownNavbarItem(props: Props): JSX.Element;
}

declare module "@theme/NavbarItem/HtmlNavbarItem" {
  import type { Props as DefaultNavbarItemProps } from "@theme/NavbarItem/DefaultNavbarItem";

  export interface Props extends DefaultNavbarItemProps {
    readonly value: string;
  }

  export default function HtmlNavbarItem(props: Props): JSX.Element;
}

declare module "@theme/NavbarItem/NavbarNavLink" {
  import type { ReactNode } from "react";

  import type { Props as LinkProps } from "@docusaurus/Link";

  export interface Props extends LinkProps {
    readonly activeBasePath?: string;
    readonly activeBaseRegex?: string;
    readonly exact?: boolean;
    readonly label?: ReactNode;
    readonly html?: string;
    readonly prependBaseUrlToHref?: boolean;
    readonly isDropdownLink?: boolean;
  }

  export default function NavbarNavLink(props: Props): JSX.Element;
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

declare module "@theme/SearchMetadata" {
  export interface Props {
    readonly locale?: string;
    readonly version?: string;
    readonly tag?: string;
  }

  export default function SearchMetadata(props: Props): JSX.Element;
}

declare module "@theme/SearchBar" {
  export default function SearchBar(): JSX.Element;
}

declare module "@theme/SearchPage" {
  export default function SearchPage(): JSX.Element;
}

declare module "@theme/SearchTranslations" {
  import type { DocSearchTranslations } from "@docsearch/react";

  const translations: DocSearchTranslations & { placeholder: string };
  export default translations;
}

declare module "@theme/SkipToContent" {
  export default function SkipToContent(): JSX.Element;
}

declare module "@theme/TabItem" {
  import type { TabItemProps } from "@docusaurus/theme-common/internal";

  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Props extends TabItemProps {}

  export default function TabItem(props: Props): JSX.Element;
}

declare module "@theme/Tabs" {
  import type { TabsProps } from "@docusaurus/theme-common/internal";

  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Props extends TabsProps {}

  export default function Tabs(props: Props): JSX.Element;
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

declare module "@theme/ThemedImage" {
  import type { ComponentProps } from "react";

  export interface Props extends Omit<ComponentProps<"img">, "src"> {
    readonly sources: {
      readonly light: string;
      readonly dark: string;
    };
  }

  export default function ThemedImage(props: Props): JSX.Element;
}

declare module "@theme/TOC" {
  import type { TOCItem } from "@docusaurus/mdx-loader";

  // `minHeadingLevel` only comes from doc/post front matter, and won't have a
  // default set by Joi. See TOC, TOCInline, TOCCollapsible for examples.
  export interface Props {
    readonly toc: readonly TOCItem[];
    readonly minHeadingLevel?: number;
    readonly maxHeadingLevel?: number;
    readonly className?: string;
  }

  export default function TOC(props: Props): JSX.Element;
}

declare module "@theme/TOCCollapsible" {
  import type { TOCItem } from "@docusaurus/mdx-loader";

  export interface Props {
    readonly className?: string;
    readonly minHeadingLevel?: number;
    readonly maxHeadingLevel?: number;
    readonly toc: readonly TOCItem[];
  }

  export default function TOCCollapsible(props: Props): JSX.Element;
}

declare module "@theme/TOCCollapsible/CollapseButton" {
  import type { ComponentProps } from "react";

  export interface Props extends ComponentProps<"button"> {
    collapsed: boolean;
  }

  export default function TOCCollapsibleCollapseButton(
    props: Props,
  ): JSX.Element;
}

declare module "@theme/TOCInline" {
  import type { TOCItem } from "@docusaurus/mdx-loader";

  export interface Props {
    readonly toc: readonly TOCItem[];
    readonly minHeadingLevel?: number;
    readonly maxHeadingLevel?: number;
  }

  export default function TOCInline(props: Props): JSX.Element;
}

declare module "@theme/TOCItems" {
  import type { TOCItem } from "@docusaurus/mdx-loader";

  export interface Props {
    readonly toc: readonly TOCItem[];
    readonly minHeadingLevel?: number;
    readonly maxHeadingLevel?: number;
    readonly className?: string;
    readonly linkClassName?: string | null;
    readonly linkActiveClassName?: string;
  }

  export default function TOCItems(props: Props): JSX.Element;
}

declare module "@theme/TOCItems/Tree" {
  import type { TOCTreeNode } from "@docusaurus/theme-common/internal";

  export interface Props {
    readonly toc: readonly TOCTreeNode[];
    readonly className: string;
    readonly linkClassName: string | null;
    readonly isChild?: boolean;
  }

  export default function TOCItems(props: Props): JSX.Element;
}

declare module "@theme/prism-include-languages" {
  import { Prism } from "prism-react-renderer";

  export default function prismIncludeLanguages(
    PrismObject: typeof Prism,
  ): void;
}
