import React from "react";

import clsx from "clsx";

import { useLocation } from "@docusaurus/router";
import { useDocsVersionCandidates } from "@docusaurus/plugin-content-docs/client";
import { useVersionedSidebar } from "@nullbot/docusaurus-plugin-getsidebar/client";
import {
  useNonepressThemeConfig,
  useWindowSize,
} from "@nullbot/docusaurus-theme-nonepress/client";

import Logo from "@theme/Logo";
import type { Props } from "@theme/Page/Sidebar";
import SidebarContent from "@theme/Page/Sidebar/Content";

import "./styles.css";

export default function Sidebar({
  className,
  sidebarId = "",
}: Props): JSX.Element | null {
  const { pathname } = useLocation();
  const windowSize = useWindowSize();
  const isMobile = windowSize === "mobile";

  const {
    navbar: { hideOnScroll },
  } = useNonepressThemeConfig();

  const docsVersionCandidate = useDocsVersionCandidates();
  const sidebarContent = useVersionedSidebar(
    docsVersionCandidate[0].name,
    sidebarId,
  );

  if (isMobile || !sidebarContent || sidebarContent.length === 0) {
    return null;
  }

  return (
    <div className={clsx("sidebar", className)}>
      {hideOnScroll && (
        <Logo
          className="sidebar-brand"
          imageClassName="sidebar-brand-logo"
          titleClassName="sidebar-brand-title"
        />
      )}
      <div className="sidebar-content thin-scrollbar">
        <SidebarContent items={sidebarContent} path={pathname} />
        <div className="sidebar-curtain" />
      </div>
    </div>
  );
}