import React from "react";

import clsx from "clsx";

import {
  PageMetadata,
  HtmlClassNameProvider,
  ThemeClassNames,
  translateTagsPageTitle,
} from "@docusaurus/theme-common";

import type { Props } from "@theme/DocTagsListPage";
import Layout from "@theme/Layout";
import Page from "@theme/Page";
import SearchMetadata from "@theme/SearchMetadata";
import TagsListByLetter from "@theme/TagsListByLetter";

export default function DocTagsListPage({ tags }: Props): JSX.Element {
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
      <Layout>
        <Page>
          <main>
            <div className="prose max-w-none">
              <h1>{title}</h1>
              <TagsListByLetter tags={tags} />
            </div>
          </main>
        </Page>
      </Layout>
    </HtmlClassNameProvider>
  );
}
