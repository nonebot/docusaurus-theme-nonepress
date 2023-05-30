import React from "react";

import clsx from "clsx";

import "./styles.css";
import { translate } from "@docusaurus/Translate";
import useIsBrowser from "@docusaurus/useIsBrowser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import type { Props } from "@theme/ColorModeToggle";

function ColorModeToggle({ className, value, onChange }: Props): JSX.Element {
  const isBrowser = useIsBrowser();

  const title = translate(
    {
      message: "Switch between dark and light mode (currently {mode})",
      id: "theme.colorToggle.ariaLabel",
      description: "The ARIA label for the navbar color mode toggle",
    },
    {
      mode:
        value === "dark"
          ? translate({
              message: "dark mode",
              id: "theme.colorToggle.ariaLabel.mode.dark",
              description: "The name for the dark color mode",
            })
          : translate({
              message: "light mode",
              id: "theme.colorToggle.ariaLabel.mode.light",
              description: "The name for the light color mode",
            }),
    },
  );

  return (
    <button
      className={clsx(
        "apperence-toggle swap swap-rotate",
        value === "dark" && "apperence-toggle-active",
        className,
      )}
      type="button"
      onClick={() => onChange(value === "dark" ? "light" : "dark")}
      disabled={!isBrowser}
      title={title}
      aria-label={title}
      aria-live="polite"
    >
      <FontAwesomeIcon
        className="apperence-toggle-icon swap-off"
        icon={["fas", "sun"]}
      />
      <FontAwesomeIcon
        className="apprencen-toggle-icon swap-on"
        icon={["fas", "moon"]}
      />
    </button>
  );
}

export default React.memo(ColorModeToggle);
