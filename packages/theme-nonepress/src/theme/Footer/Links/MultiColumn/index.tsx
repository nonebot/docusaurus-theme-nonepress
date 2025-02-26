import React from "react";

import LinkItem from "@theme/Footer/LinkItem";
import type { Props } from "@theme/Footer/Links/MultiColumn";

type ColumnType = Props["columns"][number];
type ColumnItemType = ColumnType["items"][number];

function ColumnLinkItem({ item }: { item: ColumnItemType }) {
  return item.html ? (
    <div
      // Developer provided the HTML, so assume it's safe.

      dangerouslySetInnerHTML={{ __html: item.html }}
    />
  ) : (
    <LinkItem item={item} />
  );
}

function Column({ column }: { column: ColumnType }) {
  return (
    <div>
      <span className="footer-title">{column.title}</span>
      {column.items.map((item, i) => (
        <ColumnLinkItem key={i} item={item} />
      ))}
    </div>
  );
}

export default function FooterLinksMultiColumn({
  columns,
}: Props): React.ReactNode {
  return (
    <>
      {columns.map((column, i) => (
        <Column key={i} column={column} />
      ))}
    </>
  );
}
