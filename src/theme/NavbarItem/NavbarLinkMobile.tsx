import clsx from "clsx";
import React from "react";

import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import isInternalUrl from "@docusaurus/isInternalUrl";

import IconExternalLink from "@theme/IconExternalLink";
import type { Props } from "@theme/NavbarItem/NavbarLinkMobile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function NavbarLinkMobile(props: Props): JSX.Element {
  const { to, href, label, icon, prependBaseUrlToHref, className } = props;
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
        className={clsx(
          "block px-3 py-3 rounded-md hover:bg-indigo-50 dark:hover:bg-gray-900 dark:hover:opacity-100",
          !label ? "text-2xl" : "text-base font-medium uppercase"
        )}
      >
        {icon && <FontAwesomeIcon className="mr-2 align-middle" icon={icon} />}
        <span className="truncate">
          {label}
          {!icon && isExternalLink && <IconExternalLink />}
        </span>
      </Link>
    </li>
  );
}

export default NavbarLinkMobile;
