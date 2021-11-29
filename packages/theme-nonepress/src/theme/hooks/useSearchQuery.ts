import { useCallback, useEffect, useState } from "react";

import { useHistory } from "@docusaurus/router";
import type { SearchQuery } from "@theme/hooks/useSearchQuery";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

const SEARCH_PARAM_QUERY = "q";

function useSearchQuery(): SearchQuery {
  const history = useHistory();
  const {
    siteConfig: { baseUrl },
  } = useDocusaurusContext();

  const [searchQuery, setSearchQueryState] = useState("");

  // Init search query just after React hydration
  useEffect(() => {
    const searchQueryStringValue =
      new URLSearchParams(window.location.search).get(SEARCH_PARAM_QUERY) ?? "";

    setSearchQueryState(searchQueryStringValue);
  }, []);

  const setSearchQuery = useCallback(
    (newSearchQuery: string) => {
      const searchParams = new URLSearchParams(window.location.search);

      if (newSearchQuery) {
        searchParams.set(SEARCH_PARAM_QUERY, newSearchQuery);
      } else {
        searchParams.delete(SEARCH_PARAM_QUERY);
      }

      history.replace({
        search: searchParams.toString(),
      });
      setSearchQueryState(newSearchQuery);
    },
    [history]
  );

  const generateSearchPageLink = useCallback(
    (targetSearchQuery: string) =>
      // Refer to https://github.com/facebook/docusaurus/pull/2838
      `${baseUrl}search?q=${encodeURIComponent(targetSearchQuery)}`,
    [baseUrl]
  );

  return {
    searchQuery,
    setSearchQuery,
    generateSearchPageLink,
  };
}

export default useSearchQuery;
