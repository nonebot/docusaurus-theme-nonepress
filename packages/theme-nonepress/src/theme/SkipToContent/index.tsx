import React from "react";

import { SkipToContentLink } from "@docusaurus/theme-common";

export default function SkipToContent(): JSX.Element {
  return (
    <SkipToContentLink className="fixed top-4 left-full focus:left-4 z-50 p-4 shadow-md bg-primary text-primary-content" />
  );
}
