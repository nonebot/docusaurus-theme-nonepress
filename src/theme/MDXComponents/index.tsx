import React, { ComponentProps, isValidElement, ReactElement } from "react";

import Head from "@docusaurus/Head";
import Link from "@docusaurus/Link";
import Heading from "@theme/Heading";
import Details from "@theme/Details";
import CodeBlock from "@theme/CodeBlock";
import type { Props } from "@theme/CodeBlock";
import type { MDXComponentsObject } from "@theme/MDXComponents";

function unwrapMDXElement(element: ReactElement) {
  if (element?.props?.mdxType && element?.props?.originalType) {
    const { mdxType, originalType, ...newProps } = element.props;
    return React.createElement(element.props.originalType, newProps);
  }
  return element;
}

const MDXComponents: MDXComponentsObject = {
  head: (props) => {
    const unwrappedChildren = React.Children.map(props.children, (child) =>
      unwrapMDXElement(child as ReactElement)
    );
    return <Head {...props}>{unwrappedChildren}</Head>;
  },
  code: (props) => {
    const { children } = props;

    // For retrocompatibility purposes (pretty rare use case)
    // See https://github.com/facebook/docusaurus/pull/1584
    if (isValidElement(children)) {
      return children;
    }

    return !(children as string).includes("\n") ? (
      <code {...props} />
    ) : (
      <CodeBlock {...props} />
    );
  },
  a: (props) => <Link {...props} />,
  pre: (props) => {
    const { children } = props;

    // See comment for `code` above
    if (isValidElement(children) && isValidElement(children?.props?.children)) {
      return children?.props.children;
    }

    return (
      <CodeBlock
        {...((isValidElement(children)
          ? children?.props
          : { ...props }) as Props)}
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
