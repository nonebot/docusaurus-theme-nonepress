import React, { type ReactNode } from "react";

import {
  listTagsByLetters,
  type TagLetterEntry,
} from "@docusaurus/theme-common";

import Heading from "@theme/Heading";
import Tag from "@theme/Tag";
import type { Props } from "@theme/TagsListByLetter";

import "./styles.css";

function TagLetterEntryItem({ letterEntry }: { letterEntry: TagLetterEntry }) {
  return (
    <article>
      <Heading as="h2">{letterEntry.letter}</Heading>
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
