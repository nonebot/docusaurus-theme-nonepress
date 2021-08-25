import clsx from "clsx";
import React from "react";

import "./styles.css";
import styles from "./styles.module.css";
import useThemeConfig from "../../useThemeConfig";
import type { HeadingType, Props } from "@theme/Heading";

export function MainHeading(props: Props): JSX.Element {
  return (
    <header>
      <h1
        {...props}
        id={undefined} // h1 headings do not need an id because they don't appear in the TOC
        className={styles.h1Heading}
      >
        {props.children}
      </h1>
    </header>
  );
}

const createAnchorHeading = (
  Tag: HeadingType
): ((props: Props) => JSX.Element) =>
  function TargetComponent({ id, ...props }) {
    const {
      navbar: { hideOnScroll },
    } = useThemeConfig();

    if (!id) {
      return <Tag {...props} />;
    }

    return (
      <Tag {...props}>
        <a
          aria-hidden="true"
          tabIndex={-1}
          className={clsx("anchor", {
            [styles.enhancedAnchor]: !hideOnScroll,
          })}
          id={id}
        />
        {props.children}
        <a className="hash-link" href={`#${id}`} title="Direct link to heading">
          #
        </a>
      </Tag>
    );
  };

export default function Heading(
  headingType: HeadingType
): (props: Props) => JSX.Element {
  return headingType === "h1" ? MainHeading : createAnchorHeading(headingType);
}
