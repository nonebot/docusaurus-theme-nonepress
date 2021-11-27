import clsx from "clsx";
import React from "react";

import Link from "@docusaurus/Link";
import { useDocsPreferredVersion } from "@docusaurus/theme-common";
import type { Props } from "@theme/NavbarItem/NavbarDocsMenuMobile";
import { useLatestVersion, useActiveDocContext } from "@theme/hooks/useDocs";
import {
  GlobalDoc,
  GlobalVersion,
} from "@docusaurus/plugin-content-docs/lib/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function getVersionMainDoc(version: GlobalVersion): GlobalDoc {
  return version.docs.find((doc) => doc.id === version.mainDocId);
}

function NavbarDocsMenuMobile(props: Props): JSX.Element {
  const { label, icon, className } = props;

  const docsPluginId = undefined;
  const activeDocContext = useActiveDocContext(docsPluginId);
  const latestVersion = useLatestVersion(docsPluginId);

  const { preferredVersion } = useDocsPreferredVersion(docsPluginId);

  const dropdownVersion =
    activeDocContext.activeVersion ?? preferredVersion ?? latestVersion;

  const toUrl = getVersionMainDoc(dropdownVersion).path;

  return (
    <li className={className}>
      <Link
        to={toUrl}
        className={clsx(
          "block px-3 py-3 rounded-md hover:bg-light-nonepress-200 dark:hover:bg-dark-nonepress-200 dark:hover:opacity-100",
          !label ? "text-2xl" : "text-base font-medium uppercase"
        )}
      >
        {icon && <FontAwesomeIcon className="mr-2 align-middle" icon={icon} />}
        <span className="truncate">{label}</span>
      </Link>
    </li>
  );
}

export default NavbarDocsMenuMobile;
