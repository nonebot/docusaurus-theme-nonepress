import type {
  LoadedContent,
  LoadedVersion,
} from "@docusaurus/plugin-content-docs";
import type { Plugin } from "@docusaurus/types";
import type {
  Doc,
  DocsCategory,
  GlobalDocsInstance,
  GlobalDocsVersion,
  GlobalPluginData,
} from "./client";
import type { DocFrontmatter } from "./types";

const DEFAULT_WEIGHT = 9999;

export default async function pluginDocMenu(): Promise<Plugin<void>> {
  return {
    name: "docusaurus-plugin-docmenu",
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
        const groups: { [category: string]: Doc[] } = {};
        version.docs.forEach((doc) => {
          const categories =
            (doc.frontMatter as DocFrontmatter).options?.menu ?? [];
          categories.forEach((item) => {
            groups[item.category] = groups[item.category] ?? [];
            groups[item.category]?.push({
              id: doc.id,
              title: doc.title,
              description: doc.description,
              permalink: doc.permalink,
              weight: item.weight ?? DEFAULT_WEIGHT,
            });
          });
        });

        return {
          versionName: version.versionName,
          categories: Object.entries(groups)
            .map(([name, docs]) => ({
              name,
              docs: docs.sort((a, b) => a.weight - b.weight),
            }))
            .filter(({ docs }) => docs.length > 0) as DocsCategory[],
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
