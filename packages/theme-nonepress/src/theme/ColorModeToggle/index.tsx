import React from "react";

import clsx from "clsx";

import "./styles.css";
import { translate } from "@docusaurus/Translate";
import useIsBrowser from "@docusaurus/useIsBrowser";

import type { Props } from "@theme/ColorModeToggle";
import IconDarkMode from "@theme/Icon/DarkMode";
import IconLightMode from "@theme/Icon/LightMode";

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
        "appearance-toggle swap swap-rotate",
        value === "dark" && "appearance-toggle-active",
        className,
      )}
      type="button"
      onClick={() => onChange(value === "dark" ? "light" : "dark")}
      disabled={!isBrowser}
      title={title}
      aria-label={title}
      aria-live="polite"
    >
      <IconLightMode className="appearance-toggle-icon swap-off" />
      <IconDarkMode className="apprencen-toggle-icon swap-on" />
    </button>
  );
}

export default React.memo(ColorModeToggle);
