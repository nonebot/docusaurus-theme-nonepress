import React, { type ReactNode } from "react";

import Translate from "@docusaurus/Translate";
import {
  ErrorBoundaryError,
  ErrorBoundaryTryAgainButton,
} from "@docusaurus/theme-common";

import type { Props } from "@theme/Error";
import Heading from "@theme/Heading";

export default function ErrorPageContent({
  error,
  tryAgain,
}: Props): ReactNode {
  return (
    <main className="hero">
      <div className="hero-content">
        <div>
          <Heading as="h1" className="text-5xl font-bold">
            <Translate
              id="theme.ErrorPageContent.title"
              description="The title of the fallback page when the page crashed"
            >
              This page crashed.
            </Translate>
          </Heading>
          <div className="my-4">
            <ErrorBoundaryTryAgainButton
              onClick={tryAgain}
              className="btn btn-primary"
            />
          </div>
          <hr />
          <div>
            <ErrorBoundaryError error={error} />
          </div>
        </div>
      </div>
    </main>
  );
}
