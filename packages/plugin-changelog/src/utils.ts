const HEADER = `---
hide_table_of_contents: true
sidebar_custom_props:
  sidebar_id: examples
---

import DocPaginator from "@theme/DocPaginator"
`;

type Section = { title: string; content: string } | null;

export function chunkArray<T>(array: Array<T>, size: number): Array<Array<T>> {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    const chunk = array.slice(i, i + size);
    result.push(chunk);
  }
  return result;
}

function getPaginator(chunks: Section[][], prevIdx: number, nextIdx: number) {
  let content = '\n<DocPaginator className="not-prose"';
  if (prevIdx >= 0 && prevIdx < chunks.length) {
    const chunk = chunks?.[prevIdx]?.[0];
    if (chunk) {
      content += ` previous={{ title: "${chunk.title}", permalink: "/changelog/${chunk.title}" }}`;
    }
  }

  if (nextIdx >= 0 && nextIdx < chunks.length) {
    const chunk = chunks?.[nextIdx]?.[0];
    if (chunk) {
      content += ` next={{ title: "${chunk.title}", permalink: "/changelog/${chunk.title}" }}`;
    }
  }

  content += "/>";

  return content;
}

export function getChunkContent(
  chunks: Section[][],
  chunk: Section[],
  index: number,
): string {
  let finalContent = "";
  for (const section of chunk) {
    if (finalContent.length !== 0) {
      finalContent += "\n---\n";
    }
    finalContent += section!.content;
  }

  return HEADER + finalContent + getPaginator(chunks, index - 1, index + 1);
}

export function getChunkTitle(chunk: Section[]): string {
  const firstSectionTitle = chunk[0]!.title;

  return !firstSectionTitle.startsWith("v")
    ? "index.mdx"
    : `${chunk[0]!.title}.mdx`;
}
