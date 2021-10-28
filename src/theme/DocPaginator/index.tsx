import React from "react";

import Link from "@docusaurus/Link";
import type { Props } from "@theme/DocPaginator";

function DocPaginator(props: Props): JSX.Element {
  const { metadata } = props;

  return (
    <nav className="flex mt-12" aria-label="Docs pages navigation">
      <div className="flex flex-1 max-w-50">
        {metadata.previous && (
          <Link
            className="border border-gray-300 dark:border-gray-500 rounded-lg flex-grow leading-tight p-4 transition transform hover:border-light-text-active dark:hover:border-dark-text-active"
            to={metadata.previous.permalink}
          >
            <div className="text-light-text dark:text-dark-text text-sm font-medium mb-1">
              Previous
            </div>
            <div className="text-base font-bold break-words">
              &laquo; {metadata.previous.title}
            </div>
          </Link>
        )}
      </div>
      <div className="flex flex-1 ml-4 max-w-50 text-right">
        {metadata.next && (
          <Link
            className="border border-gray-300 dark:border-gray-500 rounded-lg flex-grow leading-tight p-4 transition transform hover:border-light-text-active dark:hover:border-dark-text-active"
            to={metadata.next.permalink}
          >
            <div className="text-light-text dark:text-dark-text text-sm font-medium mb-1">
              Next
            </div>
            <div className="text-base font-bold break-words">
              {metadata.next.title} &raquo;
            </div>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default DocPaginator;
