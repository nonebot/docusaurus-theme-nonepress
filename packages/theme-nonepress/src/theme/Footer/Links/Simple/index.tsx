import React from "react";

import LinkItem from "@theme/Footer/LinkItem";
import type { Props } from "@theme/Footer/Links/Simple";

function SimpleLinkItem({ item }: { item: Props["links"][number] }) {
  return item.html ? (
    <span
      // Developer provided the HTML, so assume it's safe.

      dangerouslySetInnerHTML={{ __html: item.html }}
    />
  ) : (
    <LinkItem item={item} />
  );
}

export default function FooterLinksSimple({ links }: Props): React.ReactNode {
  return (
    <div>
      {links.map((item, i) => (
        <SimpleLinkItem key={i} item={item} />
      ))}
    </div>
  );
}
