import type { ComponentProps } from "react";
import type CodeBlock from "@theme/CodeBlock";

export type MDXComponentsObject = {
  readonly code: typeof CodeBlock;
  readonly a: (props: ComponentProps<"a">) => JSX.Element;
  readonly pre: typeof CodeBlock;
  readonly details: (props: ComponentProps<"details">) => JSX.Element;
  readonly h1: (props: ComponentProps<"h1">) => JSX.Element;
  readonly h2: (props: ComponentProps<"h2">) => JSX.Element;
  readonly h3: (props: ComponentProps<"h3">) => JSX.Element;
  readonly h4: (props: ComponentProps<"h4">) => JSX.Element;
  readonly h5: (props: ComponentProps<"h5">) => JSX.Element;
  readonly h6: (props: ComponentProps<"h6">) => JSX.Element;
};
