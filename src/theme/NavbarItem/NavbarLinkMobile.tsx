import clsx from "clsx";
import React, { PropsWithChildren } from "react";

import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { NavbarLink } from "../../useThemeConfig";

export default function NavbarLinkMobile(
  props: PropsWithChildren<NavbarLink>
): JSX.Element {
  const { to, href, label, icon, prependBaseUrlToHref, className } = props;
  const toUrl = useBaseUrl(to);
  const normalizedHref = useBaseUrl(href, { forcePrependBaseUrl: true });

  return (
    <Link
      {...(href
        ? {
            href: prependBaseUrlToHref ? normalizedHref : href,
          }
        : {
            to: toUrl,
          })}
      className={clsx(
        "block px-3 py-4 rounded-md hover:bg-indigo-50 dark:hover:bg-gray-900 dark:hover:opacity-100",
        !label ? "text-2xl" : "text-base font-medium uppercase"
      )}
    >
      {icon && <i className={clsx(icon, "mr-2 align-middle")}></i>}
      <span className="truncate">{label}</span>
    </Link>
  );
}
