import clsx from "clsx";
import React, { PropsWithChildren, useEffect, useState, useRef } from "react";

import copy from "copy-text-to-clipboard";
import rangeParser from "parse-numeric-range";
import useThemeConfig from "../../useThemeConfig";
import usePrismTheme from "@theme/hooks/usePrismTheme";
import { parseCodeBlockTitle } from "@docusaurus/theme-common";
import Highlight, { defaultProps, Language } from "prism-react-renderer";

const highlightLinesRangeRegex = /{([\d,-]+)}/;
const getHighlightDirectiveRegex = (
  languages = ["js", "jsBlock", "jsx", "python", "html"]
) => {
  // supported types of comments
  const comments = {
    js: {
      start: "\\/\\/",
      end: "",
    },
    jsBlock: {
      start: "\\/\\*",
      end: "\\*\\/",
    },
    jsx: {
      start: "\\{\\s*\\/\\*",
      end: "\\*\\/\\s*\\}",
    },
    python: {
      start: "#",
      end: "",
    },
    html: {
      start: "<!--",
      end: "-->",
    },
  };
  // supported directives
  const directives = [
    "highlight-next-line",
    "highlight-start",
    "highlight-end",
  ].join("|");
  // to be more reliable, the opening and closing comment must match
  const commentPattern = languages
    .map(
      (lang) =>
        `(?:${comments[lang].start}\\s*(${directives})\\s*${comments[lang].end})`
    )
    .join("|");
  // white space is allowed, but otherwise it should be on it's own line
  return new RegExp(`^\\s*(?:${commentPattern})\\s*$`);
};
// select comment styles based on language
const highlightDirectiveRegex = (lang: string) => {
  switch (lang) {
    case "js":
    case "javascript":
    case "ts":
    case "typescript":
      return getHighlightDirectiveRegex(["js", "jsBlock"]);

    case "jsx":
    case "tsx":
      return getHighlightDirectiveRegex(["js", "jsBlock", "jsx"]);

    case "html":
      return getHighlightDirectiveRegex(["js", "jsBlock", "html"]);

    case "python":
    case "py":
      return getHighlightDirectiveRegex(["python"]);

    default:
      // all comment types
      return getHighlightDirectiveRegex();
  }
};

export default function CodeBlock(
  props: PropsWithChildren<{
    title?: string;
    metastring?: string;
    className?: string;
    languageClassName?: string;
  }>
): JSX.Element {
  const {
    children,
    className: containerClassName,
    languageClassName,
    metastring,
    title,
  } = props;
  const { prism } = useThemeConfig();

  const [showCopied, setShowCopied] = useState(false);

  // force re-render highlight
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const codeBlockTitle = parseCodeBlockTitle(metastring) || title;

  const button = useRef(null);
  let highlightLines: number[] = [];

  const prismTheme = usePrismTheme();

  // In case interleaved Markdown (e.g. when using CodeBlock as standalone component).
  const content = Array.isArray(children)
    ? children.join("")
    : (children as string);

  if (metastring && highlightLinesRangeRegex.test(metastring)) {
    // Tested above
    const highlightLinesRange = metastring.match(highlightLinesRangeRegex)![1];
    highlightLines = rangeParser(highlightLinesRange).filter((n) => n > 0);
  }

  let language =
    languageClassName &&
    (languageClassName.replace(/language-/, "") as Language as any);

  if (!language && prism.defaultLanguage) {
    language = prism.defaultLanguage;
  }

  // only declaration OR directive highlight can be used for a block
  let code = content.replace(/\n$/, "");
  if (highlightLines.length === 0 && language !== undefined) {
    let range = "";
    const directiveRegex = highlightDirectiveRegex(language);
    // go through line by line
    const lines = content.replace(/\n$/, "").split("\n");
    let blockStart: number;
    // loop through lines
    for (let index = 0; index < lines.length; ) {
      const line = lines[index];
      // adjust for 0-index
      const lineNumber = index + 1;
      const match = line.match(directiveRegex);
      if (match !== null) {
        const directive = match
          .slice(1)
          .reduce(
            (final: string | undefined, item) => final || item,
            undefined
          );
        switch (directive) {
          case "highlight-next-line":
            range += `${lineNumber},`;
            break;

          case "highlight-start":
            blockStart = lineNumber;
            break;

          case "highlight-end":
            range += `${blockStart!}-${lineNumber - 1},`;
            break;

          default:
            break;
        }
        lines.splice(index, 1);
      } else {
        // lines without directives are unchanged
        index += 1;
      }
    }
    highlightLines = rangeParser(range);
    code = lines.join("\n");
  }

  const handleCopyCode = () => {
    copy(code);
    setShowCopied(true);

    setTimeout(() => setShowCopied(false), 2000);
  };

  return (
    <Highlight
      {...defaultProps}
      key={String(mounted)}
      theme={prismTheme}
      code={code}
      language={language}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <div
          className={clsx(
            "text-left w-full max-w-full h-auto mb-5 shadow-lg",
            containerClassName
          )}
        >
          <div className="relative w-full p-2" style={style}>
            <div className="absolute left-1">
              <div className="bg-red-600 inline-block h-2 w-2 rounded-full mr-1"></div>
              <div className="bg-yellow-500 inline-block h-2 w-2 rounded-full mr-1"></div>
              <div className="bg-green-500 inline-block h-2 w-2 rounded-full"></div>
            </div>
            {codeBlockTitle && (
              <div className="w-full text-center">{codeBlockTitle}</div>
            )}
          </div>
        </div>
      )}
    </Highlight>
  );
}
