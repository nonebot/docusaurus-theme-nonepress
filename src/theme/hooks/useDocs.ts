import { usePluginData } from "@docusaurus/useGlobalData";
import { GlobalPluginData } from "docusaurus-theme-nonepress/types";

export * from "@docusaurus/plugin-content-docs/lib/theme/hooks/useDocs";

export function useLoadedVersions(
  pluginId: string | undefined
): GlobalPluginData {
  return usePluginData(
    "docusaurus-theme-nonepress",
    pluginId
  ) as GlobalPluginData;
}
