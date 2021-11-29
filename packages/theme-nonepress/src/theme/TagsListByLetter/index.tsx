import React from "react";

import Tag from "@theme/Tag";
import type { Props } from "@theme/TagsListByLetter";
import { listTagsByLetters, TagLetterEntry } from "@docusaurus/theme-common";

function TagLetterEntryItem({ letterEntry }: { letterEntry: TagLetterEntry }) {
  return (
    <article>
      <h2>{letterEntry.letter}</h2>
      <ul className="p-0">
        {letterEntry.tags.map((tag) => (
          <li key={tag.permalink} className="inline-block mt-2 mr-2 ml-4">
            <Tag {...tag} />
          </li>
        ))}
      </ul>
      <hr />
    </article>
  );
}

function TagsListByLetter({ tags }: Props): JSX.Element {
  const letterList = listTagsByLetters(tags);
  return (
    <section className="my-8">
      {letterList.map((letterEntry) => (
        <TagLetterEntryItem
          key={letterEntry.letter}
          letterEntry={letterEntry}
        />
      ))}
    </section>
  );
}

export default TagsListByLetter;
