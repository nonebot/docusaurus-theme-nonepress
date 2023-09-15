import { DEFAULT_PLUGIN_ID } from "@docusaurus/constants";
import { useDocsVersionCandidates } from "@docusaurus/theme-common/internal";
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
  docs: [Doc, ...Doc[]];
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

export const useVersionedDocMenu = (
  version: string,
  docPluginID?: string,
): GlobalDocsVersion | undefined => {
  const data = useDocMenuData();

  if (!data) {
    return;
  }

  return data[docPluginID ?? DEFAULT_PLUGIN_ID]?.loadedVersions.find(
    (menuVersion) => menuVersion.versionName === version,
  );
};

export const useVersionedDocCategory = (
  version: string,
  category: string,
  docPluginID?: string,
): DocsCategory | undefined => {
  const data = useVersionedDocMenu(version, docPluginID);
  if (!data) {
    return;
  }

  return data.categories.find((c) => c.name === category);
};
