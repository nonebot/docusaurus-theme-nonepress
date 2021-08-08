import React, { PropsWithChildren } from "react";

import Head from "@docusaurus/Head";

// Override default/agnostic SearchMetas to use Algolia-specific metadatas
export default function AlgoliaSearchMetadatas(
  props: PropsWithChildren<{ locale: string; version: string; tag: string }>
) {
  const { locale, version, tag } = props;
  // Seems safe to consider here the locale is the language,
  // as the existing docsearch:language filter is afaik a regular string-based filter
  const language = locale;

  return (
    <Head>
      {language && <meta name="docsearch:language" content={language} />}
      {version && <meta name="docsearch:version" content={version} />}
      {tag && <meta name="docsearch:docusaurus_tag" content={tag} />}
    </Head>
  );
}
