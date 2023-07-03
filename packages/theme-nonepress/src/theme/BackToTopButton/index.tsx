import React from "react";

import clsx from "clsx";

import "./styles.css";
import Translate, { translate } from "@docusaurus/Translate";
import { ThemeClassNames } from "@docusaurus/theme-common";
import { useBackToTopButton } from "@docusaurus/theme-common/internal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function BackToTopButton(): JSX.Element {
  const { shown, scrollToTop } = useBackToTopButton({ threshold: 300 });
  return (
    <button
      aria-label={translate({
        id: "theme.BackToTopButton.buttonAriaLabel",
        message: "Scroll back to top",
        description: "The ARIA label for the back to top button",
      })}
      className={clsx(
        "back-to-top",
        shown && "shown",
        ThemeClassNames.common.backToTopButton,
      )}
      type="button"
      onClick={scrollToTop}
    >
      <span className="sr-only">
        <Translate
          id="theme.BackToTopButton.buttonAlt"
          description="The alt message for the back to top button"
        >
          Back to top
        </Translate>
      </span>
      <FontAwesomeIcon
        className="h-6 w-6 fill-current"
        icon={["fas", "chevron-up"]}
      />
    </button>
  );
}
