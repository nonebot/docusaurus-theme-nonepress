import clsx from "clsx";
import React from "react";
import { sortBy } from "lodash";

import Link from "@docusaurus/Link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDocsPreferredVersion } from "@docusaurus/theme-common";
import type { Props } from "@theme/NavbarItem/NavbarDocsMenuMobile";
import {
  useLatestVersion,
  useLoadedVersions,
  useActiveDocContext,
} from "@theme/hooks/useDocs";

function NavbarDocsMenuMobile(props: Props): JSX.Element {
  const { docId, label, icon, className, category } = props;

  const docsPluginId = undefined;
  const docsData = useLoadedVersions(docsPluginId);
  const activeDocContext = useActiveDocContext(docsPluginId);
  const latestVersion = useLatestVersion(docsPluginId);

  const { preferredVersion } = useDocsPreferredVersion(docsPluginId);

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
    const sortedDocs = sortBy(activeDocs, [
      (doc) => doc.frontMatter.options.menu.weight,
    ]);
    const docLinks = sortedDocs.map((doc) => ({
      title: doc.title,
      description: doc.description,
      to: doc.permalink,
    }));

    return docLinks;
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
  const toUrl = (docId && getDocInVersion().path) || (items && items[0]?.to);

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
