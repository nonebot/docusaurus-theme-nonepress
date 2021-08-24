import React, { ComponentProps, isValidElement, ReactElement } from "react";

import Link from "@docusaurus/Link";
import Heading from "@theme/Heading";
import Details from "@theme/Details";
import CodeBlock, { CodeBlockProps } from "@theme/CodeBlock";

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

const MDXComponents: MDXComponentsObject = {
  code: (props) => {
    const { children } = props;

    if (isValidElement(children)) {
      return children;
    }

    return !children.includes("\n") ? (
      <code {...props} />
    ) : (
      <CodeBlock {...props} />
    );
  },
  a: (props) => <Link {...props} />,
  pre: (props) => {
    const { children } = props;

    if (isValidElement(children) && isValidElement(children?.props?.children)) {
      return children?.props.children;
    }

    return (
      <CodeBlock
        {...((isValidElement(children)
          ? children?.props
          : { ...props }) as CodeBlockProps)}
      />
    );
  },
  details: (props): JSX.Element => {
    const items = React.Children.toArray(props.children) as ReactElement[];
    // Split summary item from the rest to pass it as a separate prop to the Detais theme component
    const summary: ReactElement<ComponentProps<"summary">> = items.find(
      (item) => item?.props?.mdxType === "summary"
    )!;
    const children = <>{items.filter((item) => item !== summary)}</>;

    return (
      <Details {...props} summary={summary}>
        {children}
      </Details>
    );
  },
  h1: Heading("h1"),
  h2: Heading("h2"),
  h3: Heading("h3"),
  h4: Heading("h4"),
  h5: Heading("h5"),
  h6: Heading("h6"),
};

export default MDXComponents;
