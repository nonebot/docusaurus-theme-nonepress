import { DEFAULT_PLUGIN_ID } from "@docusaurus/constants";
import type {
  PropSidebars,
  PropSidebar,
} from "@docusaurus/plugin-content-docs";
import { usePluginData } from "@docusaurus/useGlobalData";

export type GlobalDocsVersion = {
  readonly versionName: string;
  readonly sidebars: PropSidebars;
};

export type GlobalDocsInstance = {
  loadedVersions: GlobalDocsVersion[];
};

export type GlobalPluginData = {
  [docPluginID: string]: GlobalDocsInstance;
};

export const useSidebarData = (): GlobalPluginData | undefined =>
  usePluginData("docusaurus-plugin-getsidebar", undefined, {
    failfast: false,
  }) as GlobalPluginData | undefined;

export const useVersionedSidebars = (
  version: string,
  docPluginID?: string,
): GlobalDocsVersion | undefined => {
  const data = useSidebarData();

  if (!data) {
    return;
  }

  return data[docPluginID ?? DEFAULT_PLUGIN_ID]?.loadedVersions.find(
    (menuVersion) => menuVersion.versionName === version,
  );
};

export const useVersionedSidebar = (
  version: string,
  sidebarId: string,
  docPluginID: string | undefined,
): PropSidebar | undefined => {
  const data = useVersionedSidebars(version, docPluginID);
  if (!data) {
    return;
  }

  return data.sidebars[sidebarId];
};
