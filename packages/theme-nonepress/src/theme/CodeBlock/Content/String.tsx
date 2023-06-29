import React from "react";

import clsx from "clsx";

import { usePrismTheme } from "@docusaurus/theme-common";
import {
  parseCodeBlockTitle,
  parseLanguage,
  parseLines,
  containsLineNumbers,
  useCodeWordWrap,
} from "@docusaurus/theme-common/internal";
import Highlight, { defaultProps, type Language } from "prism-react-renderer";

import { useNonepressThemeConfig } from "@nullbot/docusaurus-theme-nonepress/client";
import Container from "@theme/CodeBlock/Container";
import type { Props } from "@theme/CodeBlock/Content/String";
import CopyButton from "@theme/CodeBlock/CopyButton";
import Line from "@theme/CodeBlock/Line";
import WordWrapButton from "@theme/CodeBlock/WordWrapButton";

export default function CodeBlockString({
  children,
  className: blockClassName = "",
  metastring,
  title: titleProp,
  showLineNumbers: showLineNumbersProp,
  language: languageProp,
}: Props): JSX.Element {
  const {
    prism: { defaultLanguage, magicComments },
  } = useNonepressThemeConfig();
  const language =
    languageProp ?? parseLanguage(blockClassName) ?? defaultLanguage;
  const prismTheme = usePrismTheme();
  const wordWrap = useCodeWordWrap();

  // We still parse the metastring in case we want to support more syntax in the
  // future. Note that MDX doesn't strip quotes when parsing metastring:
  // "title=\"xyz\"" => title: "\"xyz\""
  const title = parseCodeBlockTitle(metastring) || titleProp;

  const { lineClassNames, code } = parseLines(children, {
    metastring,
    language,
    magicComments,
  });
  const showLineNumbers =
    showLineNumbersProp ?? containsLineNumbers(metastring);

  return (
    <Highlight
      {...defaultProps}
      theme={prismTheme}
      code={code}
      language={(language ?? "text") as Language}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <Container
          className={clsx(
            blockClassName,
            language &&
              !blockClassName.includes(`language-${language}`) &&
              `language-${language}`,
          )}
        >
          {title && (
            <div className="code-block-title" style={style}>
              <div className="code-block-title-btn-group">
                <div className="code-block-title-btn code-block-title-btn-error"></div>
                <div className="code-block-title-btn code-block-title-btn-warning"></div>
                <div className="code-block-title-btn code-block-title-btn-success"></div>
              </div>
              <div className="code-block-title-content">{title}</div>
            </div>
          )}
          <div className="code-block-content">
            <pre
              tabIndex={0}
              ref={wordWrap.codeBlockRef}
              className={clsx(className, "code-block thin-scrollbar")}
              style={style}
            >
              <code
                className={clsx(
                  "code-block-lines",
                  showLineNumbers && "code-block-lines-with-number",
                )}
              >
                {tokens.map((line, i) => (
                  <Line
                    key={i}
                    line={line}
                    getLineProps={getLineProps}
                    getTokenProps={getTokenProps}
                    classNames={lineClassNames[i]}
                    showLineNumbers={showLineNumbers}
                  />
                ))}
              </code>
            </pre>
            <div className="code-block-btn-group">
              {(wordWrap.isEnabled || wordWrap.isCodeScrollable) && (
                <WordWrapButton
                  onClick={() => wordWrap.toggle()}
                  isEnabled={wordWrap.isEnabled}
                />
              )}
              <CopyButton code={code} />
            </div>
          </div>
        </Container>
      )}
    </Highlight>
  );
}
