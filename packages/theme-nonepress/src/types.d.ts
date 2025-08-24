/* eslint-disable @typescript-eslint/triple-slash-reference */

/// <reference types="@docusaurus/module-type-aliases" />
/// <reference types="@docusaurus/plugin-content-docs" />
/// <reference types="@docusaurus/plugin-content-pages" />

declare module "@nullbot/docusaurus-theme-nonepress" {
  import type { LinkLikeNavbarItemProps } from "@theme/NavbarItem";

  import type { ThemeConfig as DefaultThemeConfig } from "@docusaurus/theme-common";
  import type { ThemeConfigAlgolia } from "@docusaurus/theme-search-algolia";
  import type { LoadContext, Plugin, PluginModule } from "@docusaurus/types";
  import type { IconProp } from "@fortawesome/fontawesome-svg-core";
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
    DefaultThemeConfig & {
      algolia: ThemeConfigAlgolia;
    },
    OverwriteConfig
  >;

  export type UserThemeConfig = DeepPartial<ThemeConfig>;

  export default async function themeNonepress(
    context: LoadContext,
    options: PluginOptions,
  ): Promise<Plugin<void>>;
}

declare module "@theme/Admonition" {
  import { type ReactNode } from "react";

  export interface Props {
    readonly children: ReactNode;
    readonly type: string;
    readonly icon?: ReactNode;
    readonly title?: ReactNode;
    readonly className?: string;
  }

  export default function Admonition(props: Props): ReactNode;
}

declare module "@theme/AnnouncementBar" {
  import { type ReactNode } from "react";

  export default function AnnouncementBar(): ReactNode | null;
}
declare module "@theme/AnnouncementBar/Content" {
  import type { ComponentProps } from "react";
  import { type ReactNode } from "react";

  export interface Props extends ComponentProps<"div"> {}

  export default function AnnouncementBarContent(props: Props): ReactNode;
}
declare module "@theme/AnnouncementBar/CloseButton" {
  import type { ComponentProps } from "react";
  import { type ReactNode } from "react";

  export interface Props extends ComponentProps<"button"> {}

  export default function AnnouncementBarCloseButton(props: Props): ReactNode;
}

declare module "@theme/BackToTopButton" {
  import { type ReactNode } from "react";

  export default function BackToTopButton(): ReactNode;
}

declare module "@theme/CodeBlock" {
  import { type ReactNode } from "react";

  export interface Props {
    readonly children: ReactNode;
    readonly className?: string;
    readonly metastring?: string;
    readonly title?: string;
    readonly language?: string;
    readonly showLineNumbers?: boolean;
  }

  export default function CodeBlock(props: Props): ReactNode;
}

declare module "@theme/CodeBlock/Container" {
  import type { ComponentProps } from "react";
  import { type ReactNode } from "react";

  export default function CodeBlockContainer<T extends "div" | "pre">({
    as: As,
    ...props
  }: { as: T } & ComponentProps<T>): ReactNode;
}

declare module "@theme/CodeBlock/Content/Element" {
  import { type ReactNode } from "react";
  import type { Props } from "@theme/CodeBlock";

  export type { Props };

  export default function CodeBlockElementContent(props: Props): ReactNode;
}

declare module "@theme/CodeBlock/Content/String" {
  import { type ReactNode } from "react";
  import type { Props as CodeBlockProps } from "@theme/CodeBlock";

  export interface Props extends Omit<CodeBlockProps, "children"> {
    readonly children: string;
  }

  export default function CodeBlockStringContent(props: Props): ReactNode;
}

declare module "@theme/CodeInline" {
  import type { ComponentProps } from "react";
  import { type ReactNode } from "react";

  export interface Props extends ComponentProps<"code"> {}

  export default function CodeInline(props: Props): ReactNode;
}

declare module "@theme/CodeBlock/CopyButton" {
  import { type ReactNode } from "react";

  export interface Props {
    readonly code: string;
    readonly className?: string;
  }

  export default function CopyButton(props: Props): ReactNode;
}

declare module "@theme/CodeBlock/Line" {
  import { type ReactNode } from "react";
  import type {
    LineInputProps,
    LineOutputProps,
    Token,
    TokenInputProps,
    TokenOutputProps,
  } from "prism-react-renderer";

  export interface Props {
    readonly line: Token[];
    readonly classNames: string[] | undefined;
    readonly showLineNumbers: boolean;
    readonly getLineProps: (input: LineInputProps) => LineOutputProps;
    readonly getTokenProps: (input: TokenInputProps) => TokenOutputProps;
  }

  export default function CodeBlockLine(props: Props): ReactNode;
}

declare module "@theme/CodeBlock/WordWrapButton" {
  import { type ReactNode } from "react";

  export interface Props {
    readonly className?: string;
    readonly onClick: React.MouseEventHandler;
    readonly isEnabled: boolean;
  }

  export default function WordWrapButton(props: Props): ReactNode;
}

declare module "@theme/ColorModeToggle" {
  import { type ReactNode } from "react";
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

  export default function ColorModeToggle(props: Props): ReactNode;
}

declare module "@theme/Details" {
  import { Details, type DetailsProps } from "@docusaurus/theme-common/Details";

  export interface Props extends DetailsProps {}

  export default Details;
}

declare module "@theme/DocBreadcrumbs/Items/Home" {
  import { type ReactNode } from "react";

  export default function HomeBreadcrumbItem(): ReactNode;
}

declare module "@theme/DocCard" {
  import { type ReactNode } from "react";
  import type { PropSidebarItem } from "@docusaurus/plugin-content-docs";

  export interface Props {
    readonly item: PropSidebarItem;
  }
  export default function DocCard(props: Props): ReactNode;
}

declare module "@theme/DocCardList" {
  import { type ReactNode } from "react";
  import type { PropSidebarItem } from "@docusaurus/plugin-content-docs";

  export interface Props {
    readonly items?: PropSidebarItem[];
    readonly className?: string;
  }
  export default function DocCardList(props: Props): ReactNode;
}

declare module "@theme/DocItem/Content" {
  import { type ReactNode } from "react";

  export interface Props {
    readonly children: ReactNode;
  }

  export default function DocItemContent(props: Props): ReactNode;
}

declare module "@theme/DocItem/Footer" {
  import { type ReactNode } from "react";

