import clsx from "clsx";
import React, { ComponentType } from "react";

import Link from "@docusaurus/Link";
import type { Props } from "@theme/DocVersionBanner";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import type { VersionBanner } from "@docusaurus/plugin-content-docs-types";
import {
  useActivePlugin,
  useDocVersionSuggestions,
  GlobalVersion,
} from "@theme/hooks/useDocs";
import {
  ThemeClassNames,
  useDocsPreferredVersion,
} from "@docusaurus/theme-common";

type BannerLabelComponentProps = {
  siteTitle: string;
  versionMetadata: Props["versionMetadata"];
};

function UnreleasedVersionLabel({
  siteTitle,
  versionMetadata,
}: BannerLabelComponentProps): JSX.Element {
  return (
    <>
      This is unreleased documentation for {siteTitle}{" "}
      <b>{versionMetadata.label}</b> version.
    </>
  );
}

function UnmaintainedVersionLabel({
  siteTitle,
  versionMetadata,
}: BannerLabelComponentProps) {
  return (
    <>
      This is documentation for {siteTitle} <b>{versionMetadata.label}</b>,
      which is no longer actively maintained.
    </>
  );
}

const BannerLabelComponents: Record<
  VersionBanner,
  ComponentType<BannerLabelComponentProps>
> = {
  unreleased: UnreleasedVersionLabel,
  unmaintained: UnmaintainedVersionLabel,
};

function BannerLabel(props: BannerLabelComponentProps) {
  const BannerLabelComponent =
    BannerLabelComponents[props.versionMetadata.banner!];
  return <BannerLabelComponent {...props} />;
}

function LatestVersionSuggestionLabel({
  versionLabel,
  to,
  onClick,
}: {
  to: string;
  onClick: () => void;
  versionLabel: string;
}) {
  return (
    <>
      For up-to-date documentation, see the{" "}
      <b>
        <Link to={to} onClick={onClick}>
          latest version
        </Link>
      </b>{" "}
      ({versionLabel}).
    </>
  );
}

function DocVersionBannerEnabled({ versionMetadata }: Props): JSX.Element {
  const {
    siteConfig: { title: siteTitle },
  } = useDocusaurusContext();
  const { pluginId } = useActivePlugin({ failfast: true })!;

  const getVersionMainDoc = (version: GlobalVersion) =>
    version.docs.find((doc) => doc.id === version.mainDocId)!;

  const { savePreferredVersionName } = useDocsPreferredVersion(pluginId);

  const { latestDocSuggestion, latestVersionSuggestion } =
    useDocVersionSuggestions(pluginId);

  // try to link to same doc in latest version (not always possible)
  // fallback to main doc of latest version
  const latestVersionSuggestedDoc =
    latestDocSuggestion ?? getVersionMainDoc(latestVersionSuggestion);

  return (
    <div
      className={clsx(
        ThemeClassNames.docs.docVersionBanner,
        "admonition admonition-warning"
      )}
      role="alert"
    >
      <div>
        <BannerLabel siteTitle={siteTitle} versionMetadata={versionMetadata} />
      </div>
      <div className="mt-4">
        <LatestVersionSuggestionLabel
          versionLabel={latestVersionSuggestion.label}
          to={latestVersionSuggestedDoc.path}
          onClick={() => savePreferredVersionName(latestVersionSuggestion.name)}
        />
      </div>
    </div>
  );
}

function DocVersionBanner({ versionMetadata }: Props): JSX.Element {
  if (versionMetadata.banner) {
    return <DocVersionBannerEnabled versionMetadata={versionMetadata} />;
  }
  return <></>;
}

export default DocVersionBanner;
