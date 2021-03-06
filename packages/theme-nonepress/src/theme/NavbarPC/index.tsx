import clsx from "clsx";
import React from "react";

import Logo from "@theme/Logo";
import Link from "@docusaurus/Link";
import styles from "./styles.module.css";
import SearchBar from "@theme/SearchBar";
import NavbarItem from "@theme/NavbarItem";
import type { Props } from "@theme/NavbarPC";
import useBaseUrl from "@docusaurus/useBaseUrl";
import ThemeSwitcher from "@theme/ThemeSwitcher";
import useTransition from "@theme/hooks/useTransition";
import useOnclickOutside from "react-cool-onclickoutside";
import useThemeConfig, { NavbarConfig } from "@theme/hooks/useThemeConfig";
import { useDocsPreferredVersion } from "@docusaurus/theme-common";
import type { NavbarLink, NavbarDocLink } from "@theme/hooks/useThemeConfig";
import {
  GlobalVersion,
  GlobalDoc,
} from "@docusaurus/plugin-content-docs/lib/types";
import {
  useVersions,
  useActiveDocContext,
  useLatestVersion,
} from "@theme/hooks/useDocs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function getVersionMainDoc(version: GlobalVersion): GlobalDoc {
  return version.docs.find((doc) => doc.id === version.mainDocId);
}

