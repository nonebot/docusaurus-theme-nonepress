import React from "react";

import clsx from "clsx";

import { useThemeConfig } from "@docusaurus/theme-common";

import type { Props } from "@theme/DocSidebar/Desktop";
import CollapseButton from "@theme/DocSidebar/Desktop/CollapseButton";
import Content from "@theme/DocSidebar/Desktop/Content";
import Logo from "@theme/Logo";

function DocSidebarDesktop({ path, sidebar, onCollapse, isHidden }: Props) {
  const {
    navbar: { hideOnScroll },
    docs: {
      sidebar: { hideable },
    },
  } = useThemeConfig();

  return (
    <div
      className={clsx(
        "flex flex-col sticky top-0 max-h-screen transition w-72",
        {
          "pt-24": !hideOnScroll,
          "h-full": !isHidden,
          "opacity-0 h-0 overflow-hidden invisible": isHidden,
        },
      )}
    >
      {hideOnScroll && (
        <Logo
          tabIndex={-1}
          className="flex items-center mx-8 min-h-[6rem] max-h-24 no-underline"
          imageClassName="h-10"
        />
      )}
      <Content path={path} sidebar={sidebar} />
      {hideable && <CollapseButton onClick={onCollapse} />}
    </div>
  );
}

export default React.memo(DocSidebarDesktop);