  export default function DocItemFooter(): ReactNode;
}

declare module "@theme/DocItem/Layout" {
  import { type ReactNode } from "react";

  export interface Props {
    readonly children: ReactNode;
  }

  export default function DocItemLayout(props: Props): ReactNode;
}

declare module "@theme/DocItem/Metadata" {
  import { type ReactNode } from "react";

  export default function DocItemMetadata(): ReactNode;
}

declare module "@theme/DocItem/TOC/Mobile" {
  import { type ReactNode } from "react";

  export default function DocItemTOCMobile(): ReactNode;
}

declare module "@theme/DocItem/TOC/Desktop" {
  import { type ReactNode } from "react";

  export default function DocItemTOCDesktop(): ReactNode;
}

declare module "@theme/DocItem/Paginator" {
  import { type ReactNode } from "react";

  export default function DocItemPaginator(): ReactNode;
}

declare module "@theme/DocRoot/Layout" {
  import { type ReactNode } from "react";

  export interface Props {
    readonly children: ReactNode;
  }

  export default function DocRootLayout(props: Props): ReactNode;
}

declare module "@theme/DocRoot/Layout/Sidebar" {
  import type { Dispatch, SetStateAction } from "react";
  import { type ReactNode } from "react";

  import type { PropSidebar } from "@docusaurus/plugin-content-docs";

  export interface Props {
    readonly sidebar: PropSidebar;
    readonly hiddenSidebarContainer: boolean;
    readonly setHiddenSidebarContainer: Dispatch<SetStateAction<boolean>>;
  }

  export default function DocRootLayoutSidebar(props: Props): ReactNode;
}

declare module "@theme/DocRoot/Layout/Sidebar/ExpandButton" {
  import { type ReactNode } from "react";

  export interface Props {
    toggleSidebar: () => void;
  }

  export default function DocRootLayoutSidebarExpandButton(
    props: Props,
  ): ReactNode;
}

declare module "@theme/DocRoot/Layout/Main" {
  import { type ReactNode } from "react";

  export interface Props {
    readonly hiddenSidebarContainer: boolean;
    readonly children: ReactNode;
  }

  export default function DocRootLayoutMain(props: Props): ReactNode;
}

declare module "@theme/DocPaginator" {
  import { type ReactNode } from "react";
  import type { PropNavigation } from "@docusaurus/plugin-content-docs";

  // May be simpler to provide a {navigation: PropNavigation} prop?

  export interface Props extends PropNavigation {
    readonly className?: string;
  }

  export default function DocPaginator(props: Props): ReactNode;
}

declare module "@theme/DocSidebar" {
  import { type ReactNode } from "react";
  import type { PropSidebarItem } from "@docusaurus/plugin-content-docs";

  export interface Props {
    readonly path: string;
    readonly sidebar: readonly PropSidebarItem[];
    readonly onCollapse: () => void;
    readonly isHidden: boolean;
  }

  export default function DocSidebar(props: Props): ReactNode;
}

declare module "@theme/DocSidebar/Mobile" {
  import { type ReactNode } from "react";
  import type { Props as DocSidebarProps } from "@theme/DocSidebar";

  export interface Props extends DocSidebarProps {}

  export default function DocSidebarMobile(props: Props): ReactNode;
}

declare module "@theme/DocSidebar/Desktop" {
  import { type ReactNode } from "react";
  import type { Props as DocSidebarProps } from "@theme/DocSidebar";

  export interface Props extends DocSidebarProps {}

  export default function DocSidebarDesktop(props: Props): ReactNode;
}

declare module "@theme/DocSidebar/Desktop/Content" {
  import { type ReactNode } from "react";
  import type { PropSidebarItem } from "@docusaurus/plugin-content-docs";

  export interface Props {
    readonly className?: string;
    readonly path: string;
    readonly sidebar: readonly PropSidebarItem[];
  }

  export default function Content(props: Props): ReactNode;
}

declare module "@theme/DocSidebar/Desktop/CollapseButton" {
  import { type ReactNode } from "react";

  export interface Props {
    readonly onClick: React.MouseEventHandler;
  }

  export default function CollapseButton(props: Props): ReactNode;
}

declare module "@theme/DocSidebarItem" {
  import { type ReactNode } from "react";
  import type { PropSidebarItem } from "@docusaurus/plugin-content-docs";

  export interface Props {
    readonly activePath: string;
    readonly onItemClick?: (item: PropSidebarItem) => void;
    readonly level: number;
    readonly tabIndex?: number;
    readonly item: PropSidebarItem;
    readonly index: number;
  }

  export default function DocSidebarItem(props: Props): ReactNode;
}

declare module "@theme/DocSidebarItem/Link" {
  import { type ReactNode } from "react";
  import type { Props as DocSidebarItemProps } from "@theme/DocSidebarItem";

  import type { PropSidebarItemLink } from "@docusaurus/plugin-content-docs";

  export interface Props extends DocSidebarItemProps {
    readonly item: PropSidebarItemLink;
  }

  export default function DocSidebarItemLink(props: Props): ReactNode;
}

declare module "@theme/DocSidebarItem/Html" {
  import { type ReactNode } from "react";
  import type { Props as DocSidebarItemProps } from "@theme/DocSidebarItem";

  import type { PropSidebarItemHtml } from "@docusaurus/plugin-content-docs";

  export interface Props extends DocSidebarItemProps {
    readonly item: PropSidebarItemHtml;
  }

  export default function DocSidebarItemHtml(props: Props): ReactNode;
}

declare module "@theme/DocSidebarItem/Category" {
  import { type ReactNode } from "react";
  import type { Props as DocSidebarItemProps } from "@theme/DocSidebarItem";

  import type { PropSidebarItemCategory } from "@docusaurus/plugin-content-docs";

  export interface Props extends DocSidebarItemProps {
    readonly item: PropSidebarItemCategory;
  }

  export default function DocSidebarItemCategory(props: Props): ReactNode;
}

declare module "@theme/DocSidebarItems" {
  import { type ReactNode } from "react";
  import type { Props as DocSidebarItemProps } from "@theme/DocSidebarItem";
  import type { PropSidebarItem } from "@docusaurus/plugin-content-docs";

