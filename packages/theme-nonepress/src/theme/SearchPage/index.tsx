import React, { useEffect, useReducer, useRef, useState } from "react";

import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
import Head from "@docusaurus/Head";
import Link from "@docusaurus/Link";
import Translate, { translate } from "@docusaurus/Translate";
import { useAllDocsData } from "@docusaurus/plugin-content-docs/client";
import {
  HtmlClassNameProvider,
  useEvent,
  usePluralForm,
  useSearchQueryString,
} from "@docusaurus/theme-common";
import { useTitleFormatter } from "@docusaurus/theme-common/internal";
import {
  useAlgoliaThemeConfig,
  useSearchResultUrlProcessor,
} from "@docusaurus/theme-search-algolia/client";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import algoliaSearch from "algoliasearch/lite";
import algoliaSearchHelper from "algoliasearch-helper";

import "./styles.css";
import IconAlgolia from "@theme/Icon/Algolia";
import Layout from "@theme/Layout";
import Page from "@theme/Page";
import translations from "@theme/SearchTranslations";

// Very simple pluralization: probably good enough for now
function useDocumentsFoundPlural() {
  const { selectMessage } = usePluralForm();
  return (count: number) =>
    selectMessage(
      count,
      translate(
        {
          id: "theme.SearchPage.documentsFound.plurals",
          description:
            'Pluralized label for "{count} documents found". Use as much plural forms (separated by "|") as your language support (see https://www.unicode.org/cldr/cldr-aux/charts/34/supplemental/language_plural_rules.html)',
          message: "One document found|{count} documents found",
        },
        { count },
      ),
    );
}

function useDocsSearchVersionsHelpers() {
  const allDocsData = useAllDocsData();

  // State of the version select menus / algolia facet filters
  // docsPluginId -> versionName map
  const [searchVersions, setSearchVersions] = useState<{
    [pluginId: string]: string;
  }>(() =>
    Object.entries(allDocsData).reduce(
      (acc, [pluginId, pluginData]) => ({
        ...acc,
        [pluginId]: pluginData.versions[0]!.name,
      }),
      {},
    ),
  );

  // Set the value of a single select menu
  const setSearchVersion = (pluginId: string, searchVersion: string) =>
    setSearchVersions((s) => ({ ...s, [pluginId]: searchVersion }));

  const versioningEnabled = Object.values(allDocsData).some(
    (docsData) => docsData.versions.length > 1,
  );

  return {
    allDocsData,
    versioningEnabled,
    searchVersions,
    setSearchVersion,
  };
}

// We want to display one select per versioned docs plugin instance
function SearchVersionSelectList({
  docsSearchVersionsHelpers,
}: {
  docsSearchVersionsHelpers: ReturnType<typeof useDocsSearchVersionsHelpers>;
}) {
  const versionedPluginEntries = Object.entries(
    docsSearchVersionsHelpers.allDocsData,
  )
    // Do not show a version select for unversioned docs plugin instances
    .filter(([, docsData]) => docsData.versions.length > 1);

  return (
    <>
      {versionedPluginEntries.map(([pluginId, docsData]) => {
        const labelPrefix =
          versionedPluginEntries.length > 1 ? `${pluginId}: ` : "";
        return (
          <select
            key={pluginId}
            onChange={(e) =>
              docsSearchVersionsHelpers.setSearchVersion(
                pluginId,
                e.target.value,
              )
            }
            defaultValue={docsSearchVersionsHelpers.searchVersions[pluginId]}
            className="select select-bordered join-item"
          >
            {docsData.versions.map((version, i) => (
              <option
                key={i}
                label={`${labelPrefix}${version.label}`}
                value={version.name}
              />
            ))}
          </select>
        );
      })}
    </>
  );
}

type ResultDispatcherState = {
  items: {
    title: string;
    url: string;
    summary: string;
    breadcrumbs: string[];
  }[];
  query: string | null;
  totalResults: number | null;
  totalPages: number | null;
  lastPage: number | null;
  hasMore: boolean | null;
  loading: boolean | null;
};

type ResultDispatcher =
  | { type: "reset"; value?: undefined }
  | { type: "loading"; value?: undefined }
  | { type: "update"; value: ResultDispatcherState }
  | { type: "advance"; value?: undefined };

