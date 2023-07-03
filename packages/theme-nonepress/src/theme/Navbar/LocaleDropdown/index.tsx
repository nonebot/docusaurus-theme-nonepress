import React from "react";

import Translate from "@docusaurus/Translate";
import { useLocation } from "@docusaurus/router";
import { useAlternatePageUtils } from "@docusaurus/theme-common/internal";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

import IconLanguage from "@theme/Icon/Language";
import type { Props } from "@theme/Navbar/LocaleDropdown";
import type { LinkLikeNavbarItemProps } from "@theme/NavbarItem";
import DropdownNavbarItem from "@theme/NavbarItem/DropdownNavbarItem";

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
      className:
        // eslint-disable-next-line no-nested-ternary
        locale === currentLocale
          ? // Similar idea as DefaultNavbarItem: select the right Infima active
            // class name. This cannot be substituted with isActive, because the
            // target URLs contain `pathname://` and therefore are not NavLinks!
            "navbar-dropdown-item-active"
          : "",
    };
  });

  const items = [...dropdownItemsBefore, ...localeItems, ...dropdownItemsAfter];

  return (
    <DropdownNavbarItem
      className="navbar-locales"
      items={items}
      mobile={mobile}
    >
      <IconLanguage className="navbar-locales-icon" />
      {mobile && (
        <Translate id="theme.navbar.mobileLanguageDropdown.label">
          Languages
        </Translate>
      )}
    </DropdownNavbarItem>
  );
}
