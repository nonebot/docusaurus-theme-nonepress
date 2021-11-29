import clsx from "clsx";
import React, { PropsWithChildren } from "react";

import Link from "@docusaurus/Link";
import isInternalUrl from "@docusaurus/isInternalUrl";
import useBaseUrl from "@docusaurus/useBaseUrl";

import IconExternalLink from "@theme/IconExternalLink";
import Logo from "@theme/Logo";
import useThemeConfig, {
  FooterLinkConfig,
  useSiteConfig,
} from "@theme/hooks/useThemeConfig";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconName, IconPrefix } from "@fortawesome/fontawesome-svg-core";

function FooterIconLinks(): JSX.Element {
  const {
    footer: { iconLinks },
  } = useThemeConfig();
  return (
    <>
      {iconLinks.map((link, index) => {
        const {
          to,
          href,
          icon,
          description,
          prependBaseUrlToHref,
          ...remProps
        } = link;
        const toUrl = useBaseUrl(to);
        const normalizedHref = useBaseUrl(href, { forcePrependBaseUrl: true });
        return (
          <Link
            key={index}
            className="transition opacity-80 hover:opacity-100"
            {...(href
              ? {
                  href: prependBaseUrlToHref ? normalizedHref : href,
                }
              : {
                  to: toUrl,
                })}
            {...remProps}
          >
            {description && <span className="sr-only">{description}</span>}
            <FontAwesomeIcon
              className="text-2xl text-primary dark:text-dark-primary"
              icon={icon}
            />
          </Link>
        );
      })}
    </>
  );
}

function FooterLink(
  props: PropsWithChildren<{
    to?: string;
    href?: string;
    label?: string;
    icon?: [IconPrefix, IconName];
    prependBaseUrlToHref?: boolean;
    [key: string]: any;
  }>
): JSX.Element {
  const { to, href, label, icon, prependBaseUrlToHref, ...remProps } = props;
  const toUrl = useBaseUrl(to);
  const normalizedHref = useBaseUrl(href, { forcePrependBaseUrl: true });

  return (
    <Link
      className="text-base opacity-80 hover:opacity-100"
      {...(href
        ? {
            href: prependBaseUrlToHref ? normalizedHref : href,
          }
        : {
            to: toUrl,
          })}
      {...remProps}
    >
      {icon ? (
        <>
          <FontAwesomeIcon
            className="text-sm mr-2 inline align-middle"
            icon={icon}
          />
          <span className="inline align-middle">{label}</span>
        </>
      ) : href && !isInternalUrl(href) ? (
        <span>
          {label}
          <IconExternalLink />
        </span>
      ) : (
        label
      )}
    </Link>
  );
}

function FooterColumn(
  props: PropsWithChildren<{ link: FooterLinkConfig; index: number }>
): JSX.Element {
  const {
    index,
    link: { title, icon, items },
  } = props;
  return (
    <div {...(index > 0 ? { className: "mt-12 md:mt-0" } : {})}>
      <h3 className="text-sm font-semibold tracking-wider uppercase opacity-60">
        {icon ? (
          <>
            <FontAwesomeIcon
              className="text-base mr-2 inline align-middle"
              icon={icon}
            />
            <span className="inline align-middle">{title}</span>
          </>
        ) : (
          title
        )}
      </h3>
      <ul className="mt-4 space-y-4">
        {items.map((item, key) =>
          item.html ? (
            <li
              key={key}
              dangerouslySetInnerHTML={{
                __html: item.html,
              }}
            />
          ) : (
            <li key={item.href || item.to}>
              <FooterLink {...item} />
            </li>
          )
        )}
      </ul>
    </div>
  );
}

function FooterColumns(): JSX.Element {
  const themeConfig = useThemeConfig();
  const {
    footer: { links },
  } = themeConfig;
  const groups = links.length;
  return groups > 0 ? (
    <div className={`md:grid md:grid-cols-${groups} md:gap-8`}>
      {links.map((link, index) => (
        <FooterColumn key={index} link={link} index={index} />
      ))}
    </div>
  ) : null;
}

function FooterLinks(): JSX.Element {
  const { tagline } = useSiteConfig();
  return (
    <div className="xl:grid xl:grid-cols-3 xl:gap-8">
      <div className="space-y-8 xl:col-span-1">
        <Logo imageClassName="h-10" />
        <p className="text-base opacity-80">{tagline}</p>
        <div className="flex space-x-6">
          <FooterIconLinks />
        </div>
      </div>
      <div className="mt-12 grid gap-8 xl:mt-0 xl:col-span-2">
        <FooterColumns />
      </div>
    </div>
  );
}

export default FooterLinks;
