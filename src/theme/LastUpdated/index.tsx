import React from "react";

import type { Props } from "@theme/LastUpdated";
import { ThemeClassNames } from "@docusaurus/theme-common";

function LastUpdatedAtDate({
  lastUpdatedAt,
  formattedLastUpdatedAt,
}: {
  lastUpdatedAt: number;
  formattedLastUpdatedAt: string;
}): JSX.Element {
  return (
    <>
      {" "}
      on{" "}
      {
        <b>
          <time dateTime={new Date(lastUpdatedAt * 1000).toISOString()}>
            {formattedLastUpdatedAt}
          </time>
        </b>
      }
    </>
  );
}

function LastUpdatedByUser({
  lastUpdatedBy,
}: {
  lastUpdatedBy: string;
}): JSX.Element {
  return <> by {<b>{lastUpdatedBy}</b>}</>;
}

export default function LastUpdated({
  lastUpdatedAt,
  formattedLastUpdatedAt,
  lastUpdatedBy,
}: Props): JSX.Element {
  return (
    <span className={ThemeClassNames.common.lastUpdated}>
      Last updated
      {lastUpdatedAt && formattedLastUpdatedAt && (
        <LastUpdatedAtDate
          lastUpdatedAt={lastUpdatedAt}
          formattedLastUpdatedAt={formattedLastUpdatedAt}
        />
      )}
      {lastUpdatedBy && <LastUpdatedByUser lastUpdatedBy={lastUpdatedBy} />}
      {process.env.NODE_ENV === "development" && (
        <div>
          <small> (Simulated during dev for better perf)</small>
        </div>
      )}
    </span>
  );
}
