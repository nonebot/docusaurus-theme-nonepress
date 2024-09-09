import React from "react";

import clsx from "clsx";

import Translate from "@docusaurus/Translate";
import { ThemeClassNames } from "@docusaurus/theme-common";

import "./styles.css";

import type { Props } from "@theme/LastUpdated";

function LastUpdatedAtDate({
  lastUpdatedAt,
  formattedLastUpdatedAt,
}: {
  lastUpdatedAt: number;
  formattedLastUpdatedAt: string;
}): JSX.Element {
  return (
    <Translate
      id="theme.lastUpdated.atDate"
      description="The words used to describe on which date a page has been last updated"
      values={{
        date: (
          <b>
            <time dateTime={new Date(lastUpdatedAt * 1000).toISOString()}>
              {formattedLastUpdatedAt}
            </time>
          </b>
        ),
      }}
    >
      {" on {date}"}
    </Translate>
  );
}

function LastUpdatedByUser({
  lastUpdatedBy,
}: {
  lastUpdatedBy: string;
}): JSX.Element {
  return (
    <Translate
      id="theme.lastUpdated.byUser"
      description="The words used to describe by who the page has been last updated"
      values={{
        user: <b>{lastUpdatedBy}</b>,
      }}
    >
      {" by {user}"}
    </Translate>
  );
}

export default function LastUpdated({
  lastUpdatedAt,
  formattedLastUpdatedAt,
  lastUpdatedBy,
}: Props): JSX.Element {
  return (
    <span className={clsx(ThemeClassNames.common.lastUpdated, "last-updated")}>
      <Translate
        id="theme.lastUpdated.lastUpdatedAtBy"
        description="The sentence used to display when a page has been last updated, and by who"
        values={{
          atDate:
            lastUpdatedAt && formattedLastUpdatedAt ? (
              <LastUpdatedAtDate
                lastUpdatedAt={lastUpdatedAt}
                formattedLastUpdatedAt={formattedLastUpdatedAt}
              />
            ) : (
              ""
            ),
          byUser: lastUpdatedBy ? (
            <LastUpdatedByUser lastUpdatedBy={lastUpdatedBy} />
          ) : (
            ""
          ),
        }}
      >
        {"Last updated{atDate}{byUser}"}
      </Translate>
      {process.env.NODE_ENV === "development" && (
        <div>
          <small> (Simulated during dev for better perf)</small>
        </div>
      )}
    </span>
  );
}
