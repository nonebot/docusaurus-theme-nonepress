import React from "react";

import clsx from "clsx";

import {
  ThemeClassNames,
  UnlistedBannerMessage,
  UnlistedBannerTitle,
  UnlistedMetadata,
} from "@docusaurus/theme-common";

import Admonition from "@theme/Admonition";
import type { Props } from "@theme/ContentVisibility/Unlisted";

function UnlistedBanner({ className }: Props) {
  return (
    <Admonition
      type="caution"
      title={<UnlistedBannerTitle />}
      className={clsx(className, ThemeClassNames.common.unlistedBanner)}
    >
      <UnlistedBannerMessage />
    </Admonition>
  );
}

export default function Unlisted(props: Props): React.ReactNode | null {
  return (
    <>
      {/*
      Unlisted metadata declared here for simplicity.
      Ensures we never forget to add the correct noindex metadata.
      Also gives a central place for user to swizzle override default metadata.
      */}
      <UnlistedMetadata />
      <UnlistedBanner {...props} />
    </>
  );
}
