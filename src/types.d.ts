/// <reference types="@docusaurus/module-type-aliases" />

import React from "react";

declare module "@theme/Navbar" {
  export default class Navbar extends React.Component {}
}

declare module "@theme/Content" {
  export default class Content extends React.Component {}
}
