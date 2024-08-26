import React from "react";

import clsx from "clsx";

import {
  HtmlClassNameProvider,
  PageMetadata,
  ThemeClassNames,
  translateTagsPageTitle,
} from "@docusaurus/theme-common";

import type { Props } from "@theme/DocTagsListPage";
import Heading from "@theme/Heading";
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
        <main>
          <div className="prose max-w-none">
            <Heading as="h1">{title}</Heading>
            <TagsListByLetter tags={tags} />
          </div>
        </main>
      </Layout>
    </HtmlClassNameProvider>
  );
}
