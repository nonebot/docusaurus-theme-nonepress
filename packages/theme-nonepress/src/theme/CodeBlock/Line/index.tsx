import React, { type ReactNode } from "react";

import clsx from "clsx";

import type { Props } from "@theme/CodeBlock/Line";

// An empty line is a single token with a "\n" content: render it as an empty
// token instead, without mutating the token array Prism gave us
function fixLineBreak(line: Props["line"]): Props["line"] {
  if (line.length === 1 && line[0]!.content === "\n") {
    return [{ ...line[0]!, content: "" }];
  }
  return line;
}

export default function CodeBlockLine({
  line: lineProp,
  classNames,
  showLineNumbers,
  getLineProps,
  getTokenProps,
}: Props): ReactNode {
  const line = fixLineBreak(lineProp);

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
