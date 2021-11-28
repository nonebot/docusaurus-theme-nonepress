import clsx from "clsx";
import React from "react";

import Link from "@docusaurus/Link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDocsPreferredVersion } from "@docusaurus/theme-common";
import type { Props } from "@theme/NavbarItem/NavbarDocLinkMobile";
import { useLatestVersion, useActiveDocContext } from "@theme/hooks/useDocs";

function NavbarLinkMobile(props: Props): JSX.Element {
  const { docId, label, icon, className, linkClassName } = props;

  const docsPluginId = undefined;
  const { activeVersion } = useActiveDocContext(docsPluginId);
  const { preferredVersion } = useDocsPreferredVersion(docsPluginId);
  const latestVersion = useLatestVersion(docsPluginId);

  const dropdownVersion = activeVersion ?? preferredVersion ?? latestVersion;

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

  const toUrl = docId && getDocInVersion().path;

  return (
    <li className={className}>
      <Link
        to={toUrl}
        className={
          linkClassName ||
          clsx(
            "block px-3 py-3 rounded-md hover:bg-light-nonepress-200 dark:hover:bg-dark-nonepress-200 dark:hover:opacity-100",
            !label ? "text-2xl" : "text-base font-medium uppercase"
          )
        }
      >
        {icon && <FontAwesomeIcon className="mr-2 align-middle" icon={icon} />}
        <span className="truncate">{label}</span>
      </Link>
    </li>
  );
}

export default NavbarLinkMobile;
