import React, { PropsWithChildren } from "react";

export default function Content(props: PropsWithChildren<{}>) {
  const { children } = props;
  return <div id="content">{children}</div>;
}