  export interface Props extends Omit<DocSidebarItemProps, "item" | "index"> {
    readonly items: readonly PropSidebarItem[];
  }

  export default function DocSidebarItems(props: Props): ReactNode;
}

declare module "@theme/DocVersionBanner" {
  import { type ReactNode } from "react";

  export interface Props {
    readonly className?: string;
  }

  export default function DocVersionBanner(props: Props): ReactNode | null;
}

declare module "@theme/DocVersionBadge" {
  import { type ReactNode } from "react";

  export interface Props {
    readonly className?: string;
  }

  export default function DocVersionBadge(props: Props): ReactNode;
}

declare module "@theme/DocVersionSuggestions" {
  import { type ReactNode } from "react";

  export default function DocVersionSuggestions(): ReactNode;
}

declare module "@theme/EditMetaRow" {
  import { type ReactNode } from "react";

  export interface Props {
    readonly className: string;
    readonly editUrl: string | null | undefined;
    readonly lastUpdatedAt: number | undefined;
    readonly lastUpdatedBy: string | undefined;
  }
  export default function EditMetaRow(props: Props): ReactNode;
}

declare module "@theme/EditThisPage" {
  import { type ReactNode } from "react";

  export interface Props {
    readonly editUrl: string;
  }

  export default function EditThisPage(props: Props): ReactNode;
}

declare module "@theme/ErrorPageContent" {
  import type ErrorComponent from "@theme/Error";

  const ErrorPageContent: typeof ErrorComponent;
  export default ErrorPageContent;
}

declare module "@theme/Footer" {
  import { type ReactNode } from "react";

  export default function Footer(): ReactNode | null;
}

declare module "@theme/Footer/Copyright" {
  import { type ReactNode } from "react";

  export interface Props {
    readonly copyright: string;
  }

  export function DocusaurusLogo(props: { className?: string }): ReactNode;
  export default function FooterCopyright(props: Props): ReactNode;
}

declare module "@theme/Footer/LinkItem" {
  import { type ReactNode } from "react";
  import type { FooterLinkItem } from "@docusaurus/theme-common";

  export interface Props {
    readonly item: FooterLinkItem;
  }

  export default function FooterLinkItem(props: Props): ReactNode;
}

declare module "@theme/Footer/Links" {
  import { type ReactNode } from "react";
  import type { Footer } from "@docusaurus/theme-common";

  export interface Props {
    readonly links: Footer["links"];
  }

  export default function FooterLinks(props: Props): ReactNode;
}

declare module "@theme/Footer/Links/MultiColumn" {
  import { type ReactNode } from "react";
  import type { MultiColumnFooter } from "@docusaurus/theme-common";

  export interface Props {
    readonly columns: MultiColumnFooter["links"];
  }

  export default function FooterLinksMultiColumn(props: Props): ReactNode;
}

declare module "@theme/Footer/Links/Simple" {
  import { type ReactNode } from "react";
  import type { SimpleFooter } from "@docusaurus/theme-common";

  export interface Props {
    readonly links: SimpleFooter["links"];
  }

  export default function FooterLinksSimple(props: Props): ReactNode;
}

declare module "@theme/Footer/Logo" {
  import { type ReactNode } from "react";
  import type { FooterLogo } from "@docusaurus/theme-common";

  export interface Props {
    readonly logo: FooterLogo;
  }

  export default function FooterLogo(props: Props): ReactNode;
}

declare module "@theme/Footer/SocialLinks" {
  import { type ReactNode } from "react";
  import type { SocialLink } from "@nullbot/docusaurus-theme-nonepress";

  export interface Props {
    readonly socialLinks: SocialLink[];
  }

  export default function FooterSocialLinks(props: Props): ReactNode;
}

declare module "@theme/Heading" {
  import type { ComponentProps } from "react";
  import { type ReactNode } from "react";

  type HeadingType = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

  export interface Props extends ComponentProps<HeadingType> {
    readonly as: HeadingType;
  }

  export default function Heading(props: Props): ReactNode;
}

declare module "@theme/Icon/Algolia" {
  import type { ComponentProps } from "react";
  import { type ReactNode } from "react";

  export interface Props extends Omit<ComponentProps<"svg">, "viewBox"> {}

  export default function IconAlgolia(props: Props): ReactNode;
}

declare module "@theme/Icon/Close" {
  import { type ReactNode } from "react";
  import type { FontAwesomeIconProps } from "@fortawesome/react-fontawesome";

  export interface Props extends Omit<FontAwesomeIconProps, "icon"> {}

  export default function IconClose(props: Props): ReactNode;
}

declare module "@theme/Icon/Category" {
  import { type ReactNode } from "react";
  import type { FontAwesomeIconProps } from "@fortawesome/react-fontawesome";

  export interface Props extends Omit<FontAwesomeIconProps, "icon"> {}

  export default function IconCategory(props: Props): ReactNode;
}

declare module "@theme/Icon/Copy" {
  import { type ReactNode } from "react";
  import type { FontAwesomeIconProps } from "@fortawesome/react-fontawesome";

  export interface Props extends Omit<FontAwesomeIconProps, "icon"> {}

  export default function IconCopy(props: Props): ReactNode;
}

declare module "@theme/Icon/DarkMode" {
  import type { ComponentProps } from "react";
  import { type ReactNode } from "react";

  export interface Props extends Omit<ComponentProps<"svg">, "viewBox"> {}

  export default function IconDarkMode(props: Props): ReactNode;
}

declare module "@theme/Icon/Docusaurus" {
  import type { ComponentProps } from "react";
  import { type ReactNode } from "react";

  export interface Props extends Omit<ComponentProps<"svg">, "viewBox"> {}

  export default function IconDocusaurus(props: Props): ReactNode;
}

declare module "@theme/Icon/Dropdown" {
  import { type ReactNode } from "react";
  import type { FontAwesomeIconProps } from "@fortawesome/react-fontawesome";

  export interface Props extends Omit<FontAwesomeIconProps, "icon"> {}

  export default function IconDropdown(props: Props): ReactNode;
}

declare module "@theme/Icon/Edit" {
  import { type ReactNode } from "react";
  import type { FontAwesomeIconProps } from "@fortawesome/react-fontawesome";

  export interface Props extends Omit<FontAwesomeIconProps, "icon"> {}

