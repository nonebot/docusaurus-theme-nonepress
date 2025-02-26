import React from "react";

import clsx from "clsx";

import Translate from "@docusaurus/Translate";

import Heading from "@theme/Heading";
import type { Props } from "@theme/NotFound/Content";

export default function NotFoundContent({ className }: Props): React.ReactNode {
  return (
    <div className={clsx("page", className)}>
      <main className="hero">
        <div className="hero-content">
          <div>
            <Heading as="h1" className="text-5xl font-bold">
              <Translate
                id="theme.NotFound.title"
                description="The title of the 404 page"
              >
                Page Not Found
              </Translate>
            </Heading>
            <p className="my-4">
              <Translate
                id="theme.NotFound.p1"
                description="The first paragraph of the 404 page"
              >
                We could not find what you were looking for.
              </Translate>
            </p>
            <p>
              <Translate
                id="theme.NotFound.p2"
                description="The 2nd paragraph of the 404 page"
              >
                Please contact the owner of the site that linked you to the
                original URL and let them know their link is broken.
              </Translate>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
