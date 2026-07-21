import React, { type ReactNode } from "react";

import clsx from "clsx";

import BrowserOnly from "@docusaurus/BrowserOnly";
import { usePrismTheme } from "@docusaurus/theme-common";
import {
  type CodeBlockMetadata,
  createCodeBlockMetadata,
  useCodeWordWrap,
} from "@docusaurus/theme-common/internal";
import { useNonepressThemeConfig } from "@nullbot/docusaurus-theme-nonepress/client";
import { Highlight, type Language } from "prism-react-renderer";

import Container from "@theme/CodeBlock/Container";
import type { Props } from "@theme/CodeBlock/Content/String";
import CopyButton from "@theme/CodeBlock/CopyButton";
import Line from "@theme/CodeBlock/Line";
import WordWrapButton from "@theme/CodeBlock/WordWrapButton";

function useCodeBlockMetadata(props: Props): CodeBlockMetadata {
  const {
    prism: { defaultLanguage, magicComments },
  } = useNonepressThemeConfig();
  return createCodeBlockMetadata({
    code: props.children,
    className: props.className,
    metastring: props.metastring,
    magicComments,
    defaultLanguage,
    language: props.language,
    title: props.title,
    showLineNumbers: props.showLineNumbers,
  });
}

export default function CodeBlockString(props: Props): ReactNode {
  const metadata = useCodeBlockMetadata(props);
  const { code, language, title, lineClassNames, lineNumbersStart } = metadata;
  const prismTheme = usePrismTheme();
  const wordWrap = useCodeWordWrap();
  const showLineNumbers = lineNumbersStart !== undefined;

  return (
    <Container as="div" className={metadata.className}>
      {title && (
        <div className="code-block-title">
          <div className="code-block-title-btn-group">
            <div className="code-block-title-btn code-block-title-btn-error" />
            <div className="code-block-title-btn code-block-title-btn-warning" />
            <div className="code-block-title-btn code-block-title-btn-success" />
          </div>
          <div className="code-block-title-content">{title}</div>
        </div>
      )}
      <div className="code-block-wrapper">
        <Highlight
          theme={prismTheme}
          code={code}
          language={language as Language}
        >
          {({ className, tokens, getLineProps, getTokenProps }) => (
            <pre
              // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
              tabIndex={0}
              ref={wordWrap.codeBlockRef}
              className={clsx(className, "code-block-content thin-scrollbar")}
            >
              <code
                className={clsx(
                  "code-block-lines",
                  showLineNumbers && "code-block-lines-with-number",
                )}
                style={{
                  counterReset:
                    lineNumbersStart === undefined
                      ? undefined
                      : `line ${lineNumbersStart - 1}`,
                }}
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
          )}
        </Highlight>
        {/* Code block buttons are not server-rendered on purpose: adding them
            to the initial HTML is useless and expensive, and they require
            React to become interactive anyway */}
        <BrowserOnly>
          {() => (
            <div className="code-block-btn-group">
              {(wordWrap.isEnabled || wordWrap.isCodeScrollable) && (
                <WordWrapButton
                  onClick={() => wordWrap.toggle()}
                  isEnabled={wordWrap.isEnabled}
                />
              )}
              <CopyButton code={code} />
            </div>
          )}
        </BrowserOnly>
      </div>
    </Container>
  );
}
