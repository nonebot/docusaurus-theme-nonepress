import { useMemo } from "react";

import {
  useVersions,
  useLatestVersion,
} from "@docusaurus/plugin-content-docs/client";
import { CURRENT_VERSION_NAME } from "@docusaurus/plugin-content-docs/src/constants.ts";
import { useDocsVersionCandidates } from "@docusaurus/theme-common/internal";
import { useActiveDocCategory } from "@nullbot/docusaurus-plugin-docsmenu/client";

import type { DocsMenuCategory, DocsMenuVersions } from "./types";

export function useDocsMenuCategory(
  category: string,
  docId?: string,
  docsPluginId?: string,
): DocsMenuCategory {
  const versions = useDocsVersionCandidates(docsPluginId);
  const categoryDocs = useActiveDocCategory(category, docsPluginId);

  return useMemo((): DocsMenuCategory => {
    if (docId) {
      const allDocs = versions.flatMap((version) => version.docs);
      const doc = allDocs.find((versionDoc) => versionDoc.id === docId);
      if (!doc) {
        throw new Error(`Doc with id '${docId}' not found`);
      }
      return {
        link: doc.path,
        docs: categoryDocs?.docs,
      };
    } else if (!categoryDocs) {
      throw new Error(`Category '${category}' not found`);
    } else {
      const { permalink } = categoryDocs.docs[0];
      return {
        link: permalink,
        docs: categoryDocs?.docs,
      };
    }
  }, [docId, versions, category, categoryDocs]);
}

export function useDocsMenuVersions(
  docsPluginId?: string,
): DocsMenuVersions | null {
  const versions = useVersions(docsPluginId);
  const latestVersion = useLatestVersion(docsPluginId);

  return useMemo((): DocsMenuVersions | null => {
    const nextVersion = versions.find(
      (version) => version.name === CURRENT_VERSION_NAME,
    );
    if (!nextVersion || latestVersion.name === nextVersion.name) {
      return null;
    }
    return {
      latest: latestVersion,
      next: nextVersion,
    };
  }, [versions, latestVersion]);
}