function SearchPageContent(): JSX.Element {
  const {
    i18n: { currentLocale },
  } = useDocusaurusContext();
  const {
    algolia: { appId, apiKey, indexName },
  } = useAlgoliaThemeConfig();
  const processSearchResultUrl = useSearchResultUrlProcessor();
  const documentsFoundPlural = useDocumentsFoundPlural();

  const docsSearchVersionsHelpers = useDocsSearchVersionsHelpers();
  const [searchQuery, setSearchQuery] = useSearchQueryString();
  const initialSearchResultState: ResultDispatcherState = {
    items: [],
    query: null,
    totalResults: null,
    totalPages: null,
    lastPage: null,
    hasMore: null,
    loading: null,
  };
  const [searchResultState, searchResultStateDispatcher] = useReducer(
    (prevState: ResultDispatcherState, data: ResultDispatcher) => {
      switch (data.type) {
        case "reset": {
          return initialSearchResultState;
        }
        case "loading": {
          return { ...prevState, loading: true };
        }
        case "update": {
          if (searchQuery !== data.value.query) {
            return prevState;
          }

          return {
            ...data.value,
            items:
              data.value.lastPage === 0
                ? data.value.items
                : prevState.items.concat(data.value.items),
          };
        }
        case "advance": {
          const hasMore = prevState.totalPages! > prevState.lastPage! + 1;

          return {
            ...prevState,
            lastPage: hasMore ? prevState.lastPage! + 1 : prevState.lastPage,
            hasMore,
          };
        }
        default:
          return prevState;
      }
    },
    initialSearchResultState,
  );

  const algoliaClient = algoliaSearch(appId, apiKey);
  const algoliaHelper = algoliaSearchHelper(algoliaClient, indexName, {
    hitsPerPage: 15,
    advancedSyntax: true,
    disjunctiveFacets: ["language", "docusaurus_tag"],
  });

  algoliaHelper.on(
    "result",
    ({ results: { query, hits, page, nbHits, nbPages } }) => {
      if (query === "" || !Array.isArray(hits)) {
        searchResultStateDispatcher({ type: "reset" });
        return;
      }

      const sanitizeValue = (value: string) =>
        value.replace(
          /algolia-docsearch-suggestion--highlight/g,
          "doc-search-page-result-match",
        );

      const items = hits.map(
        ({
          url,
          _highlightResult: { hierarchy },
          _snippetResult: snippet = {},
        }: {
          url: string;
          _highlightResult: { hierarchy: { [key: string]: { value: string } } };
          _snippetResult: { content?: { value: string } };
        }) => {
          const titles = Object.keys(hierarchy).map((key) =>
            sanitizeValue(hierarchy[key]!.value),
          );
          return {
            title: titles.pop()!,
            url: processSearchResultUrl(url),
            summary: snippet.content
              ? `${sanitizeValue(snippet.content.value)}...`
              : "",
            breadcrumbs: titles,
          };
        },
      );

      searchResultStateDispatcher({
        type: "update",
        value: {
          items,
          query,
          totalResults: nbHits,
          totalPages: nbPages,
          lastPage: page,
          hasMore: nbPages > page + 1,
          loading: false,
        },
      });
    },
  );

  const [loaderRef, setLoaderRef] = useState<HTMLDivElement | null>(null);
  const prevY = useRef(0);
  const observer = useRef(
    ExecutionEnvironment.canUseIntersectionObserver &&
      new IntersectionObserver(
        (entries) => {
          const {
            isIntersecting,
            boundingClientRect: { y: currentY },
          } = entries[0]!;

          if (isIntersecting && prevY.current > currentY) {
            searchResultStateDispatcher({ type: "advance" });
          }

          prevY.current = currentY;
        },
        { threshold: 1 },
      ),
  );

  const getTitle = () =>
    searchQuery
      ? translate(
          {
            id: "theme.SearchPage.existingResultsTitle",
            message: 'Search results for "{query}"',
            description: "The search page title for non-empty query",
          },
          {
            query: searchQuery,
          },
        )
      : translate({
          id: "theme.SearchPage.emptyResultsTitle",
          message: "Search the documentation",
          description: "The search page title for empty query",
        });

   
  const makeSearch = useEvent((page: number = 0) => {
    algoliaHelper.addDisjunctiveFacetRefinement("docusaurus_tag", "default");
    algoliaHelper.addDisjunctiveFacetRefinement("language", currentLocale);

    Object.entries(docsSearchVersionsHelpers.searchVersions).forEach(
      ([pluginId, searchVersion]) => {
        algoliaHelper.addDisjunctiveFacetRefinement(
          "docusaurus_tag",
          `docs-${pluginId}-${searchVersion}`,
        );
      },
    );

    algoliaHelper.setQuery(searchQuery).setPage(page).search();
  });

  useEffect(() => {
    if (!loaderRef) {
      return undefined;
    }
    const currentObserver = observer.current;
    if (currentObserver) {
      currentObserver.observe(loaderRef);
      return () => currentObserver.unobserve(loaderRef);
    }
    return () => true;
  }, [loaderRef]);

  useEffect(() => {
    searchResultStateDispatcher({ type: "reset" });

    if (searchQuery) {
      searchResultStateDispatcher({ type: "loading" });

      setTimeout(() => {
        makeSearch();
      }, 300);
    }
  }, [searchQuery, docsSearchVersionsHelpers.searchVersions, makeSearch]);

  useEffect(() => {
    if (!searchResultState.lastPage || searchResultState.lastPage === 0) {
      return;
    }

    makeSearch(searchResultState.lastPage);
  }, [makeSearch, searchResultState.lastPage]);

  return (
    <Layout>
      <Head>
        <title>{useTitleFormatter(getTitle())}</title>
        {/*
         We should not index search pages
          See https://github.com/facebook/docusaurus/pull/3233
        */}
        <meta property="robots" content="noindex, follow" />
      </Head>

      <Page hideSidebar hideTableOfContents>
        <main className="prose max-w-none">
          <h1>{getTitle()}</h1>

          <form
            className="join doc-search-page-form"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="search"
              name="q"
              className="input input-bordered join-item doc-search-page-form-input"
              placeholder={translate({
                id: "theme.SearchPage.inputPlaceholder",
                message: "Type your search here",
                description: "The placeholder for search page input",
              })}
              aria-label={translate({
                id: "theme.SearchPage.inputLabel",
                message: "Search",
                description: "The ARIA label for search page input",
              })}
              onChange={(e) => setSearchQuery(e.target.value)}
              value={searchQuery}
              autoComplete="off"
              autoFocus
            />

            {docsSearchVersionsHelpers.versioningEnabled && (
              <SearchVersionSelectList
                docsSearchVersionsHelpers={docsSearchVersionsHelpers}
              />
            )}
          </form>

          <div className="doc-search-page-tagline">
            <div className="doc-search-page-tagline-result">
              {!!searchResultState.totalResults &&
                documentsFoundPlural(searchResultState.totalResults)}
            </div>

            <div className="doc-search-page-tagline-logo">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.algolia.com/"
                aria-label={translate({
                  id: "theme.SearchPage.algoliaLabel",
                  message: "Search by Algolia",
                  description: "The ARIA label for Algolia mention",
                })}
              >
                <span>
                  {translations.modal?.footer?.searchByText ?? "Search by"}
                </span>
                <IconAlgolia />
              </a>
            </div>
          </div>

          {searchResultState.items.length > 0 ? (
            <section>
              {searchResultState.items.map(
                ({ title, url, summary, breadcrumbs }, i) => (
                  <article key={i} className="doc-search-page-result">
                    <h2 className="doc-search-page-result-title">
                      <Link
                        to={url}
                        dangerouslySetInnerHTML={{ __html: title }}
                      />
                    </h2>

                    {breadcrumbs.length > 0 && (
                      <nav
                        className="breadcrumbs doc-search-page-result-breadcrumbs not-prose"
                        aria-label="breadcrumbs"
                      >
                        <ul>
                          {breadcrumbs.map((html, index) => (
                            <li
                              key={index}
                              // Developer provided the HTML, so assume it's safe.
                              dangerouslySetInnerHTML={{ __html: html }}
                            />
                          ))}
                        </ul>
                      </nav>
                    )}

                    {summary && (
                      <p
                        className="doc-search-page-result-summary"
                        // Developer provided the HTML, so assume it's safe.
                        dangerouslySetInnerHTML={{ __html: summary }}
                      />
                    )}
                  </article>
                ),
              )}
            </section>
          ) : (
            [
              searchQuery && !searchResultState.loading && (
                <p key="no-results">
                  <Translate
                    id="theme.SearchPage.noResultsText"
                    description="The paragraph for empty search result"
                  >
                    No results were found
                  </Translate>
                </p>
              ),
              !!searchResultState.loading && (
                <div className="doc-search-page-spinner-container">
                  <div
                    key="spinner"
                    className="loading loading-spinner doc-search-page-spinner"
                  />
                </div>
              ),
            ]
          )}

          {searchResultState.hasMore && (
            <div className="doc-search-page-result-more" ref={setLoaderRef}>
              <Translate
                id="theme.SearchPage.fetchingNewResults"
                description="The paragraph for fetching new search results"
              >
                Fetching new results...
              </Translate>
            </div>
          )}
        </main>
      </Page>
    </Layout>
  );
}

export default function SearchPage(): JSX.Element {
  return (
    <HtmlClassNameProvider className="search-page-wrapper">
      <SearchPageContent />
    </HtmlClassNameProvider>
  );
}
