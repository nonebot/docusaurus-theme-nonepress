import React from "react";

import MenuHtml from "@theme/Menu/Html";
import type { Props } from "@theme/NavbarItem/HtmlNavbarItem";

export default function HtmlNavbarItem({
  value,
  className,
}: Props): React.ReactNode {
  return <MenuHtml className={className} html={value} />;
}
