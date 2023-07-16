import React from "react";

import MenuHtml from "@theme/Menu/Html";
import type { Props } from "@theme/NavbarItem/HtmlNavbarItem";

export default function HtmlNavbarItem({
  value,
  className,
}: Props): JSX.Element {
  return <MenuHtml className={className} html={value} />;
}
