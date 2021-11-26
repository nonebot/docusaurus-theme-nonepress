import React from "react";

import Layout from "@theme/Layout";
import type { Props } from "@theme/DocTagsListPage";
import TagsListByLetter from "@theme/TagsListByLetter";
import {
  ThemeClassNames,
  translateTagsPageTitle,
} from "@docusaurus/theme-common";

function DocTagsListPage({ tags }: Props): JSX.Element {
  const title = translateTagsPageTitle();
  return (
    <Layout
      title={title}
      wrapperClassName={ThemeClassNames.wrapper.docsPages}
      pageClassName={ThemeClassNames.page.docsTagsListPage}
      searchMetadata={{
        // assign unique search tag to exclude this page from search results!
        tag: "doc_tags_list",
      }}
    >
      <div className="w-full">
        <main className="container mx-auto mt-20 pb-8 px-4 lg:px-12">
          <div className="p-4">
            <div className="prose lg:prose-xl dark:prose-dark max-w-none">
              <h1>{title}</h1>
              <TagsListByLetter tags={tags} />
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
}

export default DocTagsListPage;
