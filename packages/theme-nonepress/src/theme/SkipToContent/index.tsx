import React, { type ReactNode } from "react";

import { SkipToContentLink } from "@docusaurus/theme-common";

import "./styles.css";

export default function SkipToContent(): ReactNode {
  return <SkipToContentLink className="skip-to-content" />;
}
