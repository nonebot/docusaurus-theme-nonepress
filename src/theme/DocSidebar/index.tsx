import clsx from "clsx";
import React, { useState } from "react";

import Logo from "@theme/Logo";
import type { Props } from "@theme/DocSidebar";
import useWindowSize from "@theme/hooks/useWindowSize";
import { DocSidebarItems } from "@theme/DocSidebarItem";
import useThemeConfig from "@theme/hooks/useThemeConfig";
import useScrollPosition from "@theme/hooks/useScrollPosition";
import {
  ThemeClassNames,
  useAnnouncementBar,
  MobileSecondaryMenuFiller,
  MobileSecondaryMenuComponent,
} from "@docusaurus/theme-common";

// TODO

// function useShowAnnouncementBar() {
//   const { isClosed } = useAnnouncementBar();
//   const [showAnnouncementBar, setShowAnnouncementBar] = useState(!isClosed);
//   useScrollPosition(({ scrollY }) => {
//     if (!isClosed) {
//       setShowAnnouncementBar(scrollY === 0);
//     }
//   });
//   return showAnnouncementBar;
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
  // const { isClosed: isAnnouncementBarClosed } = useAnnouncementBar();

  return (
    <div
      className={clsx(
        "flex flex-col sticky top-0 max-h-screen h-full transition w-72",
        {
          "pt-24": !hideOnScroll,
          "opacity-0 h-0 overflow-hidden invisible": isHidden,
        }
      )}
    >
      {hideOnScroll && (
        <Logo
          className="flex items-center mx-8 h-24 max-h-24 no-underline"
          imageClassName="h-10"
        />
      )}
      <nav
        className={clsx("menu thin-scrollbar", "flex-grow p-2", {
          // [styles.menuWithAnnouncementBar]:
          //   !isAnnouncementBarClosed && showAnnouncementBar,
        })}
      >
        <ul
          className={clsx(
            ThemeClassNames.docs.docSidebarMenu,
            "list-none m-0 pl-0"
          )}
        >
          <DocSidebarItems items={sidebar} activePath={path} />
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
          <i className="fas fa-angle-double-left text-xl"></i>
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
    <ul
      className={clsx(
        ThemeClassNames.docs.docSidebarMenu,
        "list-none m-0 pl-0"
      )}
    >
      <DocSidebarItems
        items={sidebar}
        activePath={path}
        onItemClick={() => toggleSidebar()}
      />
    </ul>
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
