import { GlobalVersion, GlobalDoc } from "docusaurus-theme-nonepress/types";
import {
  LoadedVersion,
  DocMetadata,
} from "@docusaurus/plugin-content-docs/lib/types";

export function toGlobalDataDoc(doc: DocMetadata): GlobalDoc {
  return {
    title: doc.title,
    description: doc.description,
    permalink: doc.permalink,
    frontMatter: {
      options: doc.frontMatter.options,
    },
  };
}

export function toGlobalDataVersion(version: LoadedVersion): GlobalVersion {
  return {
    name: version.versionName,
    mainDocId: version.mainDocId,
    docs: version.docs.map(toGlobalDataDoc),
  };
}