function NavbarDocsVersion({
  docsVersionItemBefore,
  docsVersionItemAfter,
}: Pick<
  NavbarConfig,
  "docsVersionItemBefore" | "docsVersionItemAfter"
>): JSX.Element {
  const { element, active, transitionClasses, enter, leave } =
    useTransition<HTMLUListElement>();
  const ref = useOnclickOutside(
    () => {
      if (active) {
        leave();
      }
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

  const dropdownVersion =
    activeDocContext.activeVersion ?? preferredVersion ?? latestVersion;

  function getDocInVersion(docId: string) {
    const allDocs = dropdownVersion.docs;
    const doc = allDocs.find((versionDoc) => versionDoc.id === docId);
    if (!doc) {
      const docIds = allDocs.map((versionDoc) => versionDoc.id).join("\n- ");
      throw new Error(
        `DocNavbarItem: couldn't find any doc with id "${docId}" in version ${dropdownVersion.name}.
  Available doc ids are:\n- ${docIds}`
      );
    }
    return doc;
  }

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
  function getExtraLinks(links: (NavbarLink | NavbarDocLink)[]) {
    return links.map((link) => {
      if (link.type === "docLink") {
        const link_ = link as NavbarDocLink;
        const doc = getDocInVersion(link_.docId);
        return {
          isNavLink: false,
          label: link_.label,
          to: doc.path,
        };
      } else {
        const link_ = link as NavbarLink;
        const toUrl = useBaseUrl(link_.to);
        const normalizedHref = useBaseUrl(link_.href, {
          forcePrependBaseUrl: true,
        });
        return {
          isNavLink: false,
          label: link_.label,
          href: link_.prependBaseUrlToHref ? normalizedHref : link_.href,
          to: toUrl,
        };
      }
    });
  }

  const items = getItems();
  const preItems = getExtraLinks(docsVersionItemBefore);
  const afterItems = getExtraLinks(docsVersionItemAfter);

  if (items.length <= 0) {
    return <></>;
  }

  return (
    <div className="self-end mr-5 w-32 relative lg:mr-0">
      <button
        type="button"
        ref={ref}
        onClick={() => {
          active ? leave() : enter();
        }}
        className="bg-light-nonepress-100 relative flex items-center w-full border border-light-nonepress-200 rounded-md shadow-sm pl-8 pr-6 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-light-text-active focus:border-light-text-active sm:text-sm dark:bg-dark-nonepress-100 dark:border-dark-nonepress-200 dark:bg-opacity-50 dark:focus:ring-dark-text-active dark:focus:border-dark-text-active"
        aria-haspopup="listbox"
        aria-expanded="true"
        aria-labelledby="listbox-label"
      >
        <span
          aria-label="Selected"
          className="absolute left-3.5 bg-light-text-active shrink-0 inline-block h-2 w-2 rounded-full dark:bg-dark-text-active"
        ></span>
        <span className="block truncate font-medium">
          {dropdownVersion.label}
        </span>
        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <FontAwesomeIcon
            className="text-lg opacity-60"
            icon={["fas", "sort"]}
          />
        </span>
      </button>
      <ul
        ref={element}
        className={clsx(
          "absolute z-10 mt-1 w-full bg-light-nonepress-100 shadow-lg max-h-60 rounded-md py-1 px-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto transition transform focus:outline-none sm:text-sm dark:bg-dark-nonepress-100",
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
        {preItems.map((item, index) => (
          <li key={index} className="cursor-default select-none relative">
            <Link
              {...(item.href
                ? {
                    href: item.href,
                  }
                : {
                    to: item.to,
                  })}
              isNavLink={item.isNavLink}
              className="relative flex justify-end items-center content-center transition py-2 pl-7 rounded duration-300 hover:bg-light-nonepress-200 dark:hover:bg-dark-nonepress-200"
            >
              <span className="grow font-medium inline-block truncate">
                {item.label}
              </span>
            </Link>
          </li>
        ))}
        {items.map((version, index) => (
          <li key={index} className="cursor-default select-none relative">
            <Link
              to={version.to}
              onClick={version.onClick}
              isActive={version.isActive}
              isNavLink={version.isNavLink}
              activeClassName={styles["version-selected"]}
              className="relative flex justify-end items-center content-center transition py-2 pl-7 rounded duration-300 hover:bg-light-nonepress-200 dark:hover:bg-dark-nonepress-200"
            >
              <span
                aria-label="Selected"
                className={clsx(
                  styles["version-selected-tag"],
                  "invisible absolute left-2.5 bg-light-text-active shrink-0 inline-block h-2 w-2 rounded-full dark:bg-dark-text-active"
                )}
              ></span>
              <span className="grow font-medium inline-block truncate">
                {version.label}
              </span>
            </Link>
          </li>
        ))}
        {afterItems.map((item, index) => (
          <li key={index} className="cursor-default select-none relative">
            <Link
              {...(item.href
                ? {
                    href: item.href,
                  }
                : {
                    to: item.to,
                  })}
              isNavLink={item.isNavLink}
              className="relative flex justify-end items-center content-center transition py-2 pl-7 rounded duration-300 hover:bg-light-nonepress-200 dark:hover:bg-dark-nonepress-200"
            >
              <span className="grow font-medium inline-block truncate">
                {item.label}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function NavbarPc(props: Props): JSX.Element {
  const {
    navbar: { items, docsVersionItemBefore, docsVersionItemAfter },
  } = useThemeConfig();
  const { openMobileMenu } = props;

  return (
    <div className="mx-auto px-4 z-30 sm:px-6 lg:px-8">
      <div className="relative flex justify-end items-center py-6 lg:space-x-10">
        <div className="flex grow justify-start lg:w-0 lg:flex-1">
          <Logo imageClassName="h-8 w-auto sm:h-10">
            <span className="sr-only">Home</span>
          </Logo>
        </div>
        <SearchBar />
        <NavbarDocsVersion
          docsVersionItemBefore={docsVersionItemBefore}
          docsVersionItemAfter={docsVersionItemAfter}
        />
        <ThemeSwitcher className="mr-0 hidden lg:inline-flex" />
        <div className="-mr-2 -my-2 lg:hidden order-last">
          <button
            onClick={openMobileMenu}
            type="button"
            className="rounded-md p-2 inline-flex items-center justify-center transition opacity-60 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-light-text-active dark:focus:ring-dark-text-active ignore-mobile-menu"
            aria-expanded="false"
          >
            <span className="sr-only">Open menu</span>
            <FontAwesomeIcon className="text-2xl" icon={["fas", "bars"]} />
          </button>
        </div>
        <nav className="hidden lg:flex">
          <ul className="lg:flex lg:items-center lg:space-x-10">
            {items.map((item, index) => (
              <NavbarItem key={index} item={item} />
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default NavbarPc;
