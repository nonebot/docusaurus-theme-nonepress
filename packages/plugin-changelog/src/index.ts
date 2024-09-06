import fs from "fs-extra";
import path from "path";

import { Joi } from "@docusaurus/utils-validation";

import { chunkArray, getChunkContent, getChunkTitle } from "./utils";

import type {
  LoadContext,
  OptionValidationContext,
  Plugin,
} from "@docusaurus/types";
import type { Options, PluginOptions } from "./options";

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
  options: PluginOptions,
): Promise<Plugin<void>> {
  const { siteDir } = context;
  const generateDir = path.join(siteDir, "src/pages/changelog");
  const changelogPath = path.join(siteDir, options.changelogPath);

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

const pluginOptionsSchema = Joi.object<PluginOptions>({
  changelogPath: Joi.string().default("src/changelog/changelog.md"),
});

export function validateOptions({
  validate,
  options,
}: OptionValidationContext<Options, PluginOptions>): PluginOptions {
  return validate(pluginOptionsSchema, options);
}

export type { Options, PluginOptions };
