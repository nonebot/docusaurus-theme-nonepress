import { useState, useCallback, useRef } from "react";

import { useLocationChange, useScrollPosition } from "@docusaurus/theme-common";

import type { HideableNavbar } from "@theme/hooks/useHideableNavbar";

function useHideableNavbar(hideOnScroll: boolean): HideableNavbar {
  const [isNavbarVisible, setIsNavbarVisible] = useState(hideOnScroll);
  const isFocusedAnchor = useRef(false);
  const navbarHeight = useRef(0);
  const navbarRef = useCallback((node: HTMLElement | null) => {
    if (node !== null) {
      navbarHeight.current = node.getBoundingClientRect().height;
    }
  }, []);

  useScrollPosition((currentPosition, lastPosition) => {
    if (!hideOnScroll) {
      return;
    }

    const scrollTop = currentPosition.scrollY;

    // It needed for mostly to handle rubber band scrolling
    if (scrollTop < navbarHeight.current) {
      setIsNavbarVisible(true);
      return;
    }

    if (isFocusedAnchor.current) {
      isFocusedAnchor.current = false;
      return;
    }

    const lastScrollTop = lastPosition?.scrollY;
    const documentHeight =
      document.documentElement.scrollHeight - navbarHeight.current;
    const windowHeight = window.innerHeight;

    if (lastScrollTop && scrollTop >= lastScrollTop) {
      setIsNavbarVisible(false);
    } else if (scrollTop + windowHeight < documentHeight) {
      setIsNavbarVisible(true);
    }
  });

  useLocationChange((locationChangeEvent) => {
    if (!hideOnScroll) {
      return;
    }

    if (locationChangeEvent.location.hash) {
      isFocusedAnchor.current = true;
      setIsNavbarVisible(false);
      return;
    }

    setIsNavbarVisible(true);
  });

  return {
    navbarRef,
    isNavbarVisible,
  };
}

export default useHideableNavbar;
