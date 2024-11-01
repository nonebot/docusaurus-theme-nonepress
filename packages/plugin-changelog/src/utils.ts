import type { Section } from "./types";

export function chunkArray<T>(array: Array<T>, size: number): Array<Array<T>> {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    const chunk = array.slice(i, i + size);
    result.push(chunk);
  }
  return result;
}

export function getPaginator(
  chunks: Section[][],
  prevIdx: number,
  nextIdx: number,
): string {
  let content = '\n<DocPaginator className="not-prose"';
  if (prevIdx >= 0 && prevIdx < chunks.length) {
    const chunk = chunks?.[prevIdx]?.[0];
    if (chunk) {
      const href = prevIdx > 0 ? prevIdx.toString() : "";
      content += ` previous={{ title: "${chunk.title}", permalink: "/changelog/${href}" }}`;
    }
  }

  if (nextIdx >= 0 && nextIdx < chunks.length) {
    const chunk = chunks?.[nextIdx]?.[0];
    if (chunk) {
      const href = nextIdx > 0 ? nextIdx.toString() : "";
      content += ` next={{ title: "${chunk.title}", permalink: "/changelog/${href}" }}`;
    }
  }

  content += "/>";

  return content;
}

export function getChunkContent(chunk: Section[], header: string): string {
  let finalContent = "";
  for (const section of chunk) {
    if (finalContent.length !== 0) {
      finalContent += "\n---\n";
    }
    finalContent += section!.content;
  }

  return header + finalContent;
}

export function getChunkFilename(index: number): string {
  return index > 0 ? `${index}.mdx` : "index.mdx";
}

export function getChunkTitle(chunk: Section[]): string {
  return `${chunk[0]!.title}~${chunk[chunk.length - 1]!.title}`;
}
