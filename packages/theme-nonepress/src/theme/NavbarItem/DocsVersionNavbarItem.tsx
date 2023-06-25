import React from "react";

import type { GlobalVersion } from "@docusaurus/plugin-content-docs/client";
import { useDocsVersionCandidates } from "@docusaurus/theme-common/internal";

import DefaultNavbarItem from "@theme/NavbarItem/DefaultNavbarItem";
import type { Props } from "@theme/NavbarItem/DocsVersionNavbarItem";

const getVersionMainDoc = (version: GlobalVersion) =>
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  version.docs.find((doc) => doc.id === version.mainDocId)!;

export default function DocsVersionNavbarItem({
  label: staticLabel,
  to: staticTo,
  docsPluginId,
  ...props
}: Props): JSX.Element {
  const version = useDocsVersionCandidates(docsPluginId)[0];
  const label = staticLabel ?? version.label;
  const path = staticTo ?? getVersionMainDoc(version).path;
  return <DefaultNavbarItem {...props} label={label} to={path} />;
}
