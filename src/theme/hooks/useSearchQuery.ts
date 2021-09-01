import { useHistory, useLocation } from "@docusaurus/router";
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";

import { useSiteConfig } from "@theme/hooks/useThemeConfig";
import type { SearchQuery } from "@theme/hooks/useSearchQuery";

const SEARCH_PARAM_QUERY = "q";

function useSearchQuery(): SearchQuery {
  const history = useHistory();
  const location = useLocation();
  const { baseUrl } = useSiteConfig();

  return {
    searchValue:
      (ExecutionEnvironment.canUseDOM &&
        new URLSearchParams(location.search).get(SEARCH_PARAM_QUERY)) ||
      "",
    updateSearchPath: (searchValue) => {
      const searchParams = new URLSearchParams(location.search);

      if (searchValue) {
        searchParams.set(SEARCH_PARAM_QUERY, searchValue);
      } else {
        searchParams.delete(SEARCH_PARAM_QUERY);
      }

      history.replace({
        search: searchParams.toString(),
      });
    },
    generateSearchPageLink: (searchValue) => {
      // Refer to https://github.com/facebook/docusaurus/pull/2838
      return `${baseUrl}search?q=${encodeURIComponent(searchValue)}`;
    },
  };
}

export default useSearchQuery;
