import clsx from "clsx";
import React, { useState } from "react";

import {
  ThemeClassNames,
  useScrollPosition,
  useAnnouncementBar,
  MobileSecondaryMenuFiller,
  MobileSecondaryMenuComponent,
} from "@docusaurus/theme-common";

import type { Props } from "@theme/DocSidebar";
import { DocSidebarItems } from "@theme/DocSidebarItem";
import Logo from "@theme/Logo";
import useThemeConfig from "@theme/hooks/useThemeConfig";
import useWindowSize from "@theme/hooks/useWindowSize";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// function useShowAnnouncementBar() {
//   const { isActive } = useAnnouncementBar();
//   const [showAnnouncementBar, setShowAnnouncementBar] = useState(isActive);

//   useScrollPosition(
//     ({ scrollY }) => {
//       if (isActive) {
//         setShowAnnouncementBar(scrollY === 0);
//       }
//     },
//     [isActive]
//   );
//   return isActive && showAnnouncementBar;
// }

function DocSidebarDesktop({
  path,
  sidebar,
  onCollapse,
  isHidden,
}: Props): JSX.Element {
  // const showAnnouncementBar = useShowAnnouncementBar();
  const {
    navbar: { hideOnScroll },
    hideableSidebar,
  } = useThemeConfig();

  return (
    <div
      className={clsx(
        "flex flex-col sticky top-0 max-h-screen transition w-72",
        {
          "pt-24": !hideOnScroll,
          "h-full": !isHidden,
          "opacity-0 h-0 overflow-hidden invisible": isHidden,
        }
      )}
    >
      {hideOnScroll && (
        <Logo
          className="flex items-center mx-8 min-h-[6rem] max-h-24 no-underline"
          imageClassName="h-10"
        />
      )}
      <nav
        className={clsx(
          "menu thin-scrollbar",
          "font-medium grow p-2 overflow-x-hidden"
          // {
          //   [styles.menuWithAnnouncementBar]: showAnnouncementBar,
          // }
        )}
      >
        <ul
          className={clsx(
            ThemeClassNames.docs.docSidebarMenu,
            "list-none m-0 pl-0"
          )}
        >
          <DocSidebarItems items={sidebar} activePath={path} level={1} />
        </ul>
      </nav>
      {hideableSidebar && (
        <button
          type="button"
          title="Collapse sidebar"
          aria-label="Collapse sidebar"
          className={clsx(
            "block sticky bottom-0 h-10 px-6 py-1 align-middle",
            "border border-gray-300 dark:border-gray-600 text-sm font-bold cursor-pointer"
          )}
          onClick={onCollapse}
        >
          <FontAwesomeIcon
            className="text-xl"
            icon={["fas", "angle-double-left"]}
          />
        </button>
      )}
    </div>
  );
}

const DocSidebarMobileSecondaryMenu: MobileSecondaryMenuComponent<Props> = ({
  toggleSidebar,
  sidebar,
  path,
}) => {
  return (
    <>
      <hr className="mx-2 opacity-70 text-gray-300 dark:text-gray-600" />
      <ul
        className={clsx(ThemeClassNames.docs.docSidebarMenu, "list-none p-2")}
      >
        <DocSidebarItems
          items={sidebar}
          activePath={path}
          onItemClick={() => toggleSidebar()}
          level={1}
        />
      </ul>
    </>
  );
};

function DocSidebarMobile(props: Props): JSX.Element {
  return (
    <MobileSecondaryMenuFiller
      component={DocSidebarMobileSecondaryMenu}
      props={props}
    />
  );
}

const DocSidebarDesktopMemo = React.memo(DocSidebarDesktop);
const DocSidebarMobileMemo = React.memo(DocSidebarMobile);

function DocSidebar(props: Props): JSX.Element {
  const windowSize = useWindowSize();

  // Desktop sidebar visible on hydration: need SSR rendering
  const shouldRenderSidebarDesktop =
    windowSize === "desktop" || windowSize === "ssr";

  // Mobile sidebar not visible on hydration: can avoid SSR rendering
  const shouldRenderSidebarMobile = windowSize === "mobile";

  return (
    <>
      {shouldRenderSidebarDesktop && <DocSidebarDesktopMemo {...props} />}
      {shouldRenderSidebarMobile && <DocSidebarMobileMemo {...props} />}
    </>
  );
}

export default DocSidebar;