  export default function IconEdit(props: Props): ReactNode;
}

declare module "@theme/Icon/ExternalLink" {
  import { type ReactNode } from "react";
  import type { FontAwesomeIconProps } from "@fortawesome/react-fontawesome";

  export interface Props extends Omit<FontAwesomeIconProps, "icon"> {}

  export default function IconExternalLink(props: Props): ReactNode;
}

declare module "@theme/Icon/Extra" {
  import { type ReactNode } from "react";
  import type { FontAwesomeIconProps } from "@fortawesome/react-fontawesome";

  export interface Props extends Omit<FontAwesomeIconProps, "icon"> {}

  export default function IconExtra(props: Props): ReactNode;
}

declare module "@theme/Icon/File" {
  import { type ReactNode } from "react";
  import type { FontAwesomeIconProps } from "@fortawesome/react-fontawesome";

  export interface Props extends Omit<FontAwesomeIconProps, "icon"> {}

  export default function IconFile(props: Props): ReactNode;
}

declare module "@theme/Icon/Home" {
  import { type ReactNode } from "react";
  import type { FontAwesomeIconProps } from "@fortawesome/react-fontawesome";

  export interface Props extends Omit<FontAwesomeIconProps, "icon"> {}

  export default function IconHome(props: Props): ReactNode;
}

declare module "@theme/Icon/Language" {
  import { type ReactNode } from "react";
  import type { FontAwesomeIconProps } from "@fortawesome/react-fontawesome";

  export interface Props extends Omit<FontAwesomeIconProps, "icon"> {}

  export default function IconLanguage(props: Props): ReactNode;
}

declare module "@theme/Icon/LightMode" {
  import type { ComponentProps } from "react";
  import { type ReactNode } from "react";

  export interface Props extends Omit<ComponentProps<"svg">, "viewBox"> {}

  export default function IconLightMode(props: Props): ReactNode;
}

declare module "@theme/Icon/Link" {
  import { type ReactNode } from "react";
  import type { FontAwesomeIconProps } from "@fortawesome/react-fontawesome";

  export interface Props extends Omit<FontAwesomeIconProps, "icon"> {}

  export default function IconLink(props: Props): ReactNode;
}

declare module "@theme/Icon/Menu" {
  import { type ReactNode } from "react";
  import type { FontAwesomeIconProps } from "@fortawesome/react-fontawesome";

  export interface Props extends Omit<FontAwesomeIconProps, "icon"> {}

  export default function IconMenu(props: Props): ReactNode;
}

declare module "@theme/Icon/React" {
  import { type ReactNode } from "react";
  import type { FontAwesomeIconProps } from "@fortawesome/react-fontawesome";

  export interface Props extends Omit<FontAwesomeIconProps, "icon"> {}

  export default function IconReact(props: Props): ReactNode;
}

declare module "@theme/Icon/Search" {
  import { type ReactNode } from "react";
  import type { FontAwesomeIconProps } from "@fortawesome/react-fontawesome";

  export interface Props extends Omit<FontAwesomeIconProps, "icon"> {}

  export default function IconSearch(props: Props): ReactNode;
}

declare module "@theme/Icon/Sidebar" {
  import { type ReactNode } from "react";
  import type { FontAwesomeIconProps } from "@fortawesome/react-fontawesome";

  export interface Props extends Omit<FontAwesomeIconProps, "icon"> {}

  export default function IconSidebar(props: Props): ReactNode;
}

declare module "@theme/Icon/Success" {
  import { type ReactNode } from "react";
  import type { FontAwesomeIconProps } from "@fortawesome/react-fontawesome";

  export interface Props extends Omit<FontAwesomeIconProps, "icon"> {}

  export default function IconSuccess(props: Props): ReactNode;
}

declare module "@theme/Icon/WordWrap" {
  import type { ComponentProps } from "react";
  import { type ReactNode } from "react";

  export interface Props extends Omit<ComponentProps<"svg">, "viewBox"> {}

  export default function IconWordWrap(props: Props): ReactNode;
}

declare module "@theme/Icon/Socials/Twitter" {
  import type { ComponentProps } from "react";
  import { type ReactNode } from "react";

  export interface Props extends ComponentProps<"svg"> {}

  export default function Twitter(props: Props): ReactNode;
}

declare module "@theme/Icon/Socials/GitHub" {
  import type { ComponentProps } from "react";
  import { type ReactNode } from "react";

  export interface Props extends ComponentProps<"svg"> {}

  export default function Github(props: Props): ReactNode;
}

declare module "@theme/Icon/Socials/X" {
  import type { ComponentProps } from "react";
  import { type ReactNode } from "react";

  export interface Props extends ComponentProps<"svg"> {}

  export default function X(props: Props): ReactNode;
}

declare module "@theme/Icon/Socials/LinkedIn" {
  import type { ComponentProps } from "react";
  import { type ReactNode } from "react";

  export interface Props extends ComponentProps<"svg"> {}

  export default function LinkedIn(props: Props): ReactNode;
}

declare module "@theme/Icon/Socials/Default" {
  import type { ComponentProps } from "react";
  import { type ReactNode } from "react";

  export interface Props extends ComponentProps<"svg"> {}

  export default function DefaultSocialIcon(props: Props): ReactNode;
}

declare module "@theme/Icon/Socials/StackOverflow" {
  import type { ComponentProps } from "react";
  import { type ReactNode } from "react";

  export interface Props extends ComponentProps<"svg"> {}

  export default function StackOverflow(props: Props): ReactNode;
}

declare module "@theme/LastUpdated" {
  import { type ReactNode } from "react";

  export interface Props {
    readonly lastUpdatedAt?: number;
    readonly formattedLastUpdatedAt?: string;
    readonly lastUpdatedBy?: string;
  }

  export default function LastUpdated(props: Props): ReactNode;
}

declare module "@theme/NotFound/Content" {
  import { type ReactNode } from "react";

  export interface Props {
    readonly className?: string;
  }

  export default function NotFoundContent(props: Props): ReactNode;
}

declare module "@theme/Layout" {
  import { type ReactNode } from "react";

  export interface Props {
    readonly children?: ReactNode;
    readonly noFooter?: boolean;
    readonly wrapperClassName?: string;

