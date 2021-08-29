import { useState, useCallback, useEffect, useRef } from "react";

import { useLocation } from "@docusaurus/router";
import { useLocationChange } from "@docusaurus/theme-common";
import useScrollPosition from "@theme/hooks/useScrollPosition";
import type { HideableNavbar } from "@theme/hooks/useHideableNavbar";

function useHideableNavbar(hideOnScroll: boolean): HideableNavbar {
  const location = useLocation();
  const [isNavbarVisible, setIsNavbarVisible] = useState(hideOnScroll);
  const isFocusedAnchor = useRef(false);
  const [navbarHeight, setNavbarHeight] = useState(0);
  const navbarRef = useCallback((node: HTMLElement | null) => {
    if (node !== null) {
      setNavbarHeight(node.getBoundingClientRect().height);
    }
  }, []);

  useScrollPosition(
    (currentPosition, lastPosition) => {
      const scrollTop = currentPosition.scrollY;
      const lastScrollTop = lastPosition?.scrollY;
      if (!hideOnScroll) {
        return;
      }

      if (scrollTop < navbarHeight) {
        setIsNavbarVisible(true);
        return;
      }

      if (isFocusedAnchor.current) {
        isFocusedAnchor.current = false;
        setIsNavbarVisible(false);
        return;
      }

      if (lastScrollTop && scrollTop === 0) {
        setIsNavbarVisible(true);
      }

      const documentHeight =
        document.documentElement.scrollHeight - navbarHeight;
      const windowHeight = window.innerHeight;

      if (lastScrollTop && scrollTop >= lastScrollTop) {
        setIsNavbarVisible(false);
      } else if (scrollTop + windowHeight < documentHeight) {
        setIsNavbarVisible(true);
      }
    },
    [navbarHeight, isFocusedAnchor]
  );

  useLocationChange((locationChangeEvent) => {
    if (!hideOnScroll || locationChangeEvent.location.hash) {
      return;
    }

    setIsNavbarVisible(true);
  });

  useEffect(() => {
    if (!hideOnScroll) {
      return;
    }

    if (!location.hash) {
      return;
    }

    isFocusedAnchor.current = true;
  }, [location.hash]);

  return {
    navbarRef,
    isNavbarVisible,
  };
}

export default useHideableNavbar;
