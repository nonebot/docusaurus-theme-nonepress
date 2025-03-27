import React, { type ReactNode } from "react";

import {
  listTagsByLetters,
  type TagLetterEntry,
} from "@docusaurus/theme-common";

import "./styles.css";

import Tag from "@theme/Tag";
import type { Props } from "@theme/TagsListByLetter";

function TagLetterEntryItem({ letterEntry }: { letterEntry: TagLetterEntry }) {
  return (
    <article>
      <h2>{letterEntry.letter}</h2>
      <ul>
        {letterEntry.tags.map((tag) => (
          <li key={tag.permalink} className="tags-list-item">
            <Tag {...tag} />
          </li>
        ))}
      </ul>
      <hr />
    </article>
  );
}

export default function TagsListByLetter({ tags }: Props): ReactNode {
  const letterList = listTagsByLetters(tags);
  return (
    <section>
      {letterList.map((letterEntry) => (
        <TagLetterEntryItem
          key={letterEntry.letter}
          letterEntry={letterEntry}
        />
      ))}
    </section>
  );
}
