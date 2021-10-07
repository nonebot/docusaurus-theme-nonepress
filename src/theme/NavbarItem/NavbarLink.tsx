import clsx from "clsx";
import React from "react";

import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import isInternalUrl from "@docusaurus/isInternalUrl";

import IconExternalLink from "@theme/IconExternalLink";
import type { Props } from "@theme/NavbarItem/NavbarLink";

function NavbarLink(props: Props): JSX.Element {
  const {
    to,
    href,
    label,
    icon,
    prependBaseUrlToHref,
    className,
    linkClassName,
  } = props;
  const toUrl = useBaseUrl(to);
  const isExternalLink = label && href && !isInternalUrl(href);
  const normalizedHref = useBaseUrl(href, { forcePrependBaseUrl: true });

  return (
    <li className={className}>
      <Link
        {...(href
          ? {
              href: prependBaseUrlToHref ? normalizedHref : href,
            }
          : {
              to: toUrl,
            })}
        className={
          linkClassName ||
          clsx(
            "self-center transition duration-300 opacity-60 hover:opacity-100",
            !label ? "text-3xl" : "text-sm font-medium uppercase"
          )
        }
      >
        {icon && <i className={clsx(icon, "mr-2 align-middle")}></i>}
        <span className="truncate">
          {label}
          {!icon && isExternalLink && <IconExternalLink />}
        </span>
      </Link>
    </li>
  );
}

export default NavbarLink;
