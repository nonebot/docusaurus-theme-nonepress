import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import type { AutocompleteState } from "@algolia/autocomplete-core";
import { useDocSearchKeyboardEvents } from "@docsearch/react";
import type {
  DocSearchModal as DocSearchModalType,
  DocSearchModalProps,
  DocSearchButtonProps,
} from "@docsearch/react";
import type {
  InternalDocSearchHit,
  StoredDocSearchHit,
} from "@docsearch/react/dist/esm/types";
import Head from "@docusaurus/Head";
import Link from "@docusaurus/Link";
import Noop from "@docusaurus/Noop";
import Translate from "@docusaurus/Translate";
import { useHistory } from "@docusaurus/router";
import {
  isRegexpStringMatch,
  useSearchLinkCreator,
} from "@docusaurus/theme-common";
import {
  useAlgoliaContextualFacetFilters,
  useSearchResultUrlProcessor,
} from "@docusaurus/theme-search-algolia/client";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import type { SearchClient } from "algoliasearch/lite";
import { createPortal } from "react-dom";

import "./styles.css";
import { useNonepressThemeConfig } from "@nullbot/docusaurus-theme-nonepress/client";
import IconSearch from "@theme/Icon/Search";
import translations from "@theme/SearchTranslations";

type DocSearchProps = Omit<
  DocSearchModalProps,
  "onClose" | "initialScrollY"
> & {
  contextualSearch?: string;
  externalUrlRegex?: string;
  searchPagePath: boolean | string;
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
  const createSearchLink = useSearchLinkCreator();

  return (
    <Link to={createSearchLink(state.query)} onClick={onClose}>
      <Translate
        id="theme.SearchBar.seeAll"
        values={{ count: state.context.nbHits }}
      >
        {"See all {count} results"}
      </Translate>
    </Link>
  );
}

type FacetFilters = Required<
  Required<DocSearchProps>["searchParameters"]
>["facetFilters"];

function mergeFacetFilters(f1: FacetFilters, f2: FacetFilters): FacetFilters {
  const normalize = (
    f: FacetFilters,
  ): readonly string[] | readonly (string | readonly string[])[] =>
    typeof f === "string" ? [f] : f;
  return [...normalize(f1), ...normalize(f2)] as FacetFilters;
}

const ACTION_KEY_DEFAULT = "Ctrl" as const;
const ACTION_KEY_APPLE = "⌘" as const;

function isAppleDevice(): boolean {
  return /Mac|iPhone|iPod|iPad/i.test(navigator.platform);
}

const DocSearchButton = React.forwardRef<
  HTMLButtonElement,
  DocSearchButtonProps
>(function DocSearchButton({ translations = {}, ...props }, ref) {
  const { buttonText = "Search", buttonAriaLabel = "Search" } = translations;

  const [key, setKey] = useState<
    typeof ACTION_KEY_APPLE | typeof ACTION_KEY_DEFAULT | null
  >(null);

  useEffect(() => {
    if (typeof navigator !== "undefined") {
      isAppleDevice() ? setKey(ACTION_KEY_APPLE) : setKey(ACTION_KEY_DEFAULT);
    }
  }, []);

  return (
    <button
      type="button"
      className="doc-search-btn"
      aria-label={buttonAriaLabel}
      {...props}
      ref={ref}
    >
      <span className="doc-search-btn-container">
        <IconSearch className="doc-search-btn-icon" />
        <span className="doc-search-btn-placeholder">{buttonText}</span>
      </span>

      <span className="doc-search-btn-keys">
        {key !== null && (
          <>
            <kbd className="kbd kbd-sm">{key}</kbd>
            <kbd className="kbd kbd-sm">K</kbd>
          </>
        )}
      </span>
    </button>
  );
});

function DocSearch({
  contextualSearch,
  externalUrlRegex,
  ...props
}: DocSearchProps) {
  const { siteMetadata } = useDocusaurusContext();
  const processSearchResultUrl = useSearchResultUrlProcessor();

  const contextualSearchFacetFilters =
    useAlgoliaContextualFacetFilters() as FacetFilters;

  const configFacetFilters: FacetFilters =
    props.searchParameters?.facetFilters ?? [];

  const facetFilters: FacetFilters = contextualSearch
    ? // Merge contextual search filters with config filters
      mergeFacetFilters(contextualSearchFacetFilters, configFacetFilters)
    : // ... or use config facetFilters
      configFacetFilters;

  // We let user override default searchParameters if she wants to
  const searchParameters: DocSearchProps["searchParameters"] = {
    ...props.searchParameters,
    facetFilters,
  };

  const history = useHistory();
  const searchContainer = useRef<HTMLDivElement | null>(null);
  const searchButtonRef = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [initialQuery, setInitialQuery] = useState<string | undefined>(
    undefined,
  );

  const importDocSearchModalIfNeeded = useCallback(() => {
    if (DocSearchModal) {
      return Promise.resolve();
    }

    return Promise.all([
      import("@docsearch/react/dist/esm/DocSearchModal.js"),
      import("@docsearch/css/dist/_variables.css"),
      import("@docsearch/css/dist/modal.css"),
    ]).then(([{ DocSearchModal: Modal }]) => {
      DocSearchModal = Modal;
    });
  }, []);

  const onOpen = useCallback(() => {
    importDocSearchModalIfNeeded().then(() => {
      searchContainer.current = document.createElement("div");
      document.body.insertBefore(
        searchContainer.current,
        document.body.firstChild,
      );
      setIsOpen(true);
    });
  }, [importDocSearchModalIfNeeded, setIsOpen]);

  const onClose = useCallback(() => {
    setIsOpen(false);
    searchContainer.current?.remove();
  }, [setIsOpen]);

  const onInput = useCallback(
    (event: KeyboardEvent) => {
      importDocSearchModalIfNeeded().then(() => {
        setIsOpen(true);
        setInitialQuery(event.key);
      });
    },
    [importDocSearchModalIfNeeded, setIsOpen, setInitialQuery],
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
      props.transformItems
        ? // Custom transformItems
          props.transformItems(items)
        : // Default transformItems
          items.map((item) => ({
            ...item,
            url: processSearchResultUrl(item.url),
          })),
  ).current;

  const resultsFooterComponent: DocSearchProps["resultsFooterComponent"] =
    useMemo(
      () =>
        // eslint-disable-next-line react/display-name
        (footerProps: Omit<ResultsFooterProps, "onClose">): JSX.Element =>
          <ResultsFooter {...footerProps} onClose={onClose} />,
      [onClose],
    );

  const transformSearchClient = useCallback(
    (searchClient: SearchClient) => {
      searchClient.addAlgoliaAgent(
        "docusaurus",
        siteMetadata.docusaurusVersion,
      );

      return searchClient;
    },
    [siteMetadata.docusaurusVersion],
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

      <DocSearchButton
        onTouchStart={importDocSearchModalIfNeeded}
        onFocus={importDocSearchModalIfNeeded}
        onMouseOver={importDocSearchModalIfNeeded}
        onClick={onOpen}
        ref={searchButtonRef}
        translations={translations.button}
      />

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
            transformSearchClient={transformSearchClient}
            {...(props.searchPagePath && {
              resultsFooterComponent,
            })}
            {...props}
            searchParameters={searchParameters}
            placeholder={translations.placeholder}
            translations={translations.modal}
          />,
          searchContainer.current,
        )}
    </>
  );
}

export default function SearchBar(): JSX.Element {
  const { algolia } = useNonepressThemeConfig();
  if (!algolia) {
    return <Noop />;
  }
  return <DocSearch {...(algolia as unknown as DocSearchProps)} />;
}
