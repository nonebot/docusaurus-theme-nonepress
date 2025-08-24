import React, { type ReactNode } from "react";

import clsx from "clsx";

import { useDoc } from "@docusaurus/plugin-content-docs/client";
import { ThemeClassNames } from "@docusaurus/theme-common";

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

type EditMetaRowProps = {
  readonly editUrl: string | null | undefined;
  readonly lastUpdatedAt: number | undefined;
  readonly lastUpdatedBy: string | undefined;
};

function EditMetaRow({
  editUrl,
  lastUpdatedAt,
  lastUpdatedBy,
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
            lastUpdatedBy={lastUpdatedBy}
          />
        )}
      </div>
    </div>
  );
}

export default function DocItemFooter(): ReactNode | null {
  const { metadata } = useDoc();
  const { editUrl, lastUpdatedAt, lastUpdatedBy, tags } = metadata;

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
          lastUpdatedAt={lastUpdatedAt!}
          lastUpdatedBy={lastUpdatedBy!}
        />
      )}
    </footer>
  );
}
