import React from "react";

import clsx from "clsx";

import {
  DraftBannerMessage,
  DraftBannerTitle,
  ThemeClassNames,
} from "@docusaurus/theme-common";

import Admonition from "@theme/Admonition";
import type { Props } from "@theme/ContentVisibility/Draft";

export default function Draft({ className }: Props): React.ReactNode | null {
  return (
    <Admonition
      type="caution"
      title={<DraftBannerTitle />}
      className={clsx(className, ThemeClassNames.common.draftBanner)}
    >
      <DraftBannerMessage />
    </Admonition>
  );
}
