import React from "react";

import clsx from "clsx";

import type { Props } from "@theme/CodeBlock/Line";

export default function CodeBlockLine({
  line,
  classNames,
  showLineNumbers,
  getLineProps,
  getTokenProps,
}: Props): JSX.Element {
  if (line.length === 1 && line[0]!.content === "\n") {
    line[0]!.content = "";
  }

  const lineProps = getLineProps({
    line,
    className: clsx(
      classNames,
      "code-block-line",
      showLineNumbers && "code-block-line-with-number",
    ),
  });

  const lineTokens = line.map((token, key) => (
    <span key={key} {...getTokenProps({ token })} />
  ));

  return (
    <span {...lineProps}>
      {showLineNumbers ? (
        <>
          <span className="code-block-line-number" />
          <span className="code-block-line-content">{lineTokens}</span>
        </>
      ) : (
        lineTokens
      )}
      <br />
    </span>
  );
}
