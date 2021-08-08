import useContextualSearchFilters from "@theme/hooks/useContextualSearchFilters";

// Translate search-engine agnostic search filters to Algolia search filters
export default function useAlgoliaContextualFacetFilters() {
  const { locale, tags } = useContextualSearchFilters();

  // seems safe to convert locale->language, see AlgoliaSearchMetadatas comment
  const languageFilter = `language:${locale}`;

  const tagsFilter = tags.map((tag) => `docusaurus_tag:${tag}`);

  return [languageFilter, tagsFilter];
}
