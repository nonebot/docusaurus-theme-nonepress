import React from "react";

import Translate, { translate } from "@docusaurus/Translate";

import "./styles.css";

import type { Props } from "@theme/DocPaginator";
import PaginatorNavLink from "@theme/PaginatorNavLink";

export default function DocPaginator(props: Props): JSX.Element {
  const { previous, next } = props;
  return (
    <nav
      className="doc-paginator"
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
