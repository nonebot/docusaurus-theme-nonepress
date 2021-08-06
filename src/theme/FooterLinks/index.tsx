import React, { PropsWithChildren } from "react";

import Logo from "@theme/Logo";

export default function FooterLinks(
  props: PropsWithChildren<unknown>
): JSX.Element {
  return (
    <div className="xl:grid xl:grid-cols-3 xl:gap-8">
      <div className="space-y-8 xl:col-span-1">
        <Logo className="h-10" />
      </div>
      <div className="mt-12 grid gap-8 xl:mt-0 xl:col-span-2"></div>
    </div>
  );
}
