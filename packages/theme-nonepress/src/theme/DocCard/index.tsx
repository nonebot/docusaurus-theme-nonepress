import React, { type ReactNode } from "react";

import clsx from "clsx";

import "./styles.css";
import Link from "@docusaurus/Link";
import { translate } from "@docusaurus/Translate";
import isInternalUrl from "@docusaurus/isInternalUrl";
import type {
  PropSidebarItemCategory,
  PropSidebarItemLink,
} from "@docusaurus/plugin-content-docs";
import {
  findFirstCategoryLink,
  useDocById,
} from "@docusaurus/theme-common/internal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import type { Props } from "@theme/DocCard";

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
    <Link href={href} className={clsx("card bg-base-100 shadow-md", className)}>
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
        <h2 className="card-title truncate" title={title}>
          {icon} {title}
        </h2>
        {description && (
          <p className="truncate" title={description}>
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
  const href = findFirstCategoryLink(item);

  // Unexpected: categories that don't have a link have been filtered upfront
  if (!href) {
    return null;
  }

  return (
    <CardLayout
      href={href}
      icon={<FontAwesomeIcon className="card-icon" icon={["fas", "book"]} />}
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
    <FontAwesomeIcon className="card-icon" icon={["fas", "file-lines"]} />
  ) : (
    <FontAwesomeIcon className="card-icon" icon={["fab", "link"]} />
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
