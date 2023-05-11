import React from "react";

import Container from "@theme/CodeBlock/Container";
import type { Props } from "@theme/CodeBlock/Content/Element";

export default function CodeBlockJSX({
  children,
  className,
}: Props): JSX.Element {
  return (
    <Container tabIndex={0} className={className}>
      {children}
    </Container>
  );
}
