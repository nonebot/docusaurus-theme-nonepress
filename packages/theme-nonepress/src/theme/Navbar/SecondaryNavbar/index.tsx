import React from "react";

import Translate from "@docusaurus/Translate";
import { useNavbarSecondaryMenu } from "@docusaurus/theme-common/internal";

import { useTOC } from "@theme/Layout/Provider/TOCProvider";

export default function SecondaryNavbar(): JSX.Element | null {
  const secondaryMenu = useNavbarSecondaryMenu();
  const { toc } = useTOC();

  if (!secondaryMenu.content && !toc) {
    return null;
  }

  return (
    <div className="navbar-secondary-layout">
      <div className="navbar-secondary-content">
        {secondaryMenu.content && (
          <button className="navbar-secondary-menu">
            <Translate
              id="theme.navbar.menuButton"
              description="The button text for toggle mobile sidebar menu"
            >
              Menu
            </Translate>
          </button>
        )}
        {toc && (
          <button className="navbar-secondary-toc">
            <Translate
              id="theme.navbar.tocButton"
              description="The button text for toggle mobile toc popdown"
            >
              On This Page
            </Translate>
          </button>
        )}
      </div>
    </div>
  );
}
