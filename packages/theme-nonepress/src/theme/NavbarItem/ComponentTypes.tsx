import type { ComponentTypesObject } from "@theme/NavbarItem/ComponentTypes";
import DefaultNavbarItem from "@theme/NavbarItem/DefaultNavbarItem";
import DocNavbarItem from "@theme/NavbarItem/DocNavbarItem";
import DocSidebarNavbarItem from "@theme/NavbarItem/DocSidebarNavbarItem";
import DocsMenuDropdownNavbarItem from "@theme/NavbarItem/DocsMenuDropdownNavbarItem";
import DocsVersionNavbarItem from "@theme/NavbarItem/DocsVersionNavbarItem";
import DropdownNavbarItem from "@theme/NavbarItem/DropdownNavbarItem";
import HtmlNavbarItem from "@theme/NavbarItem/HtmlNavbarItem";

const ComponentTypes: ComponentTypesObject = {
  default: DefaultNavbarItem,
  dropdown: DropdownNavbarItem,
  html: HtmlNavbarItem,
  doc: DocNavbarItem,
  docSidebar: DocSidebarNavbarItem,
  docsVersion: DocsVersionNavbarItem,
  docsMenu: DocsMenuDropdownNavbarItem,
};

export default ComponentTypes;
