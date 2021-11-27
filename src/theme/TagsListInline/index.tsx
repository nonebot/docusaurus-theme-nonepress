import React from "react";

import Tag from "@theme/Tag";
import type { Props } from "@theme/TagsListInline";

function TagsListInline({ tags }: Props): JSX.Element {
  return (
    <>
      <b>Tags:</b>
      <ul className={"inline p-0 ml-2"}>
        {tags.map(({ label, permalink: tagPermalink }) => (
          <li key={tagPermalink} className="inline-block mr-2 mb-2">
            <Tag name={label} permalink={tagPermalink} />
          </li>
        ))}
      </ul>
    </>
  );
}

export default TagsListInline;
