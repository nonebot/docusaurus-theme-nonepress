import React from "react";

import clsx from "clsx";

import Link from "@docusaurus/Link";
import Translate, { translate } from "@docusaurus/Translate";
import {
  PageMetadata,
  HtmlClassNameProvider,
  ThemeClassNames,
  usePluralForm,
} from "@docusaurus/theme-common";

import type { Props } from "@theme/DocTagDocListPage";
import Layout from "@theme/Layout";
import SearchMetadata from "@theme/SearchMetadata";

// Very simple pluralization: probably good enough for now
function useNDocsTaggedPlural() {
  const { selectMessage } = usePluralForm();
  return (count: number) =>
    selectMessage(
      count,
      translate(
        {
          id: "theme.docs.tagDocListPageTitle.nDocsTagged",
          description:
            'Pluralized label for "{count} docs tagged". Use as much plural forms (separated by "|") as your language support (see https://www.unicode.org/cldr/cldr-aux/charts/34/supplemental/language_plural_rules.html)',
          message: "One doc tagged|{count} docs tagged",
        },
        { count },
      ),
    );
}

function DocItem({ doc }: { doc: Props["tag"]["items"][number] }): JSX.Element {
  return (
    <article className="my-8">
      <Link to={doc.permalink}>
        <h2>{doc.title}</h2>
      </Link>
      {doc.description && <p>{doc.description}</p>}
    </article>
  );
}

export default function DocTagDocListPage({ tag }: Props): JSX.Element {
  const nDocsTaggedPlural = useNDocsTaggedPlural();
  const title = translate(
    {
      id: "theme.docs.tagDocListPageTitle",
      description: "The title of the page for a docs tag",
      message: '{nDocsTagged} with "{tagName}"',
    },
    { nDocsTagged: nDocsTaggedPlural(tag.count), tagName: tag.label },
  );

  return (
    <HtmlClassNameProvider
      className={clsx(
        ThemeClassNames.wrapper.docsPages,
        ThemeClassNames.page.docsTagDocListPage,
      )}
    >
      <PageMetadata title={title} />
      <SearchMetadata tag="doc_tag_doc_list" />
      <Layout>
        <div className="w-full">
          <main className="container mx-auto mt-20 pb-8 px-4 lg:px-12">
            <div className="p-4 prose">
              <header className="mb-12">
                <h1>{title}</h1>
                <Link href={tag.allTagsPath}>
                  <Translate
                    id="theme.tags.tagsPageLink"
                    description="The label of the link targeting the tag list page"
                  >
                    View All Tags
                  </Translate>
                </Link>
              </header>
              <section className="my-8">
                {tag.items.map((doc) => (
                  <DocItem key={doc.id} doc={doc} />
                ))}
              </section>
            </div>
          </main>
        </div>
      </Layout>
    </HtmlClassNameProvider>
  );
}
