import React from "react";

import clsx from "clsx";

import Translate from "@docusaurus/Translate";
import Link from "@docusaurus/Link";
import {
  type GlobalVersion,
  useActiveDocContext,
} from "@docusaurus/plugin-content-docs/client";
import { useDocsPreferredVersion } from "@docusaurus/theme-common";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  useDocsMenuCategory,
  useDocsMenuVersions,
} from "@nullbot/docusaurus-theme-nonepress/client";

import type {
  Props,
  DesktopOrMobileNavBarItemProps,
} from "@theme/NavbarItem/DocsMenuDropdownNavbarItem";

const getVersionMainDoc = (version: GlobalVersion) =>
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  version.docs.find((doc) => doc.id === version.mainDocId)!;

function DocsMenuDropdownNavbarItemDesktop({
  docId,
  label,
  className,
  category,
  docsPluginId,
}: DesktopOrMobileNavBarItemProps): JSX.Element | null {
  const { link, docs } = useDocsMenuCategory(category, docId, docsPluginId);
  const versions = useDocsMenuVersions(docsPluginId);

  const { savePreferredVersionName } = useDocsPreferredVersion(docsPluginId);
  const activeDocContext = useActiveDocContext(docsPluginId);

  const getVersionInfo = (version: GlobalVersion) => {
    const versionDoc =
      activeDocContext?.alternateDocVersions[version.name] ||
      getVersionMainDoc(version);
    return {
      label: version.label,
      to: versionDoc.path,
      onClick: () => {
        savePreferredVersionName(version.name);
      },
    };
  };
  const versionInfo = versions && {
    latest: getVersionInfo(versions.latest),
    next: getVersionInfo(versions.next),
  };

  const stableInfo = (
    <Translate
      id="theme.docsMenu.stableVersion.description"
      description="The description used for the stable version link in the docs menu."
      values={{
        branchName: (
          <strong className="text-medium text-indigo-800 dark:text-indigo-300">
            <Translate
              id="theme.docsMenu.stableVersion.branchName"
              description="The branch name used for the stable version link in the docs menu."
            >
              stable
            </Translate>
          </strong>
        ),
      }}
    >
      {"Documentation for the latest, {branchName}, branch."}
    </Translate>
  );
  const nextInfo = (
    <Translate
      id="theme.docsMenu.nextVersion.description"
      description="The description used for the next version link in the docs menu."
      values={{
        branchName: (
          <strong className="text-medium text-indigo-800 dark:text-indigo-300">
            <Translate
              id="theme.docsMenu.nextVersion.branchName"
              description="The branch name used for the next version link in the docs menu."
            >
              in-development
            </Translate>
          </strong>
        ),
      }}
    >
      {"Documentation for the latest, {branchName}, branch."}
    </Translate>
  );

  return (
    <li className={clsx("dropdown dropdown-hover group", className)}>
      <Link
        to={link}
        className="self-center transition duration-300 opacity-60 group-hover:opacity-100"
      >
        {label}
      </Link>
      {docs && (
        <>
          <FontAwesomeIcon
            className="ml-2 text-xl opacity-60 group-hover:opacity-100 transition ease-in-out duration-150"
            icon={["fas", "chevron-down"]}
          />
          <div
            className={clsx(
              "dropdown-content z-10 transform left-1/2 -translate-x-1/2 w-[28rem] lg:w-[48rem]",
            )}
          >
            <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
              <div className="relative grid auto-cols-fr gap-6 bg-light-nonepress-100 px-5 py-6 sm:gap-8 sm:p-8 lg:grid-cols-3 dark:bg-dark-nonepress-100">
                {docs.map((doc, index) => (
                  <Link
                    key={index}
                    to={doc.permalink}
                    className="-m-3 p-3 flex items-start rounded-lg whitespace-nowrap hover:bg-light-nonepress-200 transition ease-in-out duration-150 dark:hover:bg-dark-nonepress-200"
                  >
                    <div className="max-w-full">
                      <p className="text-base font-medium">{doc.title}</p>
                      <p className="mt-1 text-sm overflow-hidden text-ellipsis opacity-60">
                        {doc.description}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
              {versionInfo && (
                <div className="p-5 bg-light-nonepress-200 sm:p-8 dark:bg-dark-nonepress-200">
                  <div className="relative grid gap-6 sm:gap-8 lg:grid-cols-2">
                    <Link
                      to={versionInfo.latest.to}
                      onClick={versionInfo.latest.onClick}
                      className="-m-3 p-3 flow-root rounded-md hover:bg-light-nonepress-300 transition ease-in-out duration-150 dark:hover:bg-dark-nonepress-300"
                    >
                      <span className="flex items-center">
                        <span className="text-base font-medium">
                          {versionInfo.latest.label}
                        </span>
                        <span className="ml-3 inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium leading-5 bg-indigo-100 text-indigo-800 dark:text-indigo-300 dark:bg-transparent dark:border dark:border-indigo-300">
                          Stable
                        </span>
                      </span>
                      <span className="mt-1 block text-sm opacity-80">
                        {stableInfo}
                      </span>
                    </Link>
                    <Link
                      to={versionInfo.next.to}
                      onClick={versionInfo.next.onClick}
                      className="-m-3 p-3 flow-root rounded-md hover:bg-light-nonepress-300 transition ease-in-out duration-150 dark:hover:bg-dark-nonepress-300"
                    >
                      <span className="flex items-center">
                        <span className="text-base font-medium">
                          {versionInfo.next.label}
                        </span>
                        <span className="ml-3 inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium leading-5 bg-red-100 text-red-800 dark:bg-transparent dark:text-red-300 dark:border dark:border-red-300">
                          Development
                        </span>
                      </span>
                      <span className="mt-1 block text-sm opacity-80">
                        {nextInfo}
                      </span>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </li>
  );
}

function DocsMenuDropdownNavbarItemMobile({
  docId,
  docsPluginId,
  category,
  className,
  label,
}: DesktopOrMobileNavBarItemProps): JSX.Element {
  const { link } = useDocsMenuCategory(category, docId, docsPluginId);

  return (
    <li className={className}>
      <Link
        to={link}
        className={clsx(
          "block px-3 py-3 rounded-md hover:bg-light-nonepress-200 dark:hover:bg-dark-nonepress-200 dark:hover:opacity-100",
          !label ? "text-2xl" : "text-base font-medium uppercase",
        )}
      >
        <span className="truncate">{label}</span>
      </Link>
    </li>
  );
}

export default function DocsMenuDropdownNavbarItem({
  mobile = false,
  ...props
}: Props): JSX.Element | null {
  const Comp = mobile
    ? DocsMenuDropdownNavbarItemMobile
    : DocsMenuDropdownNavbarItemDesktop;
  return <Comp {...props} />;
}
