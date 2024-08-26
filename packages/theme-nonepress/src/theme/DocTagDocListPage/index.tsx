import React from "react";

import clsx from "clsx";

import Link from "@docusaurus/Link";
import Translate, { translate } from "@docusaurus/Translate";
import {
  HtmlClassNameProvider,
  PageMetadata,
  ThemeClassNames,
  usePluralForm,
} from "@docusaurus/theme-common";

import DocRootLayout from "@theme/DocRoot/Layout";
import type { Props } from "@theme/DocTagDocListPage";
import Heading from "@theme/Heading";
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
    <article>
      <Link to={doc.permalink}>
        <Heading as="h2">{doc.title}</Heading>
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
          <main>
            <div className="prose max-w-none">
              <header>
                <Heading as="h1">{title}</Heading>
                <Link href={tag.allTagsPath}>
                  <Translate
                    id="theme.tags.tagsPageLink"
                    description="The label of the link targeting the tag list page"
                  >
                    View All Tags
                  </Translate>
                </Link>
              </header>
              <section>
                {tag.items.map((doc) => (
                  <DocItem key={doc.id} doc={doc} />
                ))}
              </section>
            </div>
          </main>
      </Layout>
    </HtmlClassNameProvider>
  );
}
