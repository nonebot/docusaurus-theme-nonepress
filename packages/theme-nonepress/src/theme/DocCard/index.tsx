import React, { type ReactNode } from "react";

import clsx from "clsx";

import Link from "@docusaurus/Link";
import isInternalUrl from "@docusaurus/isInternalUrl";
import {
  findFirstSidebarItemLink,
  useDocById,
} from "@docusaurus/plugin-content-docs/client";
import {
  extractLeadingEmoji,
  useDocCardDescriptionCategoryItemsPlural,
} from "@docusaurus/theme-common/internal";

import type { Props } from "@theme/DocCard";
import Heading from "@theme/Heading";
import IconCategory from "@theme/Icon/Category";
import IconFile from "@theme/Icon/File";
import IconLink from "@theme/Icon/Link";

import type {
  PropSidebarItemCategory,
  PropSidebarItemLink,
} from "@docusaurus/plugin-content-docs";

import "./styles.css";

function CardContainer({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}): ReactNode {
  return (
    <Link href={href} className={clsx("card doc-card", className)}>
      {children}
    </Link>
  );
}

function CardLayout({
  href,
  icon,
  title,
  className,
  description,
}: {
  href: string;
  icon: ReactNode;
  title: string;
  className?: string;
  description?: string;
}): ReactNode {
  return (
    <CardContainer href={href} className={className}>
      <div className="card-body">
        <Heading as="h2" className="card-title doc-card-title" title={title}>
          {icon} {title}
        </Heading>
        {description && (
          <p className="doc-card-description" title={description}>
            {description}
          </p>
        )}
      </div>
    </CardContainer>
  );
}

function getFallbackIcon(
  item: PropSidebarItemLink | PropSidebarItemCategory,
): ReactNode {
  if (item.type === "category") {
    return <IconCategory className="doc-card-icon" />;
  }
  return isInternalUrl(item.href) ? (
    <IconFile className="doc-card-icon" />
  ) : (
    <IconLink className="doc-card-icon" />
  );
}

// A leading emoji in the sidebar label is used as the card icon and
// stripped from the card title, like upstream theme-classic does
function getIconTitleProps(
  item: PropSidebarItemLink | PropSidebarItemCategory,
): { icon: ReactNode; title: string } {
  const extracted = extractLeadingEmoji(item.label ?? "");
  return {
    icon: extracted.emoji ?? getFallbackIcon(item),
    title: extracted.rest.trim(),
  };
}

function CardCategory({
  item,
  className,
}: {
  item: PropSidebarItemCategory;
  className?: string;
}): ReactNode | null {
  const href = findFirstSidebarItemLink(item);
  const categoryItemsPlural = useDocCardDescriptionCategoryItemsPlural();

  // Unexpected: categories that don't have a link have been filtered upfront
  if (!href) {
    return null;
  }

  return (
    <CardLayout
      href={href}
      className={className}
      description={item.description ?? categoryItemsPlural(item.items.length)}
      {...getIconTitleProps(item)}
    />
  );
}

function CardLink({ item }: { item: PropSidebarItemLink }): ReactNode {
  const doc = useDocById(item.docId ?? undefined);
  return (
    <CardLayout
      href={item.href}
      description={item.description ?? doc?.description}
      {...getIconTitleProps(item)}
    />
  );
}

export default function DocCard({ item }: Props): ReactNode {
  switch (item.type) {
    case "link":
      return <CardLink item={item} />;
    case "category":
      return <CardCategory item={item} />;
    default:
      throw new Error(`unknown item type ${JSON.stringify(item)}`);
  }
}
