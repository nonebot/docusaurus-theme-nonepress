import React, { type ReactNode } from "react";

import clsx from "clsx";

import { useNonepressThemeConfig } from "@nullbot/docusaurus-theme-nonepress/client";

import type { Props } from "@theme/AnnouncementBar/Content";

export default function AnnouncementBarContent(props: Props): ReactNode {
  const { announcementBar } = useNonepressThemeConfig();
  const { content } = announcementBar!;
  return (
    <div
      {...props}
      className={clsx(props.className, "announcement-content")}
      // Developer provided the HTML, so assume it's safe.
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
