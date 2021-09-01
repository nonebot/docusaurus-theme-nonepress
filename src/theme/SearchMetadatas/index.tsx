import React from "react";

import Head from "@docusaurus/Head";
import type { Props } from "@theme/SearchMetadatas";

// Override default/agnostic SearchMetas to use Algolia-specific metadatas
function AlgoliaSearchMetadatas(props: Props): JSX.Element {
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

export default AlgoliaSearchMetadatas;
