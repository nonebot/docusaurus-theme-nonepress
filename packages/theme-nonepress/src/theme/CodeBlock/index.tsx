import clsx from "clsx";
import React, { useEffect, useState, useRef } from "react";

import "./styles.css";
import copy from "copy-text-to-clipboard";
import rangeParser from "parse-numeric-range";
import type { Props } from "@theme/CodeBlock";
import useThemeConfig from "@theme/hooks/useThemeConfig";
import usePrismTheme from "@theme/hooks/usePrismTheme";
import { parseCodeBlockTitle } from "@docusaurus/theme-common";
import Highlight, { defaultProps, Language } from "prism-react-renderer";

const highlightLinesRangeRegex = /{([\d,-]+)}/;

const HighlightLanguages = ["js", "jsBlock", "jsx", "python", "html"] as const;
type HighlightLanguage = typeof HighlightLanguages[number];

type HighlightLanguageConfig = {
  start: string;
  end: string;
};

// Supported types of highlight comments
const HighlightComments: Record<HighlightLanguage, HighlightLanguageConfig> = {
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

// Supported highlight directives
const HighlightDirectives = [
  "highlight-next-line",
  "highlight-start",
  "highlight-end",
];

const getHighlightDirectiveRegex = (
  languages: readonly HighlightLanguage[] = HighlightLanguages
) => {
  // to be more reliable, the opening and closing comment must match
  const commentPattern = languages
    .map((lang) => {
      const { start, end } = HighlightComments[lang];
      return `(?:${start}\\s*(${HighlightDirectives.join("|")})\\s*${end})`;
    })
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

function CodeBlock({
  title,
  children,
  metastring,
  className: blockClassName,
}: Props): JSX.Element {
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

  const languageClassName = blockClassName
    ?.split(" ")
    .find((str) => str.startsWith("language-"));
  let language = languageClassName?.replace(/language-/, "") as Language;

  if (!language && prism.defaultLanguage) {
    language = prism.defaultLanguage as Language;
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
            "text-left w-full max-w-full h-auto mb-5 rounded shadow-lg group overflow-hidden",
            blockClassName?.replace(/language-[^ ]+/, "")
          )}
        >
          {codeBlockTitle && (
            <div className="relative w-full p-2 text-sm" style={style}>
              <div className="absolute left-2">
                <div className="bg-red-600 inline-block h-2 w-2 rounded-full mr-1"></div>
                <div className="bg-yellow-500 inline-block h-2 w-2 rounded-full mr-1"></div>
                <div className="bg-green-500 inline-block h-2 w-2 rounded-full"></div>
              </div>
              <div className="w-full text-center inline-block">
                {codeBlockTitle}
              </div>
            </div>
          )}
          <div
            className={clsx(
              "relative m-0 w-full min-h-[90%] text-sm",
              language
            )}
          >
            <pre
              className={clsx(
                className,
                "p-4 !m-0 thin-scrollbar overflow-x-auto"
              )}
              style={style}
            >
              <code>
                {tokens.map((line, i) => {
                  if (line.length === 1 && line[0].content === "") {
                    line[0].content = "";
                  }

                  const lineProps = getLineProps({ line, key: i });

                  if (highlightLines.includes(i + 1)) {
                    lineProps.className +=
                      " -mx-4 px-4 docusaurus-highlight-code-line";
                  }

                  return (
                    <span key={i} {...lineProps}>
                      {line.map((token, key) => (
                        <span key={key} {...getTokenProps({ token, key })} />
                      ))}
                      <br />
                    </span>
                  );
                })}
              </code>
            </pre>

            <button
              ref={button}
              type="button"
              aria-label="Copy code to clipboard"
              className="absolute bg-black bg-opacity-30 rounded-md text-white right-2 top-2 transition-opacity cursor-pointer select-none px-2 py-1 opacity-0 group-hover:opacity-100 focus:opacity-100"
              onClick={handleCopyCode}
            >
              {showCopied ? "Copied" : "Copy"}
            </button>
          </div>
        </div>
      )}
    </Highlight>
  );
}

export default CodeBlock;
