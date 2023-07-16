import React from "react";

import "./styles.css";
import clsx from "clsx";

import Translate from "@docusaurus/Translate";

import {
  useTOCContent,
  useSidebarContent,
  useTOCDisplay,
  useSidebarDisplay,
} from "@nullbot/docusaurus-theme-nonepress/contexts";
import IconDropdown from "@theme/Icon/Dropdown";
import IconSidebar from "@theme/Icon/Sidebar";

export default function SecondaryNavbar(): JSX.Element | null {
  const { shown: tocShown, setShown: setTOCShown } = useTOCDisplay();
  const { shown: sidebarShown, setShown: setSidebarShown } =
    useSidebarDisplay();
  const [sidebarContent] = useSidebarContent();
  const [{ toc }] = useTOCContent();

  // If there is no secondary menu and no TOC, don't show the secondary navbar
  if (
    !(sidebarContent && sidebarContent.length !== 0) &&
    !(toc && toc.length !== 0)
  ) {
    return null;
  }

  return (
    <div className="navbar-secondary-layout">
      <div className="navbar-secondary-content">
        {sidebarContent && sidebarContent.length !== 0 && (
          <button
            className="navbar-secondary-menu"
            onClick={() => setSidebarShown(!sidebarShown)}
          >
            <IconSidebar className="navbar-secondary-icon" />
            <Translate
              id="theme.navbar.menuButton"
              description="The button text for toggle mobile sidebar menu"
            >
              Menu
            </Translate>
          </button>
        )}
        {toc && toc.length !== 0 && (
          <button
            className="navbar-secondary-toc"
            onClick={() => setTOCShown(!tocShown)}
          >
            <Translate
              id="theme.navbar.tocButton"
              description="The button text for toggle mobile toc popdown"
            >
              On This Page
            </Translate>
            <IconDropdown
              className={clsx(
                "navbar-secondary-icon",
                !tocShown && "navbar-secondary-icon-close",
              )}
            />
          </button>
        )}
      </div>
    </div>
  );
}
