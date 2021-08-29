import {
  useAllDocsData,
  useActivePluginAndVersion,
} from "@theme/hooks/useDocs";
import {
  DEFAULT_SEARCH_TAG,
  docVersionSearchTag,
  useDocsPreferredVersionByPluginId,
} from "@docusaurus/theme-common";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import type { ContextualSearchFilters } from "@theme/hooks/useContextualSearchFilters";

// We may want to support multiple search engines, don't couple that to Algolia/DocSearch
// Maybe users will want to use its own search engine solution
function useContextualSearchFilters(): ContextualSearchFilters {
  const { i18n } = useDocusaurusContext();
  const allDocsData = useAllDocsData();
  const activePluginAndVersion = useActivePluginAndVersion();
  const docsPreferredVersionByPluginId = useDocsPreferredVersionByPluginId();

  function getDocPluginTags(pluginId: string) {
    const activeVersion =
      activePluginAndVersion?.activePlugin?.pluginId === pluginId
        ? activePluginAndVersion.activeVersion
        : undefined;

    const preferredVersion = docsPreferredVersionByPluginId[pluginId];

    const latestVersion = allDocsData[pluginId].versions.find((v) => v.isLast);

    const version = activeVersion ?? preferredVersion ?? latestVersion;

    return docVersionSearchTag(pluginId, version.name);
  }

  const tags = [
    DEFAULT_SEARCH_TAG,
    ...Object.keys(allDocsData).map(getDocPluginTags),
  ];

  return {
    locale: i18n.currentLocale,
    tags,
  };
}

export default useContextualSearchFilters;
