import React from "react";
import clsx from "clsx";

import LastUpdated from "@theme/LastUpdated";
import type { Props } from "@theme/DocItem";
import EditThisPage from "@theme/EditThisPage";
import TagsListInline, {
  Props as TagsListInlineProps,
} from "@theme/TagsListInline";

import { ThemeClassNames } from "@docusaurus/theme-common";

function TagsRow(props: TagsListInlineProps): JSX.Element {
  return (
    <div
      className={clsx(
        ThemeClassNames.docs.docFooterTagsRow,
        "flex flex-row flex-wrap -mx-4 mb-2"
      )}
    >
      <div className="flex-1 flex-shrink-0 ml-0 px-4 w-full max-w-full">
        <TagsListInline {...props} />
      </div>
    </div>
  );
}

type EditMetaRowProps = Pick<
  Props["content"]["metadata"],
  "editUrl" | "lastUpdatedAt" | "lastUpdatedBy" | "formattedLastUpdatedAt"
>;
function EditMetaRow({
  editUrl,
  lastUpdatedAt,
  lastUpdatedBy,
  formattedLastUpdatedAt,
}: EditMetaRowProps): JSX.Element {
  return (
    <div
      className={clsx(
        ThemeClassNames.docs.docFooterEditMetaRow,
        "flex flex-row flex-wrap -mx-4 mb-2"
      )}
    >
      <div className="lg:flex-1 flex-shrink-0 ml-0 px-4 w-full max-w-full">
        {editUrl && <EditThisPage editUrl={editUrl} />}
      </div>

      <div className="lg:flex-1 flex-shrink-0 ml-0 px-4 w-full max-w-full mt-1 italic text-[smaller] lg:text-right">
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

function DocItemFooter(props: Props): JSX.Element {
  const { content: DocContent } = props;
  const { metadata } = DocContent;
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
    return <></>;
  }

  return (
    <footer className={clsx(ThemeClassNames.docs.docFooter, "mt-12")}>
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

export default DocItemFooter;
