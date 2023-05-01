import { useActiveVersion } from "@docusaurus/plugin-content-docs/client";
import { usePluginData } from "@docusaurus/useGlobalData";

export const PLUGIN_NAME = "docusaurus-plugin-docmenu";

export type Doc = {
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

export const useDocMenuData = (): GlobalPluginData =>
  usePluginData(PLUGIN_NAME, undefined, { failfast: true }) as GlobalPluginData;

export const useActiveDocMenu = (
  docPluginID: string | undefined,
): GlobalDocsVersion | undefined => {
  const data = useDocMenuData();

  const version = useActiveVersion(docPluginID);
  if (!version) return;

  return data[docPluginID]?.loadedVersions.find(
    (menuVersion) => menuVersion.versionName === version.name,
  );
};

export const useActiveDocCategory = (
  category: string,
  docPluginID: string | undefined,
): DocsCategory | undefined => {
  const data = useActiveDocMenu(docPluginID);
  if (!data) return;

  return data.categories.find((c) => c.name === category);
};
