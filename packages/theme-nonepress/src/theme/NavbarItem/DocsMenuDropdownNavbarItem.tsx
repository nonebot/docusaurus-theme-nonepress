import React, { type ReactNode } from "react";

import clsx from "clsx";

import Link from "@docusaurus/Link";
import Translate from "@docusaurus/Translate";
import {
  type GlobalDoc,
  type GlobalVersion,
  useActiveDocContext,
  useDocsPreferredVersion,
} from "@docusaurus/plugin-content-docs/client";
import {
  useDocsMenuCategory,
  useDocsMenuVersions,
} from "@nullbot/docusaurus-theme-nonepress/client";

import Heading from "@theme/Heading";
import IconDropdown from "@theme/Icon/Dropdown";
import DefaultNavbarItem from "@theme/NavbarItem/DefaultNavbarItem";
import type {
  DesktopOrMobileNavBarItemProps,
  Props,
} from "@theme/NavbarItem/DocsMenuDropdownNavbarItem";

import type { Doc } from "@nullbot/docusaurus-plugin-docsmenu/client";

const getVersionMainDoc = (version: GlobalVersion) =>
  version.docs.find((doc) => doc.id === version.mainDocId)!;

function containsActiveDocsMenuItems(
  docs: Doc[],
  activeDoc: GlobalDoc | undefined,
): boolean {
  return docs.some((doc) => activeDoc?.path === doc.permalink);
}

function DocsMenuDropdownNavbarItemDesktop({
  label,
  children,
  className,
  activeClassName,
  docId,
  category,
  docsPluginId,
  ...props
}: DesktopOrMobileNavBarItemProps): ReactNode {
  const { link, docs } = useDocsMenuCategory(category, docId, docsPluginId);
  const versions = useDocsMenuVersions(docsPluginId);
  const activeDocContext = useActiveDocContext(docsPluginId);
  const { savePreferredVersionName } = useDocsPreferredVersion(docsPluginId);
  const isActive = containsActiveDocsMenuItems(
    docs,
    activeDocContext.activeDoc,
  );

  // category has no docs, unexpected
  // if (docs.length === 0) {
  //   return (
  //     <DefaultNavbarItem
  //       {...props}
  //       label={label ?? category}
  //       to={link ?? autoLink}
  //       isActive={(match) => !!match || isActive}
  //     />
  //   );
  // }

  const docsInfo = docs.map((doc) => ({
    to: doc.permalink,
    title: doc.title,
    description: doc.description,
    isActive: () => activeDocContext.activeDoc?.path === doc.permalink,
  }));

  const getVersionInfo = (version: GlobalVersion) => {
    const versionDoc =
      activeDocContext.alternateDocVersions[version.name] ||
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
          <strong className="navbar-docs-menu-version-link-branch-stable">
            <Translate
              id="theme.docsMenu.stableVersion.branchDescription"
              description="The branch description used for the stable version link in the docs menu."
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
          <strong className="navbar-docs-menu-version-link-branch-next">
            <Translate
              id="theme.docsMenu.nextVersion.branchDescription"
              description="The branch description used for the next version link in the docs menu."
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
    <li className="dropdown dropdown-hover dropdown-bottom navbar-dropdown">
      <Link
        tabIndex={0}
        aria-haspopup="true"
        role="button"
        to={link}
        className={clsx(
          "menu-link menu-item",
          isActive && "menu-link-active",
          className,
        )}
        activeClassName={clsx("menu-link-active", activeClassName)}
        {...props}
      >
        {children ?? label}
        <IconDropdown className="navbar-dropdown-icon" />
      </Link>
      <ul className="dropdown-content navbar-dropdown-content navbar-docs-menu-content">
        <div className="navbar-docs-menu-docs">
          {docsInfo.map((doc, index) => (
            <Link
              key={index}
              isNavLink
              to={doc.to}
              className="navbar-docs-menu-docs-link"
              activeClassName="navbar-docs-menu-docs-link-active"
              isActive={doc.isActive}
            >
              <div className="max-w-full">
                <p className="navbar-docs-menu-docs-link-title">{doc.title}</p>
                <p className="navbar-docs-menu-docs-link-description">
                  {doc.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
        {versionInfo && (
          <div className="navbar-docs-menu-version">
            <Link
              to={versionInfo.latest.to}
              onClick={versionInfo.latest.onClick}
              className="navbar-docs-menu-version-link"
            >
              <Heading as="h4" className="navbar-docs-menu-version-link-title">
                {versionInfo.latest.label}
                <span className="navbar-docs-menu-version-link-badge navbar-docs-menu-version-link-badge-stable">
                  <Translate
                    id="theme.docsMenu.stableVersion.branchName"
                    description="The branch name used for the stable version link in the docs menu."
                  >
                    Stable
                  </Translate>
                </span>
              </Heading>
              <span className="navbar-docs-menu-version-link-description">
                {stableInfo}
              </span>
            </Link>
            <Link
              to={versionInfo.next.to}
              onClick={versionInfo.next.onClick}
              className="navbar-docs-menu-version-link"
            >
              <Heading as="h4" className="navbar-docs-menu-version-link-title">
                {versionInfo.next.label}
                <span className="navbar-docs-menu-version-link-badge navbar-docs-menu-version-link-badge-next">
                  <Translate
                    id="theme.docsMenu.nextVersion.branchName"
                    description="The branch name used for the next version link in the docs menu."
                  >
                    Development
                  </Translate>
                </span>
              </Heading>
              <span className="navbar-docs-menu-version-link-description">
                {nextInfo}
              </span>
            </Link>
          </div>
        )}
      </ul>
    </li>
  );
}

function DocsMenuDropdownNavbarItemMobile({
  docId,
  docsPluginId,
  category,
  label,
  ...props
}: DesktopOrMobileNavBarItemProps): ReactNode {
  const { activeDoc } = useActiveDocContext(docsPluginId);
  const { link, autoLink, docs } = useDocsMenuCategory(
    category,
    docId,
    docsPluginId,
  );
  const isActive = containsActiveDocsMenuItems(docs, activeDoc);

  return (
    <DefaultNavbarItem
      {...props}
      label={label ?? category}
      to={link ?? autoLink}
      isActive={(match) => !!match || isActive}
    />
  );
}

export default function DocsMenuDropdownNavbarItem({
  mobile = false,
  ...props
}: Props): ReactNode | null {
  const Comp = mobile
    ? DocsMenuDropdownNavbarItemMobile
    : DocsMenuDropdownNavbarItemDesktop;
  return <Comp {...props} />;
}