    // Not really layout-related, but kept for convenience/retro-compatibility
    readonly title?: string;
    readonly description?: string;
  }

  export default function Layout(props: Props): ReactNode;
}

declare module "@theme/Layout/Provider" {
  import { type ReactNode } from "react";

  export interface Props {
    readonly children: ReactNode;
  }

  export default function LayoutProvider(props: Props): ReactNode;
}

declare module "@theme/Logo" {
  import type { ComponentProps } from "react";
  import { type ReactNode } from "react";

  export interface Props extends ComponentProps<"a"> {
    readonly imageClassName?: string;
    readonly titleClassName?: string;
  }

  export default function Logo(props: Props): ReactNode;
}

declare module "@theme/MDXComponents" {
  import type { ComponentProps, ComponentType } from "react";
  import { type ReactNode } from "react";

  import type Admonition from "@theme/Admonition";
  import type MDXA from "@theme/MDXComponents/A";
  import type MDXCode from "@theme/MDXComponents/Code";
  import type MDXDetails from "@theme/MDXComponents/Details";
  import type MDXImg from "@theme/MDXComponents/Img";
  import type MDXPre from "@theme/MDXComponents/Pre";
  import type MDXUl from "@theme/MDXComponents/Ul";
  import type Mermaid from "@theme/Mermaid";

  import type Head from "@docusaurus/Head";
  import type { MDXProvider } from "@mdx-js/react";

  type MDXComponentsBase = ComponentProps<typeof MDXProvider>["components"];

  export type MDXComponentsObject = MDXComponentsBase & {
    readonly Head: typeof Head;
    readonly details: typeof MDXDetails;

    readonly Details: typeof MDXDetails;
    readonly code: typeof MDXCode;
    readonly a: typeof MDXA;
    readonly pre: typeof MDXPre;
    readonly ul: typeof MDXUl;
    readonly img: typeof MDXImg;
    readonly h1: (props: ComponentProps<"h1">) => ReactNode;
    readonly h2: (props: ComponentProps<"h2">) => ReactNode;
    readonly h3: (props: ComponentProps<"h3">) => ReactNode;
    readonly h4: (props: ComponentProps<"h4">) => ReactNode;
    readonly h5: (props: ComponentProps<"h5">) => ReactNode;
    readonly h6: (props: ComponentProps<"h6">) => ReactNode;
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
  import { type ReactNode } from "react";

  export interface Props extends ComponentProps<"a"> {}

  export default function MDXA(props: Props): ReactNode;
}

declare module "@theme/MDXComponents/Code" {
  import type { ComponentProps } from "react";
  import { type ReactNode } from "react";

  export interface Props extends ComponentProps<"code"> {}

  export default function MDXCode(props: Props): ReactNode;
}

declare module "@theme/MDXComponents/Details" {
  import type { ComponentProps } from "react";
  import { type ReactNode } from "react";

  export interface Props extends ComponentProps<"details"> {}

  export default function MDXDetails(props: Props): ReactNode;
}

declare module "@theme/MDXComponents/Head" {
  import type { ComponentProps } from "react";
  import { type ReactNode } from "react";

  export interface Props extends ComponentProps<"head"> {}

  export default function MDXHead(props: Props): ReactNode;
}

declare module "@theme/MDXComponents/Heading" {
  import type { ComponentProps } from "react";
  import { type ReactNode } from "react";

  import type Heading from "@theme/Heading";

  export interface Props extends ComponentProps<typeof Heading> {}

  export default function MDXHeading(props: Props): ReactNode;
}

declare module "@theme/MDXComponents/Img" {
  import type { ComponentProps } from "react";
  import { type ReactNode } from "react";

  export interface Props extends ComponentProps<"img"> {}

  export default function MDXImg(props: Props): ReactNode;
}

declare module "@theme/MDXComponents/Pre" {
  import type { ComponentProps } from "react";
  import { type ReactNode } from "react";

  export interface Props extends ComponentProps<"pre"> {}

  export default function MDXPre(props: Props): ReactNode;
}

declare module "@theme/MDXComponents/Ul" {
  import type { ComponentProps } from "react";
  import { type ReactNode } from "react";

  export interface Props extends ComponentProps<"ul"> {}

  export default function MDXUl(props: Props): ReactNode;
}

declare module "@theme/MDXComponents/Li" {
  import type { ComponentProps } from "react";
  import { type ReactNode } from "react";

  export interface Props extends ComponentProps<"li"> {}

  export default function MDXLi(props: Props): ReactNode;
}

declare module "@theme/MDXContent" {
  import { type ReactNode } from "react";

  export interface Props {
    readonly children: ReactNode;
  }

  export default function MDXContent(props: Props): ReactNode;
}

declare module "@theme/Menu" {
  import type { ComponentProps } from "react";
  import { type ReactNode } from "react";

  export interface Props extends ComponentProps<"ul"> {}

  export default function Menu(props: Props): ReactNode;
}

declare module "@theme/Menu/Category" {
  import { type ReactNode } from "react";
  import type { Props as LinkProps } from "@docusaurus/Link";

  export interface Props extends LinkProps {
    readonly label?: string;
    readonly items: ReactNode;
    readonly collapsed?: boolean;
    readonly collapsible?: boolean;
    readonly updateCollapsed?: (toCollapsed?: boolean) => void;
    readonly wrapperClassName?: string;
  }

  export default function MenuCategory(props: Props): ReactNode;
}

declare module "@theme/Menu/Html" {
  import type { ComponentProps } from "react";
  import { type ReactNode } from "react";

  export interface Props extends ComponentProps<"li"> {
    readonly html: string;
  }

  export default function MenuHtml(props: Props): ReactNode;
}

declare module "@theme/Menu/Link" {
  import { type ReactNode } from "react";
  import type { Props as LinkProps } from "@docusaurus/Link";

  export interface Props extends LinkProps {
    readonly label?: string;
    readonly wrapperClassName?: string;
  }

  export default function MenuLink(props: Props): ReactNode;
}

declare module "@theme/Menu/Title" {
  import { type ReactNode } from "react";

  export interface Props {
    readonly label: string;
    readonly className?: string;
  }

  export default function MenuTitle(props: Props): ReactNode;
}

declare module "@theme/Mermaid" {
  import { type ReactNode } from "react";

