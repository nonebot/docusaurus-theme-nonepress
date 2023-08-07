import React from "react";

import clsx from "clsx";

import "./styles.css";
import Link from "@docusaurus/Link";
import { translate } from "@docusaurus/Translate";

import { useNonepressThemeConfig } from "@nullbot/docusaurus-theme-nonepress/client";
import type { Props } from "@theme/Heading";

export default function Heading({ as: As, id, ...props }: Props): JSX.Element {
  const {
    navbar: { hideOnScroll },
  } = useNonepressThemeConfig();
  // H1 headings do not need an id because they don't appear in the TOC.
  if (As === "h1" || !id) {
    return <As {...props} id={undefined} />;
  }

  const anchorTitle = translate(
    {
      id: "theme.common.headingLinkTitle",
      message: "Direct link to {heading}",
      description: "Title for link to heading",
    },
    {
      heading: typeof props.children === "string" ? props.children : id,
    },
  );

  return (
    <As
      {...props}
      className={clsx("anchor", hideOnScroll ? "" : "", props.className)}
      id={id}
    >
      {props.children}
      <Link
        className="hash-link"
        to={`#${id}`}
        aria-label={anchorTitle}
        title={anchorTitle}
      >
        &#8203;
      </Link>
    </As>
  );
}
