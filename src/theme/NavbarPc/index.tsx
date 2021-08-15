import clsx from "clsx";
import React, { PropsWithChildren, useCallback } from "react";

import Logo from "@theme/Logo";
import Link from "@docusaurus/Link";
import styles from "./styles.module.css";
import SearchBar from "@theme/SearchBar";
import NavbarItem from "@theme/NavbarItem";
import ThemeSwitcher from "@theme/ThemeSwitcher";
import useThemeConfig from "../../useThemeConfig";
import useTransition from "@theme/hooks/useTransition";
import useOnclickOutside from "react-cool-onclickoutside";
import useThemeContext from "@theme/hooks/useThemeContext";
import { useDocsPreferredVersion } from "@docusaurus/theme-common";
import {
  GlobalVersion,
  GlobalDoc,
} from "@docusaurus/plugin-content-docs/lib/types";
import {
  useVersions,
  useActiveDocContext,
  useLatestVersion,
} from "@theme/hooks/useDocs";

function useColorModeToggle() {
  const { isDarkTheme, toggleTheme } = useThemeContext();
  const toggle = useCallback(() => toggleTheme(), [toggleTheme]);
  return { isDarkTheme, toggle };
}

function getVersionMainDoc(version: GlobalVersion): GlobalDoc {
  return version.docs.find((doc) => doc.id === version.mainDocId);
}

function NavbarDocsVersion(props: PropsWithChildren<unknown>): JSX.Element {
  const { element, active, transitionClasses, enter, leave } =
    useTransition<HTMLUListElement>();
  const ref = useOnclickOutside(
    () => {
      leave();
    },
    {
      ignoreClass: "ignore-version-dropdown",
    }
  );

  const docsPluginId = undefined;
  const activeDocContext = useActiveDocContext(docsPluginId);
  const versions = useVersions(docsPluginId);
  const latestVersion = useLatestVersion(docsPluginId);

  const { preferredVersion, savePreferredVersionName } =
    useDocsPreferredVersion(docsPluginId);

  function getItems() {
    const versionLinks = versions.map((version) => {
      // We try to link to the same doc, in another version
      // When not possible, fallback to the "main doc" of the version
      const versionDoc =
        activeDocContext?.alternateDocVersions[version.name] ||
        getVersionMainDoc(version);
      return {
        isNavLink: true,
        label: version.label,
        to: versionDoc.path,
        isActive: () => version === activeDocContext?.activeVersion,
        onClick: () => {
          savePreferredVersionName(version.name);
        },
      };
    });

    return versionLinks;
  }

  const items = getItems();

  const dropdownVersion =
    activeDocContext.activeVersion ?? preferredVersion ?? latestVersion;

  if (items.length <= 1) {
    // return <></>;
  }

  return (
    <div className="self-end mr-5 w-28 relative md:mr-0">
      <button
        type="button"
        ref={ref}
        onClick={() => {
          active ? leave() : enter();
        }}
        className="bg-light-note relative flex items-center w-full border border-gray-300 rounded-md shadow-sm pl-8 pr-6 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:bg-opacity-50 dark:focus:ring-indigo-300 dark:focus:border-indigo-300"
        aria-haspopup="listbox"
        aria-expanded="true"
        aria-labelledby="listbox-label"
      >
        <span
          aria-label="Selected"
          className="absolute left-3.5 bg-indigo-400 flex-shrink-0 inline-block h-2 w-2 rounded-full dark:bg-indigo-300"
        ></span>
        <span className="block truncate font-medium">
          {dropdownVersion.label}
        </span>
        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <i className="text-lg opacity-60 fas fa-sort"></i>
        </span>
      </button>
      <ul
        ref={element}
        className={clsx(
          "absolute z-10 mt-1 w-full bg-light-note shadow-lg max-h-60 rounded-md py-1 px-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto transition transform focus:outline-none sm:text-sm dark:bg-gray-700",
          active ? "ignore-version-dropdown" : "hidden",
          transitionClasses
        )}
        data-transition-enter-active="duration-200 ease-out"
        data-transition-enter-from="opacity-0"
        data-transition-enter-to="opacity-100"
        data-transition-leave-active="duration-100 ease-in"
        data-transition-leave-from="opacity-100"
        data-transition-leave-to="opacity-0"
      >
        {items.map((version, index) => (
          <li key={index} className="cursor-default select-none relative">
            <Link
              to={version.to}
              isActive={version.isActive}
              isNavLink={version.isNavLink}
              activeClassName={styles["version-selected"]}
              className="relative flex justify-end items-center content-center transition py-2 px-7 rounded duration-300 hover:bg-light-note-darker dark:hover:bg-dark-note-darker"
            >
              <span
                aria-label="Selected"
                className={clsx(
                  styles["version-selected-tag"],
                  "invisible absolute left-2.5 bg-indigo-400 flex-shrink-0 inline-block h-2 w-2 rounded-full dark:bg-indigo-300"
                )}
              ></span>
              <span className="flex-grow font-medium inline-block truncate">
                {version.label}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function NavbarPc(
  props: PropsWithChildren<{ openMobileMenu: () => void }>
): JSX.Element {
  const {
    colorMode: {
      disableSwitch,
      switchConfig: { darkIcon, darkIconText, lightIcon, lightIconText },
    },
    navbar: { items },
  } = useThemeConfig();
  const colorModeToggle = useColorModeToggle();
  const { openMobileMenu } = props;

  return (
    <div className="max-w-7xl mx-auto px-4 z-30 sm:px-6 lg:px-8">
      <div className="relative flex justify-end items-center py-6 md:space-x-10">
        <div className="flex flex-grow justify-start lg:w-0 lg:flex-1">
          <Logo imageClassName="h-8 w-auto sm:h-10">
            <span className="sr-only">Home</span>
          </Logo>
        </div>
        <SearchBar />
        <NavbarDocsVersion />
        <ThemeSwitcher className="mr-0 hidden md:inline-flex" />
        <div className="-mr-2 -my-2 md:hidden order-last">
          <button
            onClick={openMobileMenu}
            type="button"
            className="rounded-md p-2 inline-flex items-center justify-center transition opacity-60 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 dark:focus:ring-indigo-300 dark:focus:border-indigo-300 ignore-mobile-menu"
            aria-expanded="false"
          >
            <span className="sr-only">Open menu</span>
            <i className="text-2xl fas fa-bars"></i>
          </button>
        </div>
        <nav className="hidden md:flex">
          <ul className="md:flex md:items-center md:space-x-10">
            {items.map((item, index) => (
              <NavbarItem key={index} item={item} />
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
