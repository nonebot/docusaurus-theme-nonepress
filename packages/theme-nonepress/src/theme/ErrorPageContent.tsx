import React from "react";

import Translate from "@docusaurus/Translate";
import {
  ErrorBoundaryError,
  ErrorBoundaryTryAgainButton,
} from "@docusaurus/theme-common";

import type { Props } from "@theme/Error";

export default function ErrorPageContent({
  error,
  tryAgain,
}: Props): JSX.Element {
  return (
    <main className="container hero">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">
            <Translate
              id="theme.ErrorPageContent.title"
              description="The title of the fallback page when the page crashed"
            >
              This page crashed.
            </Translate>
          </h1>
          <div className="my-6">
            <ErrorBoundaryTryAgainButton
              onClick={tryAgain}
              className="btn btn-primary"
            />
          </div>
          <hr />
          <div className="my-4">
            <ErrorBoundaryError error={error} />
          </div>
        </div>
      </div>
    </main>
  );
}
