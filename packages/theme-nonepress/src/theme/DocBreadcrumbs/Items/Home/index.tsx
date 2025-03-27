import React, { type ReactNode } from "react";

import Link from "@docusaurus/Link";
import { translate } from "@docusaurus/Translate";
import useBaseUrl from "@docusaurus/useBaseUrl";

import IconHome from "@theme/Icon/Home";

export default function HomeBreadcrumbItem(): ReactNode {
  const homeHref = useBaseUrl("/");

  return (
    <li>
      <Link
        aria-label={translate({
          id: "theme.docs.breadcrumbs.home",
          message: "Home page",
          description: "The ARIA label for the home page in the breadcrumbs",
        })}
        className="btn btn-ghost btn-xs no-animation breadcrumbs-btn"
        href={homeHref}
      >
        <IconHome />
      </Link>
    </li>
  );
}
