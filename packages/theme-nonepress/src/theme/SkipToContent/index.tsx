import React, { type ReactNode } from "react";

import "./styles.css";

import { SkipToContentLink } from "@docusaurus/theme-common";

export default function SkipToContent(): ReactNode {
  return <SkipToContentLink className="skip-to-content" />;
}
