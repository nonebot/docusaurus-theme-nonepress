import React, { type ReactNode } from "react";

import clsx from "clsx";

import { translate } from "@docusaurus/Translate";
import useIsBrowser from "@docusaurus/useIsBrowser";

import type { Props } from "@theme/ColorModeToggle";
import IconDarkMode from "@theme/Icon/DarkMode";
import IconLightMode from "@theme/Icon/LightMode";
import IconSystemColorMode from "@theme/Icon/SystemColorMode";

import type { ColorMode } from "@docusaurus/theme-common";

import "./styles.css";

// The order of color modes is defined here, and can be customized with swizzle
function getNextColorMode(
  colorMode: ColorMode | null,
  respectPrefersColorScheme: boolean,
) {
  // 2-value transition
  if (!respectPrefersColorScheme) {
    return colorMode === "dark" ? "light" : "dark";
  }

  // 3-value transition
  switch (colorMode) {
    case null:
      return "light";
    case "light":
      return "dark";
    case "dark":
      return null;
    default:
      throw new Error(`unexpected color mode ${colorMode}`);
  }
}

function getColorModeLabel(colorMode: ColorMode | null): string {
  switch (colorMode) {
    case null:
      return translate({
        message: "system mode",
        id: "theme.colorToggle.ariaLabel.mode.system",
        description: "The name for the system color mode",
      });
    case "light":
      return translate({
        message: "light mode",
        id: "theme.colorToggle.ariaLabel.mode.light",
        description: "The name for the light color mode",
      });
    case "dark":
      return translate({
        message: "dark mode",
        id: "theme.colorToggle.ariaLabel.mode.dark",
        description: "The name for the dark color mode",
      });
    default:
      throw new Error(`unexpected color mode ${colorMode}`);
  }
}

function getColorModeAriaLabel(colorMode: ColorMode | null) {
  return translate(
    {
      message: "Switch between dark and light mode (currently {mode})",
      id: "theme.colorToggle.ariaLabel",
      description: "The ARIA label for the color mode toggle",
    },
    {
      mode: getColorModeLabel(colorMode),
    },
  );
}

function ColorModeToggle({
  className,
  buttonClassName,
  respectPrefersColorScheme,
  value,
  onChange,
}: Props): ReactNode {
  const isBrowser = useIsBrowser();

  return (
    <button
      className={clsx("appearance-toggle", className, buttonClassName)}
      type="button"
      title={getColorModeLabel(value)}
      aria-label={getColorModeAriaLabel(value)}
      // aria-live disabled on purpose (see upstream a11y decisions in
      // https://github.com/facebook/docusaurus/issues/7667): with it,
      // VoiceOver/NVDA announce the state change multiple times
      disabled={!isBrowser}
      onClick={() =>
        onChange(getNextColorMode(value, respectPrefersColorScheme))
      }
    >
      <span
        className={clsx(
          "appearance-toggle-switcher",
          value === "dark" && "appearance-toggle-switcher-active",
          respectPrefersColorScheme &&
            value === null &&
            "appearance-toggle-switcher-half",
        )}
      >
        <span
          className={clsx(
            "appearance-toggle-container",
            (value === "light" ||
              (!respectPrefersColorScheme && value === null)) &&
              "appearance-toggle-container-active",
          )}
        >
          <IconLightMode aria-hidden className="appearance-toggle-icon" />
        </span>
        <span
          className={clsx(
            "appearance-toggle-container",
            value === "dark" && "appearance-toggle-container-active",
          )}
        >
          <IconDarkMode aria-hidden className="appearance-toggle-icon" />
        </span>
        {respectPrefersColorScheme && (
          <span
            className={clsx(
              "appearance-toggle-container",
              value === null && "appearance-toggle-container-active",
            )}
          >
            <IconSystemColorMode
              aria-hidden
              className="appearance-toggle-icon"
            />
          </span>
        )}
      </span>
    </button>
  );
}

export default React.memo(ColorModeToggle);
