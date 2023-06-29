import { DEFAULT_PLUGIN_ID } from "@docusaurus/constants";
import { useActiveVersion } from "@docusaurus/plugin-content-docs/client";
import { usePluginData } from "@docusaurus/useGlobalData";

export type Doc = {
  id: string;
  title: string;
  description: string;
  permalink: string;
  weight: number;
};

export type DocsCategory = {
  name: string;
  docs: Doc[];
};

export type GlobalDocsVersion = {
  readonly versionName: string;
  readonly categories: DocsCategory[];
};

export type GlobalDocsInstance = {
  loadedVersions: GlobalDocsVersion[];
};

export type GlobalPluginData = {
  [docPluginID: string]: GlobalDocsInstance;
};

export const useDocMenuData = (): GlobalPluginData | undefined =>
  usePluginData("docusaurus-plugin-docmenu", undefined, { failfast: false }) as
    | GlobalPluginData
    | undefined;

export const useActiveDocMenu = (
  docPluginID?: string,
): GlobalDocsVersion | undefined => {
  const data = useDocMenuData();
  const version = useActiveVersion(docPluginID);

  if (!(data && version)) {
    return;
  }

  return data[docPluginID ?? DEFAULT_PLUGIN_ID]?.loadedVersions.find(
    (menuVersion) => menuVersion.versionName === version.name,
  );
};

export const useActiveDocCategory = (
  category: string,
  docPluginID: string | undefined,
): DocsCategory | undefined => {
  const data = useActiveDocMenu(docPluginID);
  if (!data) {
    return;
  }

  return data.categories.find((c) => c.name === category);
};
