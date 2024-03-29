import type { GlobalVersion } from "@docusaurus/plugin-content-docs/client";
import type { Doc } from "@nullbot/docusaurus-plugin-docsmenu/client";

export type DocsMenuCategory = {
  link?: string;
  autoLink: string;
  docs: [Doc, ...Doc[]];
};
export type DocsMenuVersions = {
  latest: GlobalVersion;
  next: GlobalVersion;
};
