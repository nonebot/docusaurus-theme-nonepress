import React from "react";

import clsx from "clsx";

import {
  NavbarSecondaryMenuFiller,
  type NavbarSecondaryMenuComponent,
  ThemeClassNames,
} from "@docusaurus/theme-common";

import {
  useSidebarDisplay,
  SidebarContentFiller,
} from "@nullbot/docusaurus-theme-nonepress/contexts";
import type { Props } from "@theme/DocSidebar/Mobile";
import DocSidebarItems from "@theme/DocSidebarItems";

// const DocSidebarMobileSecondaryMenu: NavbarSecondaryMenuComponent<Props> = ({
//   sidebar,
//   path,
// }: Props) => {
//   const { setShown } = useSidebarDisplay();
//   return (
//     <>
//       <hr className="mx-2 opacity-70 text-gray-300 dark:text-gray-600" />
//       <ul
//         className={clsx(ThemeClassNames.docs.docSidebarMenu, "list-none p-2")}
//       >
//         <DocSidebarItems
//           items={sidebar}
//           activePath={path}
//           onItemClick={(item) => {
//             // Mobile sidebar should only be closed if the category has a link
//             if (item.type === "category" && item.href) {
//               setShown(false);
//             }
//             if (item.type === "link") {
//               setShown(false);
//             }
//           }}
//           level={1}
//         />
//       </ul>
//     </>
//   );
// };

function DocSidebarMobile(props: Props) {
  return <SidebarContentFiller items={props.sidebar} />;
}

export default React.memo(DocSidebarMobile);
