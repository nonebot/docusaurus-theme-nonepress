import React, { useState } from "react";

import {
  ThemeClassNames,
  useAnnouncementBar,
  MobileSecondaryMenuFiller,
  MobileSecondaryMenuComponent,
} from "@docusaurus/theme-common";
import type { Props } from "@theme/DocSidebar";
import useWindowSize from "@theme/hooks/useWindowSize";
import useScrollPosition from "@theme/hooks/useScrollPosition";

// TODO

function useShowAnnouncementBar() {
  const { isClosed } = useAnnouncementBar();
  const [showAnnouncementBar, setShowAnnouncementBar] = useState(!isClosed);
  useScrollPosition(({ scrollY }) => {
    if (!isClosed) {
      setShowAnnouncementBar(scrollY === 0);
    }
  });
  return showAnnouncementBar;
}

function DocSidebarDesktop({
  path,
  sidebar,
  onCollapse,
  isHidden,
}: Props): JSX.Element {
  return <></>;
}

function DocSidebarMobile(props: Props): JSX.Element {
  return <></>;
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
