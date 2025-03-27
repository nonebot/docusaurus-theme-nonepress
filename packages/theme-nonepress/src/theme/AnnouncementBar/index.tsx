import React, { type ReactNode } from "react";

import { useAnnouncementBar } from "@docusaurus/theme-common/internal";

import { useNonepressThemeConfig } from "@nullbot/docusaurus-theme-nonepress/client";

import AnnouncementBarCloseButton from "@theme/AnnouncementBar/CloseButton";
import AnnouncementBarContent from "@theme/AnnouncementBar/Content";

import "./styles.css";

export default function AnnouncementBar(): ReactNode | null {
  const { announcementBar } = useNonepressThemeConfig();
  const { isActive, close } = useAnnouncementBar();
  if (!announcementBar || !isActive) {
    return null;
  }
  const { backgroundColor, textColor, isCloseable } = announcementBar;
  return (
    <div
      className="announcement"
      style={{ backgroundColor, color: textColor }}
      role="banner"
    >
      <AnnouncementBarContent />
      {isCloseable && <AnnouncementBarCloseButton onClick={close} />}
    </div>
  );
}
