import React from "react";

import { useCurrentSidebarCategory } from "@docusaurus/plugin-content-docs/client";
import { PageMetadata } from "@docusaurus/theme-common";
import useBaseUrl from "@docusaurus/useBaseUrl";

import DocBreadcrumbs from "@theme/DocBreadcrumbs";
import DocCardList from "@theme/DocCardList";
import type { Props } from "@theme/DocCategoryGeneratedIndexPage";
import DocPaginator from "@theme/DocPaginator";
import DocVersionBadge from "@theme/DocVersionBadge";
import DocVersionBanner from "@theme/DocVersionBanner";
import Heading from "@theme/Heading";

function DocCategoryGeneratedIndexPageMetadata({
  categoryGeneratedIndex,
}: Props): JSX.Element {
  return (
    <PageMetadata
      title={categoryGeneratedIndex.title}
      description={categoryGeneratedIndex.description}
      keywords={categoryGeneratedIndex.keywords}
      // TODO `require` this?
      image={useBaseUrl(categoryGeneratedIndex.image)}
    />
  );
}

function DocCategoryGeneratedIndexPageContent({
  categoryGeneratedIndex,
}: Props): JSX.Element {
  const category = useCurrentSidebarCategory();

  return (
    <div className="page-content page-content-narrow">
      <DocVersionBanner />

      <article className="prose max-w-full">
        <DocBreadcrumbs />
        <DocVersionBadge />
        <div className="prose max-w-none">
          <header>
            <Heading as="h1">{categoryGeneratedIndex.title}</Heading>
            {categoryGeneratedIndex.description && (
              <p>{categoryGeneratedIndex.description}</p>
            )}
          </header>
          <DocCardList items={category.items} />
        </div>
      </article>

      <DocPaginator
        previous={categoryGeneratedIndex.navigation.previous}
        next={categoryGeneratedIndex.navigation.next}
      />
    </div>
  );
}

export default function DocCategoryGeneratedIndexPage(
  props: Props,
): JSX.Element {
  return (
    <>
      <DocCategoryGeneratedIndexPageMetadata {...props} />
      <DocCategoryGeneratedIndexPageContent {...props} />
    </>
  );
}
