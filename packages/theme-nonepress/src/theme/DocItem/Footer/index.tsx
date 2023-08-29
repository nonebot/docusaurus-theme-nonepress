import React from "react";

import clsx from "clsx";

import { ThemeClassNames } from "@docusaurus/theme-common";
import {
  useDoc,
  type DocContextValue,
} from "@docusaurus/theme-common/internal";

import EditThisPage from "@theme/EditThisPage";
import LastUpdated from "@theme/LastUpdated";
import TagsListInline, {
  type Props as TagsListInlineProps,
} from "@theme/TagsListInline";

function TagsRow(props: TagsListInlineProps) {
  return (
    <TagsListInline
      className={clsx(
        ThemeClassNames.docs.docFooterTagsRow,
        "doc-footer-tags-row",
      )}
      {...props}
    />
  );
}

type EditMetaRowProps = Pick<
  DocContextValue["metadata"],
  "editUrl" | "lastUpdatedAt" | "lastUpdatedBy" | "formattedLastUpdatedAt"
>;

function EditMetaRow({
  editUrl,
  lastUpdatedAt,
  lastUpdatedBy,
  formattedLastUpdatedAt,
}: EditMetaRowProps) {
  return (
    <div
      className={clsx(
        ThemeClassNames.docs.docFooterEditMetaRow,
        "doc-footer-edit-meta-row",
      )}
    >
      <div>{editUrl && <EditThisPage editUrl={editUrl} />}</div>
      <div>
        {(lastUpdatedAt || lastUpdatedBy) && (
          <LastUpdated
            lastUpdatedAt={lastUpdatedAt}
            formattedLastUpdatedAt={formattedLastUpdatedAt}
            lastUpdatedBy={lastUpdatedBy}
          />
        )}
      </div>
    </div>
  );
}

export default function DocItemFooter(): JSX.Element | null {
  const { metadata } = useDoc();
  const {
    editUrl,
    lastUpdatedAt,
    formattedLastUpdatedAt,
    lastUpdatedBy,
    tags,
  } = metadata;

  const canDisplayTagsRow = tags.length > 0;
  const canDisplayEditMetaRow = !!(editUrl || lastUpdatedAt || lastUpdatedBy);

  const canDisplayFooter = canDisplayTagsRow || canDisplayEditMetaRow;

  if (!canDisplayFooter) {
    return null;
  }

  return (
    <footer className={clsx(ThemeClassNames.docs.docFooter, "doc-footer")}>
      {canDisplayTagsRow && <TagsRow tags={tags} />}
      {canDisplayEditMetaRow && (
        <EditMetaRow
          editUrl={editUrl}
          lastUpdatedAt={lastUpdatedAt}
          lastUpdatedBy={lastUpdatedBy}
          formattedLastUpdatedAt={formattedLastUpdatedAt}
        />
      )}
    </footer>
  );
}
