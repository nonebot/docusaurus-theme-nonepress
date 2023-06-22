import React from "react";

import Link from "@docusaurus/Link";
import type { GlobalVersion } from "@docusaurus/plugin-content-docs/client";
import {
  useVersions,
  useActiveDocContext,
} from "@docusaurus/plugin-content-docs/client";
import { useLocation } from "@docusaurus/router";
import { useDocsPreferredVersion } from "@docusaurus/theme-common";
import { useDocsVersionCandidates } from "@docusaurus/theme-common/internal";

import type { Props } from "@theme/Navbar/DocsVersion";
import type { LinkLikeNavbarItemProps } from "@theme/NavbarItem";

const getVersionMainDoc = (version: GlobalVersion) =>
  version.docs.find((doc) => doc.id === version.mainDocId);

export default function DocsVersion({
  docsPluginId,
  dropdownItemsBefore,
  dropdownItemsAfter,
}: Props): JSX.Element {
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
      label: version.label,
      // preserve ?search#hash suffix on version switches
      to: `${versionDoc.path}${search}${hash}`,
      isActive: () => version === activeDocContext.activeVersion,
      onClick: () => savePreferredVersionName(version.name),
    };
  });
  const items: LinkLikeNavbarItemProps[] = [
    ...dropdownItemsBefore,
    ...versionLinks,
    ...dropdownItemsAfter,
  ];

  const dropdownVersion = useDocsVersionCandidates(docsPluginId)[0];
  const dropdownLabel = dropdownVersion.label;

  return (
    <div className="dropdown">
      <label tabIndex={0} className="btn btn-sm no-animation">
        {dropdownLabel}
      </label>
      <ul tabIndex={0} className="dropdown-content z-10 bg-base-100 shadow">
        {items.map((item, index) => (
          <li key={index} className="cursor-default select-none relative">
            <Link
              to={item.to}
              onClick={item.onClick}
              isActive={item.isActive}
              isNavLink={item.isNavLink}
              activeClassName=""
              className="relative flex justify-end items-center content-center transition py-2 pl-7 rounded duration-300 hover:bg-base-300"
            >
              <span aria-label="Selected" className=""></span>
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
