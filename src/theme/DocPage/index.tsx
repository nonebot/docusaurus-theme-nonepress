import React, { PropsWithChildren } from "react";

import Layout from "@theme/Layout";

export default function DocPage(props: PropsWithChildren<{}>): JSX.Element {
  return <Layout>{props.children}</Layout>;
}
