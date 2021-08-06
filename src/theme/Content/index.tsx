import React, { PropsWithChildren } from "react";

export default function Content(props: PropsWithChildren<{}>): JSX.Element {
  const { children } = props;
  return <div id="content">{children}</div>;
}
