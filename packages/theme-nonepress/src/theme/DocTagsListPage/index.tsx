import React, { type ReactNode } from "react";

import clsx from "clsx";

import {
  HtmlClassNameProvider,
  PageMetadata,
  ThemeClassNames,
  translateTagsPageTitle,
} from "@docusaurus/theme-common";

import type { Props } from "@theme/DocTagsListPage";
import Heading from "@theme/Heading";
import SearchMetadata from "@theme/SearchMetadata";
import TagsListByLetter from "@theme/TagsListByLetter";

export default function DocTagsListPage({ tags }: Props): ReactNode {
  const title = translateTagsPageTitle();

  return (
    <HtmlClassNameProvider
      className={clsx(
        ThemeClassNames.wrapper.docsPages,
        ThemeClassNames.page.docsTagsListPage,
      )}
    >
      <PageMetadata title={title} />
      <SearchMetadata tag="doc_tags_list" />
      <div className="page">
        <main className="page-main">
          <div className={clsx("page-content", "page-content-narrow")}>
            <div className="prose max-w-none">
              <Heading as="h1">{title}</Heading>
              <TagsListByLetter tags={tags} />
            </div>
          </div>
        </main>
      </div>
    </HtmlClassNameProvider>
  );
}
