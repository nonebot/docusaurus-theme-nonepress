import React from "react";

import Translate from "@docusaurus/Translate";

import Tag from "@theme/Tag";
import type { Props } from "@theme/TagsListInline";

export default function TagsListInline({ tags }: Props): JSX.Element {
  return (
    <>
      <b>
        <Translate
          id="theme.tags.tagsListLabel"
          description="The label alongside a tag list"
        >
          Tags:
        </Translate>
      </b>
      <ul className="inline p-0 ml-2">
        {tags.map(({ label, permalink: tagPermalink }) => (
          <li key={tagPermalink} className="inline-block mr-2 mb-2">
            <Tag label={label} permalink={tagPermalink} />
          </li>
        ))}
      </ul>
    </>
  );
}
