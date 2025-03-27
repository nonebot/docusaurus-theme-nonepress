import React, { type ReactNode } from "react";

import clsx from "clsx";

import Translate from "@docusaurus/Translate";

import Tag from "@theme/Tag";
import type { Props } from "@theme/TagsListInline";

import "./styles.css";

export default function TagsListInline({ tags, className }: Props): ReactNode {
  return (
    <div className={clsx("doc-tags-list-container", className)}>
      <b>
        <Translate
          id="theme.tags.tagsListLabel"
          description="The label alongside a tag list"
        >
          Tags:
        </Translate>
      </b>
      <ul className="doc-tags-list">
        {tags.map((tag) => (
          <li key={tag.permalink}>
            <Tag {...tag} />
          </li>
        ))}
      </ul>
    </div>
  );
}
