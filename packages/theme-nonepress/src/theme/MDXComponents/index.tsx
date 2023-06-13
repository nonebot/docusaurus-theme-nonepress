import React from "react";

import Admonition from "@theme/Admonition";
import type { MDXComponentsObject } from "@theme/MDXComponents";
import MDXA from "@theme/MDXComponents/A";
import MDXCode from "@theme/MDXComponents/Code";
import MDXDetails from "@theme/MDXComponents/Details";
import MDXHead from "@theme/MDXComponents/Head";
import MDXHeading from "@theme/MDXComponents/Heading";
import MDXImg from "@theme/MDXComponents/Img";
import MDXPre from "@theme/MDXComponents/Pre";
import MDXUl from "@theme/MDXComponents/Ul";
import Mermaid from "@theme/Mermaid";

const MDXComponents: MDXComponentsObject = {
  head: MDXHead,
  code: MDXCode,
  a: MDXA,
  pre: MDXPre,
  details: MDXDetails,
  ul: MDXUl,
  img: MDXImg,
  h1: (props) => <MDXHeading as="h1" {...props} />,
  h2: (props) => <MDXHeading as="h2" {...props} />,
  h3: (props) => <MDXHeading as="h3" {...props} />,
  h4: (props) => <MDXHeading as="h4" {...props} />,
  h5: (props) => <MDXHeading as="h5" {...props} />,
  h6: (props) => <MDXHeading as="h6" {...props} />,
  admonition: Admonition,
  mermaid: Mermaid,
};

export default MDXComponents;