  export interface Props {
    value: string;
  }

  export default function Mermaid(props: Props): ReactNode;
}

declare module "@theme/Navbar" {
  import { type ReactNode } from "react";

  export default function Navbar(): ReactNode;
}

declare module "@theme/Navbar/ColorModeToggle" {
  import { type ReactNode } from "react";

  export interface Props {
    readonly className?: string;
    readonly mobile?: boolean;
  }

  export default function NavbarColorModeToggle(props: Props): ReactNode;
}

declare module "@theme/Navbar/Logo" {
  import { type ReactNode } from "react";

  export default function NavbarLogo(): ReactNode;
}

declare module "@theme/Navbar/DocsVersion" {
  import { type ReactNode } from "react";
  import type { DocsVersionDropdown } from "@nullbot/docusaurus-theme-nonepress";

  export interface Props extends Omit<DocsVersionDropdown, "enabled"> {}

  export default function NavbarDocsVersion(props: Props): ReactNode;
}

declare module "@theme/Navbar/ExtraDropdown" {
  import { type ReactNode } from "react";

  export default function NavbarExtraDropdown(): ReactNode | null;
}

declare module "@theme/Navbar/LocaleDropdown" {
  import { type ReactNode } from "react";
  import type { LocaleDropdown } from "@nullbot/docusaurus-theme-nonepress";

  export interface Props extends Omit<LocaleDropdown, "enabled"> {
    readonly mobile?: boolean;
  }

  export default function NavbarLocaleDropdown(props: Props): ReactNode | null;
}

declare module "@theme/Navbar/Logo" {
  import { type ReactNode } from "react";

  export default function NavbarLogo(): ReactNode;
}

declare module "@theme/Navbar/MobileMenu" {
  import { type ReactNode } from "react";

  export default function MobileMenu(): ReactNode | null;
}

declare module "@theme/Navbar/MobileMenu/Header" {
  import { type ReactNode } from "react";

  export default function MobileMenuHeader(): ReactNode;
}

declare module "@theme/Navbar/MobileMenu/PrimaryMenu" {
  import { type ReactNode } from "react";
  import type { Props as NavbarItemProps } from "@theme/Navbar/NavbarItem";

  export interface Props {
    readonly items: NavbarItemProps[];
  }

  export default function MobileMenuPrimaryMenu(props: Props): ReactNode;
}

declare module "@theme/Navbar/MobileMenu/Toggle" {
  import { type ReactNode } from "react";

  export default function MobileMenuToggle(): ReactNode;
}

declare module "@theme/Navbar/MobileSidebar" {
  import { type ReactNode } from "react";

  export default function MobileSidebar(): ReactNode;
}

declare module "@theme/Navbar/MobileTOCPopdown" {
  import { type ReactNode } from "react";

  export default function MobileTOCPopdown(): ReactNode | null;
}

declare module "@theme/Navbar/PrimaryNavbar" {
  import { type ReactNode } from "react";

  export default function PrimaryNavbar(): ReactNode;
}

declare module "@theme/Navbar/Search" {
  import { type ReactNode } from "react";

  export interface Props {
    readonly children: ReactNode;
    readonly className?: string;
  }

  export default function NavbarSearch(props: Props): ReactNode;
}

declare module "@theme/Navbar/SecondaryNavbar" {
  import { type ReactNode } from "react";

  export default function SecondaryNavbar(): ReactNode | null;
}

declare module "@theme/Navbar/SocialLinks" {
  import { type ReactNode } from "react";
  import type { SocialLink } from "@nullbot/docusaurus-theme-nonepress";

  export interface Props {
    readonly links: SocialLink[];
    readonly mobile?: boolean;
  }

  export default function NavbarSocialLinks(props: Props): ReactNode;
}

declare module "@theme/NavbarItem" {
  import { type ReactNode } from "react";
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

  export type Props = NavbarItemProps;

  export type NavbarItemType = Props["type"];

  export default function NavbarItem(props: Props): ReactNode;
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
  import { type ReactNode } from "react";
  import type { Props as NavbarNavLinkProps } from "@theme/NavbarItem/NavbarNavLink";

  export type DesktopOrMobileNavBarItemProps = NavbarNavLinkProps;

  export interface Props extends DesktopOrMobileNavBarItemProps {
    readonly mobile?: boolean;
  }

  export default function DefaultNavbarItem(props: Props): ReactNode;
}

declare module "@theme/NavbarItem/DocNavbarItem" {
  import { type ReactNode } from "react";
  import type { Props as DefaultNavbarItemProps } from "@theme/NavbarItem/DefaultNavbarItem";

  export interface Props extends DefaultNavbarItemProps {
    readonly docId: string;
    readonly docsPluginId?: string;
  }

  export default function DocNavbarItem(props: Props): ReactNode | null;
}

declare module "@theme/NavbarItem/DocSidebarNavbarItem" {
  import { type ReactNode } from "react";
  import type { Props as DefaultNavbarItemProps } from "@theme/NavbarItem/DefaultNavbarItem";

  export interface Props extends DefaultNavbarItemProps {
    readonly sidebarId: string;
    readonly docsPluginId?: string;
  }

  export default function DocSidebarNavbarItem(props: Props): ReactNode;
}

declare module "@theme/NavbarItem/DocsMenuDropdownNavbarItem" {
  import { type ReactNode } from "react";
  import type { Props as NavbarNavLinkProps } from "@theme/NavbarItem/NavbarNavLink";

  export type DesktopOrMobileNavBarItemProps = NavbarNavLinkProps & {
    readonly docId?: string;
    readonly docsPluginId?: string;
    readonly category: string;
  };

  export interface Props extends DesktopOrMobileNavBarItemProps {
    readonly mobile?: boolean;
  }

  export default function DocsMenuDropdownNavbarItem(props: Props): ReactNode;
}

declare module "@theme/NavbarItem/DocsVersionNavbarItem" {
  import { type ReactNode } from "react";
  import type { Props as DefaultNavbarItemProps } from "@theme/NavbarItem/DefaultNavbarItem";

  export interface Props extends DefaultNavbarItemProps {
    readonly docsPluginId?: string;
  }

