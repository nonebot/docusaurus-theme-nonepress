import React, { type ReactNode } from "react";

import clsx from "clsx";

import Translate, { translate } from "@docusaurus/Translate";

import type { Props } from "@theme/DocPaginator";
import PaginatorNavLink from "@theme/PaginatorNavLink";

import "./styles.css";

export default function DocPaginator(props: Props): ReactNode {
  const { previous, next, className } = props;
  return (
    <nav
      className={clsx("doc-paginator", className)}
      aria-label={translate({
        id: "theme.docs.paginator.navAriaLabel",
        message: "Docs pages",
        description: "The ARIA label for the docs pagination",
      })}
    >
      <div>
        {previous && (
          <PaginatorNavLink
            {...previous}
            subLabel={
              <Translate
                id="theme.docs.paginator.previous"
                description="The label used to navigate to the previous doc"
              >
                Previous
              </Translate>
            }
          />
        )}
      </div>
      <div>
        {next && (
          <PaginatorNavLink
            {...next}
            subLabel={
              <Translate
                id="theme.docs.paginator.next"
                description="The label used to navigate to the next doc"
              >
                Next
              </Translate>
            }
            isNext
          />
        )}
      </div>
    </nav>
  );
}
