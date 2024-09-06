import fs from "fs-extra";
import path from "path";

import { chunkArray, getChunkContent, getChunkTitle } from "./utils";

import type { LoadContext, Plugin } from "@docusaurus/types";

function processSection(section: string) {
  const title = section
    .match(/\n## .*/)?.[0]
    .trim()
    .replace("## ", "");
  if (!title) {
    return null;
  }
  const content = section
    .replace(/\n## .*/, "")
    .trim()
    .replace("running_woman", "running");

  return {
    title: title.replace(/ \(.*\)/, ""),
    content: `
# ${title.replace(/ \(.*\)/, "")}

${content.replace(/###/g, "##")}
`,
  };
}

export default async function pluginChangelog(
  context: LoadContext,
): Promise<Plugin<void>> {
  const { siteDir } = context;
  const generateDir = path.join(siteDir, "src/pages/changelog");
  const changelogPath = path.join(siteDir, "src/changelog/changelog.md");

  const fileContent = await fs.readFile(changelogPath, "utf-8");
  const sections = fileContent
    .split(/(?=\n## )/)
    .map(processSection)
    .filter(Boolean);
  const chunks = chunkArray(sections, 10);
  await Promise.all(
    chunks.map((chunk, index) =>
      fs.outputFile(
        path.join(generateDir, getChunkTitle(chunk)),
        getChunkContent(chunks, chunk, index),
      ),
    ),
  );

  return {
    name: "docusaurus-plugin-changelog",
  };
}
