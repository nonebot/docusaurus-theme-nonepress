import React, { type ReactNode } from "react";

import clsx from "clsx";

import {
  filterDocCardListItems,
  useCurrentSidebarSiblings,
} from "@docusaurus/plugin-content-docs/client";

import DocCard from "@theme/DocCard";
import type { Props } from "@theme/DocCardList";

import "./styles.css";

function DocCardListForCurrentSidebarCategory(props: Props) {
  const items = useCurrentSidebarSiblings();
  return <DocCardList {...props} items={items} />;
}

export default function DocCardList(props: Props): ReactNode {
  const { items, className } = props;
  if (!items) {
    return <DocCardListForCurrentSidebarCategory {...props} />;
  }
  const filteredItems = filterDocCardListItems(items);

  return (
    <section className={clsx("not-prose doc-card-list", className)}>
      {filteredItems.map((item, index) => (
        <article key={index}>
          <DocCard item={item} />
        </article>
      ))}
    </section>
  );
}
