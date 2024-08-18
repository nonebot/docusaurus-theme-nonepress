import React, { type ReactNode } from "react";

import clsx from "clsx";

import Link from "@docusaurus/Link";
import { translate } from "@docusaurus/Translate";
import isInternalUrl from "@docusaurus/isInternalUrl";
import {
  findFirstSidebarItemLink,
  useDocById,
} from "@docusaurus/plugin-content-docs/client";

import type { Props } from "@theme/DocCard";
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
}): JSX.Element {
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
}): JSX.Element {
  return (
    <CardContainer href={href} className={className}>
      <div className="card-body">
        <h2 className="card-title doc-card-title" title={title}>
          {icon} {title}
        </h2>
        {description && (
          <p className="doc-card-description" title={description}>
            {description}
          </p>
        )}
      </div>
    </CardContainer>
  );
}

function CardCategory({
  item,
  className,
}: {
  item: PropSidebarItemCategory;
  className?: string;
}): JSX.Element | null {
  const href = findFirstSidebarItemLink(item);

  // Unexpected: categories that don't have a link have been filtered upfront
  if (!href) {
    return null;
  }

  return (
    <CardLayout
      href={href}
      icon={<IconCategory className="doc-card-icon" />}
      title={item.label}
      className={className}
      description={
        item.description ??
        translate(
          {
            message: "{count} items",
            id: "theme.docs.DocCard.categoryDescription",
            description:
              "The default description for a category card in the generated index about how many items this category includes",
          },
          { count: item.items.length },
        )
      }
    />
  );
}

function CardLink({ item }: { item: PropSidebarItemLink }): JSX.Element {
  const icon = isInternalUrl(item.href) ? (
    <IconFile className="doc-card-icon" />
  ) : (
    <IconLink className="doc-card-icon" />
  );
  const doc = useDocById(item.docId ?? undefined);
  return (
    <CardLayout
      href={item.href}
      icon={icon}
      title={item.label}
      description={item.description ?? doc?.description}
    />
  );
}

export default function DocCard({ item }: Props): JSX.Element {
  switch (item.type) {
    case "link":
      return <CardLink item={item} />;
    case "category":
      return <CardCategory item={item} />;
    default:
      throw new Error(`unknown item type ${JSON.stringify(item)}`);
  }
}
