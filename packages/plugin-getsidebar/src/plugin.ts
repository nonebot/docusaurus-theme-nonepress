import type {
  LoadedContent,
  LoadedVersion,
} from "@docusaurus/plugin-content-docs";
import { toSidebarsProp } from "@docusaurus/plugin-content-docs/lib/props.js";
import type { LoadContext, Plugin } from "@docusaurus/types";

import type {
  GlobalDocsInstance,
  GlobalDocsVersion,
  GlobalPluginData,
} from "./client";
import type { PluginOptions } from "./types";

export default async function pluginDocMenu(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  context: LoadContext,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  options: PluginOptions,
): Promise<Plugin<void>> {
  return {
    name: "docusaurus-plugin-getsidebar",
    async allContentLoaded({
      allContent,
      actions: { setGlobalData },
    }): Promise<void> {
      const docContent = allContent["docusaurus-plugin-content-docs"] as {
        [docID: string]: LoadedContent;
      };

      if (!docContent) {
        return;
      }

      const processDocsVersion = async (
        version: LoadedVersion,
      ): Promise<GlobalDocsVersion> => {
        return {
          versionName: version.versionName,
          sidebars: toSidebarsProp(version),
        };
      };

      const processDocsContent = async (
        content: LoadedContent,
      ): Promise<GlobalDocsInstance> => {
        return {
          loadedVersions: await Promise.all(
            content.loadedVersions.map(processDocsVersion),
          ),
        };
      };

      const data: GlobalPluginData = Object.fromEntries<GlobalDocsInstance>(
        await Promise.all(
          Object.entries(docContent).map(async ([docID, content]) => {
            return [docID, await processDocsContent(content)] as const;
          }),
        ),
      );

      setGlobalData(data);
    },
  };
}
