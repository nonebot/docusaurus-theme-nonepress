import React from "react";

import clsx from "clsx";

import Link from "@docusaurus/Link";
import Translate from "@docusaurus/Translate";
import {
  type GlobalVersion,
  useActiveDocContext,
} from "@docusaurus/plugin-content-docs/client";
import { useDocsPreferredVersion } from "@docusaurus/theme-common";

import {
  useDocsMenuCategory,
  useDocsMenuVersions,
} from "@nullbot/docusaurus-theme-nonepress/client";
import IconDropdown from "@theme/Icon/Dropdown";
import DefaultNavbarItem from "@theme/NavbarItem/DefaultNavbarItem";
import type {
  Props,
  DesktopOrMobileNavBarItemProps,
} from "@theme/NavbarItem/DocsMenuDropdownNavbarItem";

const getVersionMainDoc = (version: GlobalVersion) =>
  version.docs.find((doc) => doc.id === version.mainDocId)!;

function DocsMenuDropdownNavbarItemDesktop({
  label,
  children,
  className,
  activeClassName,
  docId,
  category,
  docsPluginId,
  ...props
}: DesktopOrMobileNavBarItemProps): JSX.Element {
  const { link, docs } = useDocsMenuCategory(category, docId, docsPluginId);
  const versions = useDocsMenuVersions(docsPluginId);
  const activeDocContext = useActiveDocContext(docsPluginId);
  const { savePreferredVersionName } = useDocsPreferredVersion(docsPluginId);

  // category has no docs
  if (!docs) {
    return (
      <DefaultNavbarItem
        {...props}
        isActive={() => activeDocContext.activeDoc?.path === link}
        label={label ?? category}
        to={link}
      />
    );
  }

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
        className={clsx("menu-link menu-item", className)}
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
              <h4 className="navbar-docs-menu-version-link-title">
                {versionInfo.latest.label}
                <span className="navbar-docs-menu-version-link-badge navbar-docs-menu-version-link-badge-stable">
                  <Translate
                    id="theme.docsMenu.stableVersion.branchName"
                    description="The branch name used for the stable version link in the docs menu."
                  >
                    Stable
                  </Translate>
                </span>
              </h4>
              <span className="navbar-docs-menu-version-link-description">
                {stableInfo}
              </span>
            </Link>
            <Link
              to={versionInfo.next.to}
              onClick={versionInfo.next.onClick}
              className="navbar-docs-menu-version-link"
            >
              <h4 className="navbar-docs-menu-version-link-title">
                {versionInfo.next.label}
                <span className="navbar-docs-menu-version-link-badge navbar-docs-menu-version-link-badge-next">
                  <Translate
                    id="theme.docsMenu.nextVersion.branchName"
                    description="The branch name used for the next version link in the docs menu."
                  >
                    Development
                  </Translate>
                </span>
              </h4>
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
}: DesktopOrMobileNavBarItemProps): JSX.Element {
  const { activeDoc } = useActiveDocContext(docsPluginId);
  const { link, autoLink } = useDocsMenuCategory(category, docId, docsPluginId);

  return (
    <DefaultNavbarItem
      {...props}
      isActive={() => activeDoc?.path === link}
      label={label ?? category}
      to={link ?? autoLink}
    />
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
