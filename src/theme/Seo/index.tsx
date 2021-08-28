import React from "react";

import Head from "@docusaurus/Head";
import { useBaseUrlUtils } from "@docusaurus/useBaseUrl";
import { useTitleFormatter } from "@docusaurus/theme-common";

import type { Props } from "@theme/Seo";

export default function Seo({
  title,
  description,
  keywords,
  image,
  children,
}: Props): JSX.Element {
  const pageTitle = useTitleFormatter(title);
  const { withBaseUrl } = useBaseUrlUtils();
  const pageImage = image ? withBaseUrl(image, { absolute: true }) : undefined;

  return (
    <Head>
      {title && <title>{pageTitle}</title>}
      {title && <meta property="og:title" content={pageTitle} />}

      {description && <meta name="description" content={description} />}
      {description && <meta property="og:description" content={description} />}

      {keywords && (
        <meta
          name="keywords"
          content={
            (Array.isArray(keywords) ? keywords.join(",") : keywords) as string
          }
        />
      )}

      {pageImage && <meta property="og:image" content={pageImage} />}
      {pageImage && <meta name="twitter:image" content={pageImage} />}

      {children}
    </Head>
  );
}
