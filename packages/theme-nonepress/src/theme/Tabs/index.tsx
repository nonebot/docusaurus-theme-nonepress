import React, { cloneElement, type ReactElement } from "react";

import clsx from "clsx";

import {
  useScrollPositionBlocker,
  useTabs,
  type TabItemProps,
} from "@docusaurus/theme-common/internal";
import useIsBrowser from "@docusaurus/useIsBrowser";

import "./styles.css";

import type { Props } from "@theme/Tabs";

function TabList({
  className,
  selectedValue,
  selectValue,
  tabValues,
}: Props & ReturnType<typeof useTabs>) {
  const tabRefs: (HTMLLIElement | null)[] = [];
  const { blockElementScrollPositionUntilNextRender } =
    useScrollPositionBlocker();

  const handleTabChange = (
    event:
      | React.FocusEvent<HTMLLIElement>
      | React.MouseEvent<HTMLLIElement>
      | React.KeyboardEvent<HTMLLIElement>,
  ) => {
    const newTab = event.currentTarget;
    const newTabIndex = tabRefs.indexOf(newTab);
    const newTabValue = tabValues[newTabIndex]!.value;

    if (newTabValue !== selectedValue) {
      blockElementScrollPositionUntilNextRender(newTab);
      selectValue(newTabValue);
    }
  };

  const handleKeydown = (event: React.KeyboardEvent<HTMLLIElement>) => {
    let focusElement: HTMLLIElement | null = null;

    switch (event.key) {
      case "Enter": {
        handleTabChange(event);
        break;
      }
      case "ArrowRight": {
        const nextTab = tabRefs.indexOf(event.currentTarget) + 1;
        focusElement = tabRefs[nextTab] ?? tabRefs[0]!;
        break;
      }
      case "ArrowLeft": {
        const prevTab = tabRefs.indexOf(event.currentTarget) - 1;
        focusElement = tabRefs[prevTab] ?? tabRefs[tabRefs.length - 1]!;
        break;
      }
      default:
        break;
    }

    focusElement?.focus();
  };

  return (
    <div className="not-prose">
      <ul
        role="tablist"
        aria-orientation="horizontal"
        className={clsx("tabs tabs-list", className)}
      >
        {tabValues.map(({ value, label, attributes }) => (
          <li
            // TODO extract TabListItem
            role="tab"
            tabIndex={selectedValue === value ? 0 : -1}
            aria-selected={selectedValue === value}
            key={value}
            ref={(tabControl) => tabRefs.push(tabControl)}
            onKeyDown={handleKeydown}
            onClick={handleTabChange}
            {...attributes}
            className={clsx(
              "tab tab-lifted tab-item",
              attributes?.className as string,
              selectedValue === value && "tab-active tab-item-active",
            )}
          >
            {label ?? value}
          </li>
        ))}
        <div className="tab tab-lifted tab-item tab-spacer" />
      </ul>
    </div>
  );
}

function TabContent({
  lazy,
  children,
  selectedValue,
}: Props & ReturnType<typeof useTabs>) {
  const childTabs = (Array.isArray(children) ? children : [children]).filter(
    Boolean,
  ) as ReactElement<TabItemProps>[];
  if (lazy) {
    const selectedTabItem = childTabs.find(
      (tabItem) => tabItem.props.value === selectedValue,
    );
    if (!selectedTabItem) {
      // fail-safe or fail-fast? not sure what's best here
      return null;
    }
    return <div>{cloneElement(selectedTabItem)}</div>;
  }
  return (
    <div>
      {childTabs.map((tabItem, i) =>
        cloneElement(tabItem, {
          key: i,
          hidden: tabItem.props.value !== selectedValue,
        }),
      )}
    </div>
  );
}

function TabsComponent(props: Props): JSX.Element {
  const tabs = useTabs(props);
  return (
    <div className="tabs-container">
      <TabList {...props} {...tabs} />
      <TabContent {...props} {...tabs} />
    </div>
  );
}

export default function Tabs(props: Props): JSX.Element {
  const isBrowser = useIsBrowser();
  return (
    <TabsComponent
      // Remount tabs after hydration
      // Temporary fix for https://github.com/facebook/docusaurus/issues/5653
      key={String(isBrowser)}
      {...props}
    />
  );
}
