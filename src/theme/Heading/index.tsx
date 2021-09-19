import clsx from "clsx";
import React from "react";

import "./styles.css";
import styles from "./styles.module.css";
import useThemeConfig from "@theme/hooks/useThemeConfig";
import type { HeadingType, Props } from "@theme/Heading";

export function MainHeading(props: Props): JSX.Element {
  return (
    <header>
      <h1
        {...props}
        id={undefined} // h1 headings do not need an id because they don't appear in the TOC
      >
        {props.children}
      </h1>
    </header>
  );
}

function createAnchorHeading(Tag: HeadingType): (props: Props) => JSX.Element {
  return function TargetComponent({ id, ...props }) {
    const {
      navbar: { hideOnScroll },
    } = useThemeConfig();

    if (!id) {
      return <Tag {...props} />;
    }

    return (
      <Tag
        {...props}
        className={clsx("anchor", `anchor__${Tag}`, {
          [styles.anchorWithHideOnScrollNavbar]: hideOnScroll,
          [styles.anchorWithStickyNavbar]: !hideOnScroll,
        })}
        id={id}
      >
        {props.children}
        <a className="hash-link" href={`#${id}`} title="Direct link to heading">
          #
        </a>
      </Tag>
    );
  };
}

function Heading(headingType: HeadingType): (props: Props) => JSX.Element {
  return headingType === "h1" ? MainHeading : createAnchorHeading(headingType);
}

export default Heading;
