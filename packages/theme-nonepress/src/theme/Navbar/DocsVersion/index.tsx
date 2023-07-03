import React from "react";

import type { GlobalVersion } from "@docusaurus/plugin-content-docs/client";
import {
  useVersions,
  useActiveDocContext,
} from "@docusaurus/plugin-content-docs/client";
import { useLocation } from "@docusaurus/router";
import { useDocsPreferredVersion } from "@docusaurus/theme-common";
import { useDocsVersionCandidates } from "@docusaurus/theme-common/internal";

import IconDropdown from "@theme/Icon/Dropdown";
import type { Props } from "@theme/Navbar/DocsVersion";
import NavbarItem from "@theme/NavbarItem";
import type { LinkLikeNavbarItemProps } from "@theme/NavbarItem";

const getVersionMainDoc = (version: GlobalVersion) =>
  version.docs.find((doc) => doc.id === version.mainDocId)!;

export default function DocsVersion({
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
  const versionLinks = versions.map((version) => {
    // We try to link to the same doc, in another version
    // When not possible, fallback to the "main doc" of the version
    const versionDoc =
      activeDocContext.alternateDocVersions[version.name] ??
      getVersionMainDoc(version);
    return {
      label: (
        <>
          <span className="navbar-version-name">{version.label}</span>
          <span className="navbar-version-badge"></span>
        </>
      ),
      // preserve ?search#hash suffix on version switches
      to: `${versionDoc.path}${search}${hash}`,
      // current active version or fallback to preferred/default version
      isActive: () =>
        version === (activeDocContext.activeVersion ?? dropdownVersion),
      onClick: () => savePreferredVersionName(version.name),
    };
  });
  const items: LinkLikeNavbarItemProps[] = [
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
      <ul tabIndex={0} className="navbar-version-content dropdown-content">
        {items.map((item, index) => (
          <NavbarItem
            key={index}
            isDropdownItem
            activeClassName="version-active"
            className="navbar-version-link"
            {...item}
          />
        ))}
      </ul>
    </div>
  );
}
