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
    <main className="container mx-auto my-8 hero">
      <div className="hero-content">
        <h1 className="text-5xl font-bold">
          <Translate
            id="theme.ErrorPageContent.title"
            description="The title of the fallback page when the page crashed"
          >
            This page crashed.
          </Translate>
        </h1>
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
    </main>
  );
}
