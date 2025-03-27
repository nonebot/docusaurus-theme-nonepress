import React, { type ReactNode } from "react";

import clsx from "clsx";

import { translate } from "@docusaurus/Translate";
import useIsBrowser from "@docusaurus/useIsBrowser";

import type { Props } from "@theme/ColorModeToggle";
import IconDarkMode from "@theme/Icon/DarkMode";
import IconLightMode from "@theme/Icon/LightMode";

import "./styles.css";

function ColorModeToggle({
  className,
  dark = false,
  value,
  onChange,
}: Props): ReactNode {
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
      className={clsx("appearance-toggle", className)}
      type="button"
      role="switch"
      title={title}
      aria-label={title}
      aria-live="polite"
      disabled={!isBrowser}
      onClick={() => onChange(value === "dark" ? "light" : "dark")}
    >
      <span className="sr-only">Use dark theme</span>
      <span
        className={clsx(
          "appearance-toggle-switcher",
          value === "dark" && "appearance-toggle-switcher-active",
        )}
      >
        <span
          className={clsx(
            "appearance-toggle-container",
            value === "light" && "appearance-toggle-container-active",
          )}
        >
          <IconLightMode className="appearance-toggle-icon" />
        </span>
        <span
          className={clsx(
            "appearance-toggle-container",
            value === "dark" && "appearance-toggle-container-active",
          )}
        >
          <IconDarkMode className="appearance-toggle-icon" />
        </span>
      </span>
    </button>
  );

  // return (
  //   <div className="navbar-label">
  //     <button
  //       className={clsx(
  //         "appearance-toggle swap swap-rotate",
  //         value === "dark" && "swap-active",
  //         className,
  //       )}
  //       type="button"
  //       onClick={() => onChange(value === "dark" ? "light" : "dark")}
  //       disabled={!isBrowser}
  //       title={title}
  //       aria-label={title}
  //       aria-live="polite"
  //     >
  //       <IconLightMode className="appearance-toggle-icon swap-off" />
  //       <IconDarkMode className="appearance-toggle-icon swap-on" />
  //     </button>
  //   </div>
  // );
}

export default React.memo(ColorModeToggle);
