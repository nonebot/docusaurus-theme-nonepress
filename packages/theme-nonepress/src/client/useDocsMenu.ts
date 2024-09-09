import { useMemo } from "react";

import {
  useDocsVersionCandidates,
  useLatestVersion,
  useVersions,
} from "@docusaurus/plugin-content-docs/client";
import { CURRENT_VERSION_NAME } from "@docusaurus/plugin-content-docs/src/constants.ts";
import { useVersionedDocCategory } from "@nullbot/docusaurus-plugin-docsmenu/client";

import type { DocsMenuCategory, DocsMenuVersions } from "./types";

export function useDocsMenuCategory(
  category: string,
  docId?: string,
  docsPluginId?: string,
): DocsMenuCategory {
  const versions = useDocsVersionCandidates(docsPluginId);
  const categoryDocs = useVersionedDocCategory(
    versions[0].name,
    category,
    docsPluginId,
  );

  return useMemo((): DocsMenuCategory => {
    if (!categoryDocs) {
      throw new Error(`Category '${category}' not found`);
    }

    const { permalink: autoLink } = categoryDocs.docs[0];

    if (docId) {
      const allDocs = versions.flatMap((version) => version.docs);
      const doc = allDocs.find((versionDoc) => versionDoc.id === docId);
      if (!doc) {
        throw new Error(`Doc with id '${docId}' not found`);
      }
      return {
        link: doc.path,
        autoLink,
        docs: categoryDocs.docs,
      };
    }

    return {
      autoLink,
      docs: categoryDocs.docs,
    };
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
