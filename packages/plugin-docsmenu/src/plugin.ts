import type {
  LoadedContent,
  LoadedVersion,
} from "@docusaurus/plugin-content-docs";
import type { LoadContext, Plugin } from "@docusaurus/types";

import type {
  Doc,
  GlobalDocsInstance,
  GlobalDocsVersion,
  GlobalPluginData,
} from "./client";
import { PLUGIN_NAME } from "./client";
import type { DocFrontmatter, PluginOptions } from "./types";

const DEFAULT_WEIGHT = 9999;

export default async function pluginDocMenu(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  context: LoadContext,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  options: PluginOptions,
): Promise<Plugin<void>> {
  return {
    name: PLUGIN_NAME,
    async contentLoaded({
      allContent,
      actions: { setGlobalData },
    }): Promise<void> {
      const docContent = allContent["docusaurus-plugin-content-docs"] as {
        [docID: string]: LoadedContent;
      };

      if (!docContent) return;

      async function processDocsVersion(
        version: LoadedVersion,
      ): Promise<GlobalDocsVersion> {
        const groups: { [category: string]: Doc[] } = {};
        version.docs.forEach((doc) => {
          const categories =
            (doc.frontMatter as DocFrontmatter).options?.menu ?? [];
          categories.forEach((options) => {
            groups[options.category] = groups[options.category] ?? [];
            groups[options.category].push({
              title: doc.title,
              description: doc.description,
              permalink: doc.permalink,
              weight: options.weight ?? DEFAULT_WEIGHT,
            });
          });
        });

        return {
          versionName: version.versionName,
          categories: Object.entries(groups).map(([name, docs]) => ({
            name,
            docs,
          })),
        };
      }

      async function processDocsContent(
        content: LoadedContent,
      ): Promise<GlobalDocsInstance> {
        return {
          loadedVersions: await Promise.all(
            content.loadedVersions.map(processDocsVersion),
          ),
        };
      }

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
