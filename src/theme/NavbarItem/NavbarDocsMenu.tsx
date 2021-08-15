import clsx from "clsx";
import { sortBy } from "lodash";
import React, { PropsWithChildren } from "react";

import Link from "@docusaurus/Link";
import useTransition from "@theme/hooks/useTransition";
import { useDocsPreferredVersion } from "@docusaurus/theme-common";
import { NavbarDocsMenu as NavDocsMenu } from "../../useThemeConfig";
import { CURRENT_VERSION_NAME } from "@docusaurus/plugin-content-docs/lib/constants";
import {
  useVersions,
  useLatestVersion,
  useLoadedVersions,
  useActiveDocContext,
} from "@theme/hooks/useDocs";
import {
  GlobalVersion,
  GlobalDoc,
} from "@docusaurus/plugin-content-docs/lib/types";

function getVersionMainDoc(version: GlobalVersion): GlobalDoc {
  return version.docs.find((doc) => doc.id === version.mainDocId);
}

export default function NavbarDocsMenu(
  props: PropsWithChildren<NavDocsMenu>
): JSX.Element {
  const { label, icon, className, idPrefix } = props;
  const { element, active, transitionClasses, enter, leave } =
    useTransition<HTMLDivElement>();

  const docsPluginId = undefined;
  const docsData = useLoadedVersions(docsPluginId);
  const activeDocContext = useActiveDocContext(docsPluginId);
  const versions = useVersions(docsPluginId);
  const latestVersion = useLatestVersion(docsPluginId);
  const nextVersion = versions.find(
    (version) => version.name === CURRENT_VERSION_NAME
  );

  const { preferredVersion, savePreferredVersionName } =
    useDocsPreferredVersion(docsPluginId);

  const dropdownVersion =
    activeDocContext.activeVersion ?? preferredVersion ?? latestVersion;

  function getItems() {
    const activeVersionData = docsData.versions.find(
      (version) => version.versionName === dropdownVersion.name
    );
    const activeDocs = activeVersionData.docs.filter(
      (doc) => doc.frontMatter.weight && doc.id.startsWith(idPrefix || "")
    );
    const sortedDocs = sortBy(activeDocs, [(doc) => doc.frontMatter.weight]);
    const docLinks = sortedDocs.map((doc) => ({
      title: doc.title,
      description: doc.description,
      to: doc.permalink,
    }));

    return docLinks;
  }

  function getVersionItems() {
    if (versions.length <= 1) {
      return [];
    }
    const items = [];
    [latestVersion, nextVersion].forEach((version) => {
      const versionDoc =
        activeDocContext?.alternateDocVersions[version.name] ||
        getVersionMainDoc(version);
      items.push({
        label: version.label,
        to: versionDoc.path,
        stable: version.isLast,
        onClick: () => {
          savePreferredVersionName(version.name);
        },
      });
    });
    return items;
  }

  const items = getItems();
  const versionItems = getVersionItems();
  const toUrl = getVersionMainDoc(dropdownVersion).path;

  return (
    <li
      className={clsx("relative flex items-center h-full", className)}
      onMouseEnter={enter}
      onMouseLeave={leave}
    >
      <Link
        to={toUrl}
        className={clsx(
          "self-center transition duration-300 opacity-60 hover:opacity-100",
          icon ? "text-3xl" : "text-sm font-medium uppercase"
        )}
      >
        {icon ? <i className={icon}></i> : label}
      </Link>
      <i className="fas fa-angle-down ml-2 text-xl opacity-60 group-hover:opacity-100 transition ease-in-out duration-150"></i>
      <div
        ref={element}
        className={clsx(
          "absolute z-10 top-0 left-1/2 transform -translate-x-1/2 mt-8 pt-2 px-2 w-screen max-w-md sm:px-0 lg:max-w-3xl",
          transitionClasses,
          { hidden: !active }
        )}
        data-transition-enter-active="duration-200 ease-out"
        data-transition-enter-from="opacity-0 scale-95"
        data-transition-enter-to="opacity-100 scale-100"
        data-transition-leave-active="duration-100 ease-in"
        data-transition-leave-from="opacity-100 scale-100"
        data-transition-leave-to="opacity-0 scale-95"
      >
        <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
          <div className="relative grid auto-cols-fr gap-6 bg-light-note px-5 py-6 sm:gap-8 sm:p-8 lg:grid-cols-3 dark:bg-gray-700">
            {items.map((doc, index) => (
              <Link
                key={index}
                to={doc.to}
                className="-m-3 p-3 flex items-start rounded-lg whitespace-nowrap hover:bg-light-note-darker transition ease-in-out duration-150 dark:hover:bg-dark-note-darker"
              >
                <div className="max-w-full">
                  <p className="text-base font-medium">{doc.title}</p>
                  <p className="mt-1 text-sm overflow-hidden overflow-ellipsis opacity-60">
                    {doc.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          {versionItems && (
            <div className="p-5 bg-light-note-darker sm:p-8 dark:bg-dark-note-darker">
              <div className="relative grid gap-6 sm:gap-8 lg:grid-cols-2">
                {versionItems.map((versionItem, index) => (
                  <Link
                    key={index}
                    to={versionItem.to}
                    onClick={versionItem.onClick}
                    className="-m-3 p-3 flow-root rounded-md hover:bg-indigo-50 transition ease-in-out duration-150 dark:hover:bg-gray-800"
                  >
                    <span className="flex items-center">
                      <span className="text-base font-medium">
                        {versionItem.label}
                      </span>
                      {versionItem.stable ? (
                        <span className="ml-3 inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium leading-5 bg-indigo-100 text-indigo-800 dark:text-indigo-300 dark:bg-transparent dark:border dark:border-indigo-300">
                          Stable
                        </span>
                      ) : (
                        <span className="ml-3 inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium leading-5 bg-red-100 text-red-800 dark:bg-transparent dark:text-red-300 dark:border dark:border-red-300">
                          Development
                        </span>
                      )}
                    </span>
                    <span className="mt-1 block text-sm opacity-80">
                      {versionItem.stable ? (
                        <>
                          Documentation for the latest,{" "}
                          <strong className="text-medium text-indigo-800 dark:text-indigo-300">
                            stable
                          </strong>
                          , branch.
                        </>
                      ) : (
                        <>
                          Documentation for the latest,{" "}
                          <strong className="text-medium text-red-800 dark:text-red-300">
                            in-development
                          </strong>
                          , branch.
                        </>
                      )}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </li>
  );
}
