import clsx from "clsx";
import React from "react";

import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import type { Props } from "@theme/NavbarItem/NavbarLinkMobile";

function NavbarLinkMobile(props: Props): JSX.Element {
  const { to, href, label, icon, prependBaseUrlToHref, className } = props;
  const toUrl = useBaseUrl(to);
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
        {icon && <i className={clsx(icon, "mr-2 align-middle")}></i>}
        <span className="truncate">{label}</span>
      </Link>
    </li>
  );
}

export default NavbarLinkMobile;
