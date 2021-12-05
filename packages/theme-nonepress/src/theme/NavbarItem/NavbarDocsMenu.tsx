import clsx from "clsx";
import React from "react";
import { sortBy } from "lodash";

import Link from "@docusaurus/Link";
import useTransition from "@theme/hooks/useTransition";
import { useDocsPreferredVersion } from "@docusaurus/theme-common";
import { CURRENT_VERSION_NAME } from "@docusaurus/plugin-content-docs/lib/constants";
import {
  useVersions,
  useLatestVersion,
  useLoadedVersions,
  useActiveDocContext,
} from "@theme/hooks/useDocs";
import type { Props } from "@theme/NavbarItem/NavbarDocsMenu";
import type { GlobalDoc } from "docusaurus-theme-nonepress/types";
import type {
  GlobalDataDoc,
  GlobalDataVersion,
} from "@docusaurus/plugin-content-docs-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function getVersionMainDoc(version: GlobalDataVersion): GlobalDataDoc {
  return version.docs.find((doc) => doc.id === version.mainDocId);
}

function NavbarDocsMenu(props: Props): JSX.Element {
  const { docId, label, icon, className, category, docsPluginId } = props;
  const { element, active, transitionClasses, enter, leave } =
    useTransition<HTMLDivElement>();

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
      (version) => version.name === dropdownVersion.name
    );
    const activeDocs = activeVersionData.docs.filter((doc) => {
      const menu = doc.frontMatter?.options?.menu;
      const weight = menu?.weight;
      const docCategory = menu?.category;
      let inCategory = true;
      if (category) {
        inCategory = docCategory && docCategory.indexOf(category) >= 0;
      }
      return weight && inCategory;
    });
    const sortedDocs: GlobalDoc[] = sortBy(activeDocs, [
      (doc) => doc.frontMatter.options.menu.weight,
    ]);
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

  function getDocInVersion() {
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

  const items = getItems();
  const versionItems = getVersionItems();
  const toUrl = (docId && getDocInVersion().path) || (items && items[0]?.to);

  return (
    <li
      className={clsx("relative flex items-center h-full group", className)}
      onMouseEnter={enter}
      onMouseLeave={leave}
    >
      <Link
        to={toUrl}
        className={clsx(
          "self-center transition duration-300 opacity-60 group-hover:opacity-100",
          icon ? "text-3xl" : "text-sm font-medium uppercase"
        )}
      >
        {icon ? <FontAwesomeIcon icon={icon} /> : label}
      </Link>
      <FontAwesomeIcon
        className="ml-2 text-xl opacity-60 group-hover:opacity-100 transition ease-in-out duration-150"
        icon={["fas", "angle-down"]}
      />
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
          <div className="relative grid auto-cols-fr gap-6 bg-light-nonepress-100 px-5 py-6 sm:gap-8 sm:p-8 lg:grid-cols-3 dark:bg-dark-nonepress-100">
            {items.map((doc, index) => (
              <Link
                key={index}
                to={doc.to}
                className="-m-3 p-3 flex items-start rounded-lg whitespace-nowrap hover:bg-light-nonepress-200 transition ease-in-out duration-150 dark:hover:bg-dark-nonepress-200"
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
            <div className="p-5 bg-light-nonepress-200 sm:p-8 dark:bg-dark-nonepress-200">
              <div className="relative grid gap-6 sm:gap-8 lg:grid-cols-2">
                {versionItems.map((versionItem, index) => (
                  <Link
                    key={index}
                    to={versionItem.to}
                    onClick={versionItem.onClick}
                    className="-m-3 p-3 flow-root rounded-md hover:bg-light-nonepress-300 transition ease-in-out duration-150 dark:hover:bg-dark-nonepress-300"
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

export default NavbarDocsMenu;
