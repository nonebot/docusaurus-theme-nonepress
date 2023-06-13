import React from "react";

import Link from "@docusaurus/Link";
import isInternalUrl from "@docusaurus/isInternalUrl";
import useBaseUrl from "@docusaurus/useBaseUrl";

import type { Props } from "@theme/Footer/LinkItem";
import IconExternalLink from "@theme/Icon/ExternalLink";

export default function FooterLinkItem({ item }: Props): JSX.Element {
  const { to, href, label, prependBaseUrlToHref, ...props } = item;
  const toUrl = useBaseUrl(to);
  const normalizedHref = useBaseUrl(href, { forcePrependBaseUrl: true });

  return (
    <Link
      className="opacity-80 hover:opacity-100 transition-opacity"
      {...(href
        ? {
            href: prependBaseUrlToHref ? normalizedHref : href,
          }
        : {
            to: toUrl,
          })}
      {...props}
    >
      {label}
      {href && !isInternalUrl(href) && (
        <IconExternalLink className="ml-2 w-4 h-4 fill-current" />
      )}
    </Link>
  );
}
