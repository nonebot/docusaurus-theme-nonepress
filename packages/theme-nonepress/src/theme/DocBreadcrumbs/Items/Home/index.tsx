import React from "react";

import Link from "@docusaurus/Link";
import { translate } from "@docusaurus/Translate";
import useBaseUrl from "@docusaurus/useBaseUrl";

import IconHome from "@theme/Icon/Home";

export default function HomeBreadcrumbItem(): JSX.Element {
  const homeHref = useBaseUrl("/");

  return (
    <li>
      <Link
        aria-label={translate({
          id: "theme.docs.breadcrumbs.home",
          message: "Home page",
          description: "The ARIA label for the home page in the breadcrumbs",
        })}
        className="breadcrumbs-btn"
        href={homeHref}
      >
        <IconHome className="" />
      </Link>
    </li>
  );
}
