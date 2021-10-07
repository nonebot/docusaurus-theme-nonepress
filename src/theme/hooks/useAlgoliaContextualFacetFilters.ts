import type { AlgoliaContextualFacetFilters } from "@theme/hooks/useAlgoliaContextualFacetFilters";
import useContextualSearchFilters from "@theme/hooks/useContextualSearchFilters";

// Translate search-engine agnostic search filters to Algolia search filters
function useAlgoliaContextualFacetFilters(): AlgoliaContextualFacetFilters {
  const { locale, tags } = useContextualSearchFilters();

  // seems safe to convert locale->language, see AlgoliaSearchMetadatas comment
  const languageFilter = `language:${locale}`;

  const tagsFilter = tags.map((tag) => `docusaurus_tag:${tag}`);

  return [languageFilter, tagsFilter];
}

export default useAlgoliaContextualFacetFilters;
