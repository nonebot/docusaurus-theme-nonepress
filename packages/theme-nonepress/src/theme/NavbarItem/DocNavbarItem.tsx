import React, { type ReactNode } from "react";

// import { useActiveDocContext } from "@docusaurus/plugin-content-docs/client";
import { useLayoutDoc } from "@docusaurus/plugin-content-docs/client";

import DefaultNavbarItem from "@theme/NavbarItem/DefaultNavbarItem";
import type { Props } from "@theme/NavbarItem/DocNavbarItem";

export default function DocNavbarItem({
  docId,
  docsPluginId,
  label: staticLabel,
  ...props
}: Props): ReactNode | null {
  // const { activeDoc } = useActiveDocContext(docsPluginId);
  const doc = useLayoutDoc(docId, docsPluginId);

  // Draft items are not displayed in the navbar.
  if (doc === null) {
    return null;
  }

  return (
    <DefaultNavbarItem
      exact
      {...props}
      // isActive={() =>
      //   activeDoc?.path === doc.path ||
      //   (!!activeDoc?.sidebar && activeDoc.sidebar === doc.sidebar)
      // }
      label={staticLabel ?? doc.id}
      to={doc.path}
    />
  );
}
