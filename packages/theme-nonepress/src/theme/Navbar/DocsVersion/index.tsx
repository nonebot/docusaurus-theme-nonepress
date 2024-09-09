import React from "react";

import {
  useActiveDocContext,
  useDocsPreferredVersion,
  useDocsVersionCandidates,
  useVersions,
  type GlobalVersion,
} from "@docusaurus/plugin-content-docs/client";
import { useLocation } from "@docusaurus/router";

import IconDropdown from "@theme/Icon/Dropdown";
import Menu from "@theme/Menu";
import type { Props } from "@theme/Navbar/DocsVersion";
import type { LinkLikeNavbarItemProps } from "@theme/NavbarItem";
import NavbarItem from "@theme/NavbarItem";

import "./styles.css";

const getVersionMainDoc = (version: GlobalVersion) =>
  version.docs.find((doc) => doc.id === version.mainDocId)!;

export default function NavbarDocsVersion({
  docsPluginId,
  dropdownItemsBefore,
  dropdownItemsAfter,
}: Props): JSX.Element {
  const dropdownVersion = useDocsVersionCandidates(docsPluginId)[0];
  const dropdownLabel = dropdownVersion.label;

  const { search, hash } = useLocation();
  const activeDocContext = useActiveDocContext(docsPluginId);
  const versions = useVersions(docsPluginId);
  const { savePreferredVersionName } = useDocsPreferredVersion(docsPluginId);
  const versionLinks: LinkLikeNavbarItemProps[] = versions.map((version) => {
    // We try to link to the same doc, in another version
    // When not possible, fallback to the "main doc" of the version
    const versionDoc =
      activeDocContext.alternateDocVersions[version.name] ??
      getVersionMainDoc(version);
    return {
      label: (
        <>
          <span className="navbar-version-name">{version.label}</span>
          <span className="navbar-version-badge" />
        </>
      ),
      className: "navbar-version-link",
      activeClassName: "version-active",
      // preserve ?search#hash suffix on version switches
      to: `${versionDoc.path}${search}${hash}`,
      // current active version or fallback to preferred/default version
      isActive: () =>
        version === (activeDocContext.activeVersion ?? dropdownVersion),
      onClick: () => savePreferredVersionName(version.name),
    };
  });
  const items = [
    ...dropdownItemsBefore,
    ...versionLinks,
    ...dropdownItemsAfter,
  ];

  return (
    <div className="navbar-version dropdown">
      <label tabIndex={0} className="navbar-version-label">
        {dropdownLabel}
        <IconDropdown className="navbar-version-label-icon" />
      </label>
      <Menu tabIndex={0} className="navbar-version-content dropdown-content">
        {items.map((item, i) => (
          <NavbarItem key={i} {...item} />
        ))}
      </Menu>
    </div>
  );
}
