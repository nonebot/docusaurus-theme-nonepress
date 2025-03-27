import React, { type ReactNode } from "react";

import Container from "@theme/CodeBlock/Container";
import type { Props } from "@theme/CodeBlock/Content/Element";

export default function CodeBlockJSX({
  children,
  className,
}: Props): ReactNode {
  return (
    <Container as="pre" tabIndex={0} className={className}>
      {children}
    </Container>
  );
}
