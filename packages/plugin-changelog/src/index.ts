import fs from "fs-extra";
import path from "path";

import { Joi } from "@docusaurus/utils-validation";

import {
  chunkArray,
  getChunkContent,
  getChunkFilename,
  getChunkTitle,
  getPaginator,
} from "./utils";

import type {
  LoadContext,
  OptionValidationContext,
  Plugin,
} from "@docusaurus/types";
import type { Options, PluginOptions } from "./options";
import type { ChangelogChunk } from "./types";

export const HEADER = ({
  extraHeader,
  chunkTitle,
}: {
  extraHeader: string;
  chunkTitle: string;
}): string => `---
${extraHeader}
---

import DocPaginator from "@theme/DocPaginator"

# ${chunkTitle}
`;

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
## ${title.replace(/ \(.*\)/, "")}

${content}
`,
  };
}

export async function getChangelogItems(
  changelogPath: string,
  changelogPerPage: number,
): Promise<ChangelogChunk> {
  const fileContent = await fs.readFile(changelogPath, "utf-8");
  const sections = fileContent
    .split(/(?=\n## )/)
    .map(processSection)
    .filter(Boolean);
  const chunks = chunkArray(sections, changelogPerPage);

  return chunks;
}

export function getChangelogItemsSync(
  changelogPath: string,
  changelogPerPage: number,
): ChangelogChunk {
  // eslint-disable-next-line no-restricted-properties
  const fileContent = fs.readFileSync(changelogPath, "utf-8");
  const sections = fileContent
    .split(/(?=\n## )/)
    .map(processSection)
    .filter(Boolean);
  const chunks = chunkArray(sections, changelogPerPage);

  return chunks;
}

export default async function pluginChangelog(
  context: LoadContext,
  options: PluginOptions,
): Promise<Plugin<void>> {
  const { siteDir } = context;
  const generateDir = path.join(siteDir, options.changelogDestPath);
  const changelogPath = path.join(siteDir, options.changelogPath);

  const chunks = await getChangelogItems(
    changelogPath,
    options.changelogPerPage,
  );
  await Promise.all(
    chunks.map((chunk, index) =>
      fs.outputFile(
        path.join(generateDir, getChunkFilename(index)),
        getChunkContent(
          chunk,
          HEADER({
            extraHeader: options.changelogHeader,
            chunkTitle: getChunkTitle(chunk),
          }),
        ) + getPaginator(chunks, index - 1, index + 1),
      ),
    ),
  );

  return {
    name: "docusaurus-plugin-changelog",
  };
}

const pluginOptionsSchema = Joi.object<PluginOptions>({
  changelogPath: Joi.string().default("src/changelog/changelog.md"),
  changelogDestPath: Joi.string().default("src/pages/changelog"),
  changelogHeader: Joi.string().default(""),
  changelogPerPage: Joi.number().default(10),
  changelogSidebarID: Joi.string().default("changelog"),
});

export function validateOptions({
  validate,
  options,
}: OptionValidationContext<Options, PluginOptions>): PluginOptions {
  return validate(pluginOptionsSchema, options);
}

export type { ChangelogChunk, Options, PluginOptions };
