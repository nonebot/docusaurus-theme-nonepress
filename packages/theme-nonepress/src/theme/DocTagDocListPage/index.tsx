import React from "react";

import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import type { Props } from "@theme/DocTagDocListPage";
import { ThemeClassNames, usePluralForm } from "@docusaurus/theme-common";
import type { PropTagDocListDoc } from "@docusaurus/plugin-content-docs-types";

// Very simple pluralization: probably good enough for now
function useNDocsTaggedPlural() {
  const { selectMessage } = usePluralForm();
  return (count: number) =>
    selectMessage(count, `One doc tagged|${count} docs tagged`);
}

function DocItem({ doc }: { doc: PropTagDocListDoc }): JSX.Element {
  return (
    <article className="my-8">
      <Link to={doc.permalink}>
        <h2>{doc.title}</h2>
      </Link>
      {doc.description && <p>{doc.description}</p>}
    </article>
  );
}

function DocTagDocListPage({ tag }: Props): JSX.Element {
  const nDocsTaggedPlural = useNDocsTaggedPlural();
  const title = `${nDocsTaggedPlural(tag.docs.length)} with "${tag.name}"`;

  return (
    <Layout
      title={title}
      wrapperClassName={ThemeClassNames.wrapper.docsPages}
      pageClassName={ThemeClassNames.page.docsTagDocListPage}
      searchMetadata={{
        // assign unique search tag to exclude this page from search results!
        tag: "doc_tag_doc_list",
      }}
    >
      <div className="w-full">
        <main className="container mx-auto mt-20 pb-8 px-4 lg:px-12">
          <div className="p-4">
            <div className="prose dark:prose-dark">
              <header className="mb-12">
                <h1>{title}</h1>
                <Link to={tag.allTagsPath}>View All Tags</Link>
              </header>
              <section className="my-8">
                {tag.docs.map((doc) => (
                  <DocItem key={doc.id} doc={doc} />
                ))}
              </section>
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
}

export default DocTagDocListPage;
