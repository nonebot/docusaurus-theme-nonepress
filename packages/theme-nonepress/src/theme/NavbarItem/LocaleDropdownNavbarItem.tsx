import React, { type ReactNode } from "react";

import { translate } from "@docusaurus/Translate";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { useLocaleDropdownUtils } from "@nullbot/docusaurus-theme-nonepress/client";

import IconLanguage from "@theme/Icon/Language";
import type { LinkLikeNavbarItemProps } from "@theme/NavbarItem";
import DropdownNavbarItem from "@theme/NavbarItem/DropdownNavbarItem";
import type { Props } from "@theme/NavbarItem/LocaleDropdownNavbarItem";

export default function LocaleDropdownNavbarItem({
  mobile,
  dropdownItemsBefore,
  dropdownItemsAfter,
  queryString,
  ...props
}: Props): ReactNode {
  const utils = useLocaleDropdownUtils();

  const {
    i18n: { currentLocale, locales },
  } = useDocusaurusContext();
  const localeItems = locales.map((locale): LinkLikeNavbarItemProps => {
    return {
      label: utils.getLabel(locale),
      lang: utils.getLang(locale),
      to: utils.getURL(locale, { queryString }),
      target: "_self",
      autoAddBaseUrl: false,
      className:
        locale === currentLocale
          ? // Similar idea as DefaultNavbarItem: select the right active class
            // name. This cannot be substituted with isActive, because the
            // target URLs contain `pathname://` and therefore are not NavLinks!
            "menu-link-active"
          : "",
    };
  });

  const items = [...dropdownItemsBefore, ...localeItems, ...dropdownItemsAfter];

  // Mobile is handled a bit differently
  const dropdownLabel = mobile
    ? translate({
        message: "Languages",
        id: "theme.navbar.mobileLanguageDropdown.label",
        description: "The label for the mobile language switcher dropdown",
      })
    : utils.getLabel(currentLocale);

  return (
    <DropdownNavbarItem {...props} mobile={mobile} items={items}>
      <IconLanguage className="navbar-locales-icon" />
      {dropdownLabel}
    </DropdownNavbarItem>
  );
}
