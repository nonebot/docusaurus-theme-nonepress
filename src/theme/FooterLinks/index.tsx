import React, { PropsWithChildren } from "react";

import Logo from "@theme/Logo";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import isInternalUrl from "@docusaurus/isInternalUrl";
import IconExternalLink from "@theme/IconExternalLink";
import useThemeConfig, { FooterLinkConfig } from "../../useThemeConfig";

function FooterLink(
  props: PropsWithChildren<{
    to?: string;
    href?: string;
    label: string;
    prependBaseUrlToHref?: boolean;
    [key: string]: any;
  }>
) {
  const { to, href, label, prependBaseUrlToHref, ...remProps } = props;
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
      {href && !isInternalUrl(href) ? (
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
    link: { title, items },
  } = props;
  return (
    <div {...(index > 0 ? { className: "mt-12 md:mt-0" } : {})}>
      <h3 className="text-sm font-semibold tracking-wider uppercase opacity-60">
        {title}
      </h3>
      <ul className="mt-4 space-y-4">
        {items.map((item, key) =>
          item.html ? (
            <li
              key={key}
              className="footer__item"
              dangerouslySetInnerHTML={{
                __html: item.html,
              }}
            />
          ) : (
            <li key={item.href || item.to} className="footer__item">
              <FooterLink {...item} />
            </li>
          )
        )}
      </ul>
    </div>
  );
}

function FooterColumns(props: PropsWithChildren<unknown>): JSX.Element {
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

export default function FooterLinks(
  props: PropsWithChildren<unknown>
): JSX.Element {
  return (
    <div className="xl:grid xl:grid-cols-3 xl:gap-8">
      <div className="space-y-8 xl:col-span-1">
        <Logo imageClassName="h-10" />
        <p className="text-base opacity-80">description</p>
        <div className="flex space-x-6">
          <a>github</a>
          <a>other</a>
        </div>
      </div>
      <div className="mt-12 grid gap-8 xl:mt-0 xl:col-span-2">
        <FooterColumns />
      </div>
    </div>
  );
}
