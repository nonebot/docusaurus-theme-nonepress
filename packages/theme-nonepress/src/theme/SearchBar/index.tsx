import React, { useState, useRef, useCallback, useMemo } from "react";

import Link from "@docusaurus/Link";
import Head from "@docusaurus/Head";
import { createPortal } from "react-dom";
import { useHistory } from "@docusaurus/router";
import useThemeConfig from "@theme/hooks/useThemeConfig";
import { useBaseUrlUtils } from "@docusaurus/useBaseUrl";
import useSearchQuery from "@theme/hooks/useSearchQuery";
import { isRegexpStringMatch } from "@docusaurus/theme-common";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { DocSearchButton, useDocSearchKeyboardEvents } from "@docsearch/react";
import useAlgoliaContextualFacetFilters from "@theme/hooks/useAlgoliaContextualFacetFilters";

import type {
  DocSearchModal as DocSearchModalType,
  DocSearchModalProps,
} from "@docsearch/react";
import type {
  InternalDocSearchHit,
  StoredDocSearchHit,
} from "@docsearch/react/dist/esm/types";
import type { AutocompleteState } from "@algolia/autocomplete-core";

type DocSearchProps = Omit<
  DocSearchModalProps,
  "onClose" | "initialScrollY"
> & {
  contextualSearch?: boolean;
  externalUrlRegex?: string;
};

let DocSearchModal: typeof DocSearchModalType | null = null;

function Hit({
  hit,
  children,
}: {
  hit: InternalDocSearchHit | StoredDocSearchHit;
  children: React.ReactNode;
}) {
  return <Link to={hit.url}>{children}</Link>;
}

type ResultsFooterProps = {
  state: AutocompleteState<InternalDocSearchHit>;
  onClose: () => void;
};

function ResultsFooter({ state, onClose }: ResultsFooterProps) {
  const { generateSearchPageLink } = useSearchQuery();

  return (
    <Link to={generateSearchPageLink(state.query)} onClick={onClose}>
      See all {state.context.nbHits} results
    </Link>
  );
}

function DocSearch({
  contextualSearch,
  externalUrlRegex,
  ...props
}: DocSearchProps) {
  const { siteMetadata } = useDocusaurusContext();

  const contextualSearchFacetFilters = useAlgoliaContextualFacetFilters();

  const configFacetFilters = props.searchParameters?.facetFilters ?? [];

  const facetFilters = contextualSearch
    ? // Merge contextual search filters with config filters
      [...contextualSearchFacetFilters, ...configFacetFilters]
    : // ... or use config facetFilters
      configFacetFilters;

  // we let user override default searchParameters if he wants to
  const searchParameters = {
    ...props.searchParameters,
    facetFilters,
  };

  const { withBaseUrl } = useBaseUrlUtils();
  const history = useHistory();
  const searchContainer = useRef<HTMLDivElement | null>(null);
  const searchButtonRef = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [initialQuery, setInitialQuery] = useState<string | undefined>(
    undefined
  );

  const importDocSearchModalIfNeeded = useCallback(() => {
    if (DocSearchModal) {
      return Promise.resolve();
    }

    return Promise.all([
      import("@docsearch/react/modal"),
      import("@docsearch/react/style"),
      import("./styles.css"),
    ]).then(([{ DocSearchModal: Modal }]) => {
      DocSearchModal = Modal;
    });
  }, []);

  const onOpen = useCallback(() => {
    importDocSearchModalIfNeeded().then(() => {
      searchContainer.current = document.createElement("div");
      document.body.insertBefore(
        searchContainer.current,
        document.body.firstChild
      );
      setIsOpen(true);
    });
  }, [importDocSearchModalIfNeeded, setIsOpen]);

  const onClose = useCallback(() => {
    setIsOpen(false);
    searchContainer.current?.remove();
  }, [setIsOpen]);

  const onInput = useCallback(
    (event) => {
      importDocSearchModalIfNeeded().then(() => {
        setIsOpen(true);
        setInitialQuery(event.key);
      });
    },
    [importDocSearchModalIfNeeded, setIsOpen, setInitialQuery]
  );

  const navigator = useRef({
    navigate({ itemUrl }: { itemUrl?: string }) {
      // Algolia results could contain URL's from other domains which cannot
      // be served through history and should navigate with window.location
      if (isRegexpStringMatch(externalUrlRegex, itemUrl)) {
        window.location.href = itemUrl!;
      } else {
        history.push(itemUrl!);
      }
    },
  }).current;

  const transformItems = useRef<DocSearchModalProps["transformItems"]>(
    (items) =>
      items.map((item) => {
        // If Algolia contains a external domain, we should navigate without relative URL
        if (isRegexpStringMatch(externalUrlRegex, item.url)) {
          return item;
        }

        // We transform the absolute URL into a relative URL.
        const url = new URL(item.url);
        return {
          ...item,
          url: withBaseUrl(`${url.pathname}${url.hash}`),
        };
      })
  ).current;

  const resultsFooterComponent = useMemo(
    () => (footerProps: ResultsFooterProps) =>
      <ResultsFooter {...footerProps} onClose={onClose} />,
    [onClose]
  );

  const transformSearchClient = useCallback(
    (searchClient) => {
      searchClient.addAlgoliaAgent(
        "docusaurus",
        siteMetadata.docusaurusVersion
      );

      return searchClient;
    },
    [siteMetadata.docusaurusVersion]
  );

  useDocSearchKeyboardEvents({
    isOpen,
    onOpen,
    onClose,
    onInput,
    searchButtonRef,
  });

  return (
    <>
      <Head>
        {/* This hints the browser that the website will load data from Algolia,
        and allows it to preconnect to the DocSearch cluster. It makes the first
        query faster, especially on mobile. */}
        <link
          rel="preconnect"
          href={`https://${props.appId}-dsn.algolia.net`}
          crossOrigin="anonymous"
        />
      </Head>

      <div className="flex self-center relative order-last lg:order-none mr-5 lg:mr-0">
        <DocSearchButton
          onTouchStart={importDocSearchModalIfNeeded}
          onFocus={importDocSearchModalIfNeeded}
          onMouseOver={importDocSearchModalIfNeeded}
          onClick={onOpen}
          ref={searchButtonRef}
          translations={{
            buttonText: "Search",
            buttonAriaLabel: "Search",
          }}
        />
      </div>

      {isOpen &&
        DocSearchModal &&
        searchContainer.current &&
        createPortal(
          <DocSearchModal
            onClose={onClose}
            initialScrollY={window.scrollY}
            initialQuery={initialQuery}
            navigator={navigator}
            transformItems={transformItems}
            hitComponent={Hit}
            resultsFooterComponent={resultsFooterComponent}
            transformSearchClient={transformSearchClient}
            {...props}
            searchParameters={searchParameters}
          />,
          searchContainer.current
        )}
    </>
  );
}

function SearchBar(): JSX.Element {
  const { algolia } = useThemeConfig();
  return <DocSearch {...algolia} />;
}

export default SearchBar;
