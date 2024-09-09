import React from "react";

import clsx from "clsx";

import {
  filterDocCardListItems,
  useCurrentSidebarCategory,
} from "@docusaurus/plugin-content-docs/lib/client/docsUtils.js";

import DocCard from "@theme/DocCard";
import type { Props } from "@theme/DocCardList";

import "./styles.css";

function DocCardListForCurrentSidebarCategory(props: Props) {
  const category = useCurrentSidebarCategory();
  return <DocCardList {...props} items={category.items} />;
}

export default function DocCardList(props: Props): JSX.Element {
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
