import React from "react";
import { DocusaurusContext } from "@docusaurus/types";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

export type FooterConfig = {
  copyright?: string;
};

export type ThemeConfig = {
  footer?: FooterConfig;
};

export function useThemeConfig(Component: typeof React.Component) {
  return function WrappedComponent(props) {
    const ctx = useDocusaurusContext() as DocusaurusContext;
    const themeConfig = ctx.siteConfig.themeConfig as ThemeConfig;
    return <Component {...props} themeConfig={themeConfig}></Component>;
  };
}
