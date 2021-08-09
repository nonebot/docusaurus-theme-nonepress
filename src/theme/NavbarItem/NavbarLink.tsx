import clsx from "clsx";
import React, { PropsWithChildren } from "react";

import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { NavbarLink as NavLink } from "../../useThemeConfig";

export default function NavbarLink(
  props: PropsWithChildren<NavLink>
): JSX.Element {
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
          "self-center transition duration-300 opacity-60 hover:opacity-100",
          icon ? "text-3xl" : "text-sm font-medium uppercase"
        )}
      >
        {icon ? <i className={icon}></i> : label}
      </Link>
    </li>
  );
}
