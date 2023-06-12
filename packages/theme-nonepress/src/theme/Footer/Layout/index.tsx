import React from "react";

import clsx from "clsx";

import { useSiteConfig } from "@nullbot/docusaurus-theme-nonepress/client";

import type { Props } from "@theme/Footer/Layout";

export default function FooterLayout({
  style,
  links,
  logo,
  socialLinks,
  copyright,
}: Props): JSX.Element {
  const { tagline } = useSiteConfig();

  return (
    <div
      className={clsx(
        "container",
        style === "light"
          ? "bg-base-200 text-base-content"
          : "bg-neutral text-neutral-content",
      )}
    >
      <footer className="footer footer-center p-10">
        {(logo || socialLinks) && (
          <div>
            {logo}
            {logo && <p>{tagline}</p>}
            {socialLinks}
          </div>
        )}
        {links}
      </footer>
      <footer className="footer footer-center border-t border-base-300 p-x-10 py-4">
        <div>{copyright}</div>
      </footer>
    </div>
  );
}
