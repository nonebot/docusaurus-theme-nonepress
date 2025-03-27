import React, { type ReactNode } from "react";

import clsx from "clsx";

import isInternalUrl from "@docusaurus/isInternalUrl";
import { isRegexpStringMatch } from "@docusaurus/theme-common";
import useBaseUrl from "@docusaurus/useBaseUrl";

import IconExternalLink from "@theme/Icon/ExternalLink";
import MenuLink from "@theme/Menu/Link";
import type { Props } from "@theme/NavbarItem/NavbarNavLink";

export default function NavbarNavLink({
  activeBasePath,
  activeBaseRegex,
  to,
  href,
  label,
  html,
  className,
  prependBaseUrlToHref,
  ...props
}: Props): ReactNode {
  const toUrl = useBaseUrl(to);
  const activeBaseUrl = useBaseUrl(activeBasePath);
  const normalizedHref = useBaseUrl(href, { forcePrependBaseUrl: true });
  const isExternalLink = label && href && !isInternalUrl(href);

  // Link content is set through html XOR label
  const linkContentProps = html
    ? { dangerouslySetInnerHTML: { __html: html } }
    : {
        children: props.children ?? (
          <>
            {label}
            {isExternalLink && (
              <IconExternalLink className="navbar-link-icon" />
            )}
          </>
        ),
      };

  if (href) {
    return (
      <MenuLink
        href={prependBaseUrlToHref ? normalizedHref : href}
        className={clsx("navbar-link", className)}
        {...props}
        {...linkContentProps}
      />
    );
  }

  return (
    <MenuLink
      to={toUrl}
      isNavLink
      {...((activeBasePath || activeBaseRegex) && {
        isActive: (_match, location) =>
          activeBaseRegex
            ? isRegexpStringMatch(activeBaseRegex, location.pathname)
            : location.pathname.startsWith(activeBaseUrl),
      })}
      className={clsx("navbar-link", className)}
      {...props}
      {...linkContentProps}
    />
  );
}
