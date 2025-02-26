import React, { useEffect } from "react";

import clsx from "clsx";

import { ThemeClassNames } from "@docusaurus/theme-common";
import { useHideableNavbar } from "@docusaurus/theme-common/internal";
import { useNonepressThemeConfig } from "@nullbot/docusaurus-theme-nonepress/client";
import {
  useTOCContent,
  useTOCDisplay,
} from "@nullbot/docusaurus-theme-nonepress/contexts";

import TOCContent from "@theme/Page/TOC/Content";

import "./styles.css";

export default function MobileTOCPopdown(): React.ReactNode | null {
  const {
    navbar: { hideOnScroll },
  } = useNonepressThemeConfig();
  const { isNavbarVisible } = useHideableNavbar(hideOnScroll);

  const { shown, setShown } = useTOCDisplay();
  const [tocContent] = useTOCContent();

  useEffect(() => {
    if (hideOnScroll && !isNavbarVisible) {
      // hide toc popdown when navbar is hidden
      setShown(false);
    }
  }, [hideOnScroll, isNavbarVisible, setShown]);

  if (
    !tocContent ||
    tocContent.hideTableOfContents ||
    tocContent.toc.length === 0
  ) {
    return null;
  }

  return (
    <div
      className={clsx(
        ThemeClassNames.docs.docTocMobile,
        "navbar-tocpopdown",
        shown && "navbar-tocpopdown-open",
      )}
    >
      <TOCContent {...tocContent} />
    </div>
  );
}
