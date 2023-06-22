import React from "react";

import Link from "@docusaurus/Link";
import { useLocation } from "@docusaurus/router";
import { useAlternatePageUtils } from "@docusaurus/theme-common/internal";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

import IconLanguage from "@theme/Icon/Language";
import type { Props } from "@theme/Navbar/LocaleDropdown";
import type { LinkLikeNavbarItemProps } from "@theme/NavbarItem";

export default function LocaleDropdown({
  dropdownItemsBefore,
  dropdownItemsAfter,
  queryString = "",
  mobile = false,
}: Props): JSX.Element {
  const {
    i18n: { currentLocale, locales, localeConfigs },
  } = useDocusaurusContext();
  const alternatePageUtils = useAlternatePageUtils();
  const { search, hash } = useLocation();

  const localeItems = locales.map((locale): LinkLikeNavbarItemProps => {
    const baseTo = `pathname://${alternatePageUtils.createUrl({
      locale,
      fullyQualified: false,
    })}`;
    // preserve ?search#hash suffix on locale switches
    const to = `${baseTo}${search}${hash}${queryString}`;
    return {
      label: localeConfigs[locale].label,
      lang: localeConfigs[locale].htmlLang,
      to,
      target: "_self",
      autoAddBaseUrl: false,
      isActive: () => locale === currentLocale,
    };
  });

  const items = [...dropdownItemsBefore, ...localeItems, ...dropdownItemsAfter];

  return (
    <div className="dropdown">
      <label tabIndex={0} className="btn btn-sm no-animation">
        <IconLanguage className="w-5 h-5 fill-current" />
        {/* TODO: dropdown icon */}
      </label>
      <ul tabIndex={0} className="dropdown-content z-10 bg-base-100 shadow">
        {items.map((item, index) => (
          <li key={index} className="cursor-default select-none relative">
            <Link
              to={item.to}
              onClick={item.onClick}
              isActive={item.isActive}
              isNavLink={item.isNavLink}
              activeClassName=""
              className="relative flex justify-end items-center content-center transition py-2 pl-7 rounded duration-300 hover:bg-base-300"
            >
              <span aria-label="Selected" className=""></span>
              <span className="grow font-medium inline-block truncate">
                {item.label}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