  export default function DocsVersionNavbarItem(props: Props): ReactNode;
}

declare module "@theme/NavbarItem/DropdownNavbarItem" {
  import { type ReactNode } from "react";
  import type { Props as MenuCategoryProps } from "@theme/Menu/Category";
  import type { LinkLikeNavbarItemProps } from "@theme/NavbarItem";

  export type DesktopOrMobileNavBarItemProps = Omit<
    MenuCategoryProps,
    "collapsed" | "collapsible" | "toggleCollapsed" | "items"
  > & {
    readonly items: readonly LinkLikeNavbarItemProps[];
  };

  export interface Props extends DesktopOrMobileNavBarItemProps {
    readonly mobile?: boolean;
  }

  export default function DropdownNavbarItem(props: Props): ReactNode;
}

declare module "@theme/NavbarItem/HtmlNavbarItem" {
  import { type ReactNode } from "react";
  import type { Props as DefaultNavbarItemProps } from "@theme/NavbarItem/DefaultNavbarItem";

  export interface Props extends DefaultNavbarItemProps {
    value: string;
  }

  export default function HtmlNavbarItem(props: Props): ReactNode;
}

declare module "@theme/NavbarItem/NavbarNavLink" {
  import { type ReactNode } from "react";

  import type { Props as MenuLinkProps } from "@theme/Menu/Link";

  export interface Props extends MenuLinkProps {
    readonly activeBasePath?: string;
    readonly activeBaseRegex?: string;
    readonly exact?: boolean;
    readonly label?: ReactNode;
    readonly html?: string;
    readonly prependBaseUrlToHref?: boolean;
    readonly isDropdownLink?: boolean;
  }

  export default function NavbarNavLink(props: Props): ReactNode;
}

declare module "@theme/Page" {
  import { type ReactNode } from "react";

  export interface Props {
    readonly children?: ReactNode;
    readonly hideSidebar?: boolean;
    readonly hideTableOfContents?: boolean;
    readonly reduceContentWidth?: boolean;
    readonly sidebarId?: string;
    readonly sidebarVersion?: string;
    readonly toc?: readonly TOCItem[];
    readonly minHeadingLevel?: number;
    readonly maxHeadingLevel?: number;
  }

  export default function Page(props: Props): ReactNode;
}

declare module "@theme/Page/TOC" {
  import { type ReactNode } from "react";

  export interface Props {
    readonly className?: string;

    readonly toc: readonly TOCItem[];
    readonly minHeadingLevel?: number;
    readonly maxHeadingLevel?: number;
    readonly hideTableOfContents: boolean;
  }

  export default function TOC(props: Props): ReactNode | null;
}

declare module "@theme/Page/TOC/Container" {
  import { type ReactNode } from "react";

  export interface Props {
    readonly className?: string;
    readonly children?: ReactNode;
  }

  export default function TOCContainer(props: Props): ReactNode;
}

declare module "@theme/Page/TOC/Content" {
  import { type ReactNode } from "react";
  import type { TOCItem } from "@docusaurus/mdx-loader";

  export interface Props {
    readonly toc: readonly TOCItem[];
    readonly minHeadingLevel?: number;
    readonly maxHeadingLevel?: number;
    readonly linkClassName?: string | null;
    readonly linkActiveClassName?: string | null;
  }

  export default function TOCContent(props: Props): ReactNode;
}

declare module "@theme/Page/TOC/Tree" {
  import { type ReactNode } from "react";
  import type { TOCTreeNode } from "@docusaurus/theme-common/internal";

  export interface Props {
    readonly toc: readonly TOCTreeNode[];
    readonly linkClassName?: string | null;
  }

  export default function TOCTree(props: Props): ReactNode | null;
}

declare module "@theme/PaginatorNavLink" {
  import { type ReactNode } from "react";

  import type { PropNavigationLink } from "@docusaurus/plugin-content-docs";

  export interface Props extends Omit<PropNavigationLink, "title"> {
    readonly title: ReactNode;
    readonly subLabel?: ReactNode;
    readonly isNext?: boolean;
  }

  export default function PaginatorNavLink(props: Props): ReactNode;
}

declare module "@theme/SearchMetadata" {
  import { type ReactNode } from "react";

  export interface Props {
    readonly locale?: string;
    readonly version?: string;
    readonly tag?: string;
  }

  export default function SearchMetadata(props: Props): ReactNode;
}

declare module "@theme/SearchBar" {
  import { type ReactNode } from "react";

  export default function SearchBar(): ReactNode;
}

declare module "@theme/SearchPage" {
  import { type ReactNode } from "react";

  export default function SearchPage(): ReactNode;
}

declare module "@theme/SearchTranslations" {
  import type { DocSearchTranslations } from "@docsearch/react";

  const translations: DocSearchTranslations & { placeholder: string };
  export default translations;
}
declare module "@theme/Page/Sidebar" {
  import { type ReactNode } from "react";

  export interface Props {
    readonly className?: string;
    readonly sidebarId?: string;
    readonly sidebarVersion?: string;
  }

  export default function Sidebar(props: Props): ReactNode | null;
}

declare module "@theme/Page/Sidebar/Content" {
  import { type ReactNode } from "react";
  import type { PropSidebarItem } from "@docusaurus/plugin-content-docs";

  export interface Props {
    readonly path: string;
    readonly items: readonly PropSidebarItem[];
  }

  export default function SidebarContent(props: Props): ReactNode;
}

declare module "@theme/Page/SidebarItem" {
  import { type ReactNode } from "react";
  import type { PropSidebarItem } from "@docusaurus/plugin-content-docs";

  export interface Props {
    readonly index: number;
    readonly level: number;
    readonly activePath: string;
    readonly item: PropSidebarItem;
  }

  export default function SidebarItem(props: Props): ReactNode;
}

declare module "@theme/Page/SidebarItem/Link" {
  import { type ReactNode } from "react";
  import type { Props as SidebarItemProps } from "@theme/Page/SidebarItem";

  import type { PropSidebarItemLink } from "@docusaurus/plugin-content-docs";

  export interface Props extends SidebarItemProps {
    readonly item: PropSidebarItemLink;
  }

  export default function SidebarItemLink(props: Props): ReactNode;
}

declare module "@theme/Page/SidebarItem/Html" {
  import { type ReactNode } from "react";
  import type { Props as SidebarItemProps } from "@theme/Page/SidebarItem";

