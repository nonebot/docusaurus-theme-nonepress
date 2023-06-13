import type { GlobalPluginData } from "docusaurus-theme-nonepress/types";

import { usePluginData } from "@docusaurus/useGlobalData";

export * from "@docusaurus/plugin-content-docs/lib/theme/hooks/useDocs";

export function useLoadedVersions(
  pluginId: string | undefined
): GlobalPluginData {
  return usePluginData(
    "docusaurus-theme-nonepress",
    pluginId
  ) as GlobalPluginData;
}
