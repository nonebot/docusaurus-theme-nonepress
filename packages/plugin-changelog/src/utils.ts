type Section = { title: string; content: string } | null;

export function chunkArray<T>(array: Array<T>, size: number): Array<Array<T>> {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    const chunk = array.slice(i, i + size);
    result.push(chunk);
  }
  return result;
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

export function getChunkFilename(chunk: Section[]): string {
  const firstSectionTitle = chunk[0]!.title;

  return !firstSectionTitle.startsWith("v")
    ? "index.mdx"
    : `${chunk[0]!.title}.mdx`;
}

export function getChunkTitle(chunk: Section[]): string {
  return `${chunk[0]!.title}~${chunk[chunk.length - 1]!.title}`;
}