  import type { PropSidebarItemHtml } from "@docusaurus/plugin-content-docs";

  export interface Props extends SidebarItemProps {
    readonly item: PropSidebarItemHtml;
  }

  export default function SidebarItemHtml(props: Props): ReactNode;
}

declare module "@theme/Page/SidebarItem/Category" {
  import { type ReactNode } from "react";
  import type { Props as SidebarItemProps } from "@theme/Page/SidebarItem";

  import type { PropSidebarItemCategory } from "@docusaurus/plugin-content-docs";

  export interface Props extends SidebarItemProps {
    readonly item: PropSidebarItemCategory;
  }

  export default function SidebarItemCategory(props: Props): ReactNode;
}

declare module "@theme/SkipToContent" {
  import { type ReactNode } from "react";

  export default function SkipToContent(): ReactNode;
}

declare module "@theme/TabItem" {
  import { type ReactNode } from "react";
  import type { TabItemProps } from "@docusaurus/theme-common/internal";

  export interface Props extends TabItemProps {}

  export default function TabItem(props: Props): ReactNode;
}

declare module "@theme/Tabs" {
  import { type ReactNode } from "react";
  import type { TabsProps } from "@docusaurus/theme-common/internal";

  export interface Props extends TabsProps {}

  export default function Tabs(props: Props): ReactNode;
}

declare module "@theme/Tag" {
  import { type ReactNode } from "react";
  import type { TagsListItem } from "@docusaurus/utils";
  import type { Optional } from "utility-types";

  export interface Props extends Optional<TagsListItem, "count"> {}

  export default function Tag(props: Props): ReactNode;
}

declare module "@theme/ContentVisibility" {
  import { type ReactNode } from "react";

  export interface Props {
    readonly metadata: {
      // the visibility metadata our 3 content plugins share in common
      readonly unlisted: boolean;
      readonly frontMatter: { draft?: boolean; unlisted?: boolean };
    };
  }

  export default function ContentVisibility(props: Props): ReactNode;
}

declare module "@theme/ContentVisibility/Unlisted" {
  import { type ReactNode } from "react";

  export interface Props {
    className?: string;
  }

  export default function Unlisted(props: Props): ReactNode;
}

declare module "@theme/ContentVisibility/Draft" {
  import { type ReactNode } from "react";

  export interface Props {
    className?: string;
  }

  export default function Draft(props: Props): ReactNode;
}

declare module "@theme/TagsListByLetter" {
  import { type ReactNode } from "react";
  import type { TagsListItem } from "@docusaurus/utils";

  export interface Props {
    readonly tags: readonly TagsListItem[];
  }

  export default function TagsListByLetter(props: Props): ReactNode;
}

declare module "@theme/TagsListInline" {
  import { type ReactNode } from "react";
  import type { Tag } from "@docusaurus/utils";

  export interface Props {
    readonly className?: string;
    readonly tags: readonly Tag[];
  }

  export default function TagsListInline(props: Props): ReactNode;
}

declare module "@theme/ThemedImage" {
  import type { ComponentProps } from "react";
  import { type ReactNode } from "react";

  export interface Props extends Omit<ComponentProps<"img">, "src"> {
    readonly sources: {
      readonly light: string;
      readonly dark: string;
    };
  }

  export default function ThemedImage(props: Props): ReactNode;
}

declare module '@theme/ThemeProvider/TitleFormatter' {
  import type {ReactNode} from 'react';

  export interface Props {
    readonly children: ReactNode;
  }
  export default function ThemeProviderTitleFormatter({
    children,
  }: Props): ReactNode;
}

declare module "@theme/TOCItems" {
  import { type ReactNode } from "react";
  import type { TOCItem } from "@docusaurus/mdx-loader";

  export interface Props {
    readonly toc: readonly TOCItem[];
    readonly minHeadingLevel?: number;
    readonly maxHeadingLevel?: number;
    readonly className?: string;
    readonly linkClassName?: string | null;
    readonly linkActiveClassName?: string;
  }

  export default function TOCItems(props: Props): ReactNode;
}

declare module "@theme/TOCItems/Tree" {
  import { type ReactNode } from "react";
  import type { TOCTreeNode } from "@docusaurus/theme-common/internal";

  export interface Props {
    readonly toc: readonly TOCTreeNode[];
    readonly className: string;
    readonly linkClassName: string | null;
    readonly isChild?: boolean;
  }

  export default function TOCItems(props: Props): ReactNode;
}

declare module "@theme/TOC" {
  import { type ReactNode } from "react";
  import type { TOCItem } from "@docusaurus/mdx-loader";

  // `minHeadingLevel` only comes from doc/post front matter, and won't have a
  // default set by Joi. See TOC, TOCInline, TOCCollapsible for examples.
  export interface Props {
    readonly toc: readonly TOCItem[];
    readonly minHeadingLevel?: number;
    readonly maxHeadingLevel?: number;
    readonly className?: string;
  }

  export default function TOC(props: Props): ReactNode;
}

declare module "@theme/TOCInline" {
  import { type ReactNode } from "react";
  import type { TOCItem } from "@docusaurus/mdx-loader";

  export interface Props {
    readonly toc: readonly TOCItem[];
    readonly minHeadingLevel?: number;
    readonly maxHeadingLevel?: number;
  }

  export default function TOCInline(props: Props): ReactNode;
}

declare module "@theme/TOCCollapsible" {
  import { type ReactNode } from "react";
  import type { TOCItem } from "@docusaurus/mdx-loader";

  export interface Props {
    readonly className?: string;
    readonly minHeadingLevel?: number;
    readonly maxHeadingLevel?: number;
    readonly toc: readonly TOCItem[];
  }

  export default function TOCCollapsible(props: Props): ReactNode;
}

declare module "@theme/TOCCollapsible/CollapseButton" {
  import type { ComponentProps } from "react";
  import { type ReactNode } from "react";

  export interface Props extends ComponentProps<"button"> {
    collapsed: boolean;
  }

  export default function TOCCollapsibleCollapseButton(props: Props): ReactNode;
}

declare module "@theme/prism-include-languages" {
  import type { Prism } from "prism-react-renderer";

  export default function prismIncludeLanguages(
    PrismObject: typeof Prism,
  ): void;
}
