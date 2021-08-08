import { Joi, URISchema } from "@docusaurus/utils-validation";

const DEFAULT_DOCS_CONFIG = {
  versionPersistence: "localStorage",
};

const DEFAULT_COLOR_MODE_CONFIG = {
  defaultMode: "light",
  disableSwitch: false,
  switchConfig: {
    darkIconText: "🌜",
    lightIconText: "🌞",
  },
};

export const DEFAULT_CONFIG = {
  colorMode: DEFAULT_COLOR_MODE_CONFIG,
  docs: DEFAULT_DOCS_CONFIG,
  navbar: {
    hideOnScroll: false,
    items: [],
  },
  metadatas: [],
  logo: {
    href: "/",
  },
  prism: {
    additionalLanguages: [],
  },
};

const ColorModeSchema = Joi.object({
  defaultMode: Joi.string()
    .equal("dark", "light")
    .default(DEFAULT_COLOR_MODE_CONFIG.defaultMode),
  disableSwitch: Joi.bool().default(DEFAULT_COLOR_MODE_CONFIG.disableSwitch),
  switchConfig: Joi.object({
    darkIcon: Joi.string(),
    darkIconText: Joi.object().default(
      DEFAULT_COLOR_MODE_CONFIG.switchConfig.darkIconText
    ),
    lightIcon: Joi.string(),
    lightIconText: Joi.object().default(
      DEFAULT_COLOR_MODE_CONFIG.switchConfig.lightIconText
    ),
  }).default(DEFAULT_COLOR_MODE_CONFIG.switchConfig),
}).default(DEFAULT_COLOR_MODE_CONFIG);

export const MetadataSchema = Joi.object({
  id: Joi.string(),
  name: Joi.string(),
  property: Joi.string(),
  content: Joi.string(),
  itemprop: Joi.string(),
}).unknown();

export const LogoSchema = Joi.object({
  alt: Joi.string().allow(""),
  src: Joi.string().required(),
  srcDark: Joi.string(),
  href: Joi.string().default(DEFAULT_CONFIG.logo.href),
  target: Joi.string(),
});

export const DocsSchema = Joi.object({
  versionPersistence: Joi.string()
    .equal("localStorage", "none")
    .default(DEFAULT_DOCS_CONFIG.versionPersistence),
}).default(DEFAULT_DOCS_CONFIG);

const NavbarItemBaseSchema = Joi.object({
  label: Joi.string(),
  className: Joi.string(),
})
  // We allow any unknown attributes on the links
  // (users may need additional attributes like target, aria-role, data-customAttribute...)
  .unknown();

const DefaultNavbarItemSchema = NavbarItemBaseSchema.append({
  to: Joi.string(),
  href: URISchema,
  activeBasePath: Joi.string(),
  activeBaseRegex: Joi.string(),
  prependBaseUrlToHref: Joi.bool(),
  // This is only triggered in case of a nested dropdown
  items: Joi.forbidden().messages({
    "any.unknown": "Nested dropdowns are not allowed",
  }),
})
  .xor("href", "to")
  .messages({
    "object.xor": 'One and only one between "to" and "href" should be provided',
  });

const DocsVersionNavbarItemSchema = NavbarItemBaseSchema.append({
  type: Joi.string().equal("docsVersion").required(),
  to: Joi.string(),
  docsPluginId: Joi.string(),
});

const DocItemSchema = NavbarItemBaseSchema.append({
  type: Joi.string().equal("doc").required(),
  docId: Joi.string().required(),
  docsPluginId: Joi.string(),
  activeSidebarClassName: Joi.string().default("navbar__link--active"),
});

const itemWithType = (type) => {
  // because equal(undefined) is not supported :/
  const typeSchema = type
    ? Joi.string().required().equal(type)
    : Joi.string().forbidden();
  return Joi.object({
    type: typeSchema,
  })
    .unknown()
    .required();
};

const DropdownSubitemSchema = Joi.object().when(Joi.ref("."), {
  switch: [
    {
      is: itemWithType("docsVersion"),
      then: DocsVersionNavbarItemSchema,
    },
    {
      is: itemWithType("doc"),
      then: DocItemSchema,
    },
    {
      is: itemWithType(undefined),
      then: DefaultNavbarItemSchema,
    },
    {
      is: Joi.alternatives().try(
        itemWithType("dropdown"),
        itemWithType("docsVersionDropdown"),
        itemWithType("localeDropdown"),
        itemWithType("search")
      ),
      then: Joi.forbidden().messages({
        "any.unknown": "Nested dropdowns are not allowed",
      }),
    },
  ],
  otherwise: Joi.forbidden().messages({
    "any.unknown": "Bad navbar item type {.type}",
  }),
});

const DropdownNavbarItemSchema = NavbarItemBaseSchema.append({
  items: Joi.array().items(DropdownSubitemSchema).required(),
});

const DocsVersionDropdownNavbarItemSchema = NavbarItemBaseSchema.append({
  type: Joi.string().equal("docsVersionDropdown").required(),
  docsPluginId: Joi.string(),
  dropdownActiveClassDisabled: Joi.boolean(),
  dropdownItemsBefore: Joi.array().items(DropdownSubitemSchema).default([]),
  dropdownItemsAfter: Joi.array().items(DropdownSubitemSchema).default([]),
});

const LocaleDropdownNavbarItemSchema = NavbarItemBaseSchema.append({
  type: Joi.string().equal("localeDropdown").required(),
  dropdownItemsBefore: Joi.array().items(DropdownSubitemSchema).default([]),
  dropdownItemsAfter: Joi.array().items(DropdownSubitemSchema).default([]),
});

const SearchItemSchema = Joi.object({
  type: Joi.string().equal("search").required(),
});

export const NavbarItemSchema = Joi.object().when(Joi.ref("."), {
  switch: [
    {
      is: itemWithType("docsVersion"),
      then: DocsVersionNavbarItemSchema,
    },
    {
      is: itemWithType("dropdown"),
      then: DropdownNavbarItemSchema,
    },
    {
      is: itemWithType("docsVersionDropdown"),
      then: DocsVersionDropdownNavbarItemSchema,
    },
    {
      is: itemWithType("doc"),
      then: DocItemSchema,
    },
    {
      is: itemWithType("localeDropdown"),
      then: LocaleDropdownNavbarItemSchema,
    },
    {
      is: itemWithType("search"),
      then: SearchItemSchema,
    },
    {
      is: itemWithType(undefined),
      then: Joi.object().when(Joi.ref("."), {
        // Dropdown item can be specified without type field
        is: Joi.object({
          items: Joi.array().required(),
        }).unknown(),
        then: DropdownNavbarItemSchema,
        otherwise: DefaultNavbarItemSchema,
      }),
    },
  ],
  otherwise: Joi.forbidden().messages({
    "any.unknown": "Bad navbar item type {.type}",
  }),
});

export const FooterSchema = Joi.object({
  copyright: Joi.string(),
  iconLinks: Joi.array()
    .items(
      Joi.object({
        icon: Joi.string().required(),
        to: Joi.string(),
        href: Joi.string(),
        description: Joi.string(),
        prependBaseUrlToHref: Joi.boolean(),
      })
        .xor("to", "href")
        .unknown()
    )
    .default([]),
  links: Joi.array().items(
    Joi.object({
      title: Joi.string(),
      icon: Joi.string(),
      items: Joi.array().items(
        Joi.object({
          to: Joi.string(),
          href: URISchema,
          html: Joi.string(),
          label: Joi.string(),
          icon: Joi.string(),
          prependBaseUrlToHref: Joi.boolean(),
        })
          .xor("to", "href", "html")
          .with("to", "label")
          .with("href", "label")
          .nand("html", "label")
          .nand("html", "icon")
          .unknown()
      ),
    }).default([])
  ),
}).optional();

export const PrismSchema = Joi.object({
  theme: Joi.object({
    plain: Joi.alternatives().try(Joi.array(), Joi.object()).required(),
    styles: Joi.alternatives().try(Joi.array(), Joi.object()).required(),
  }),
  darkTheme: Joi.object({
    plain: Joi.alternatives().try(Joi.array(), Joi.object()).required(),
    styles: Joi.alternatives().try(Joi.array(), Joi.object()).required(),
  }),
  defaultLanguage: Joi.string(),
  additionalLanguages: Joi.array()
    .items(Joi.string())
    .default(DEFAULT_CONFIG.prism.additionalLanguages),
})
  .default(DEFAULT_CONFIG.prism)
  .unknown();

export const CustomCssSchema = Joi.alternatives()
  .try(Joi.array().items(Joi.string().required()), Joi.string().required())
  .optional();

export const ThemeConfigSchema = Joi.object({
  colorMode: ColorModeSchema,
  docs: DocsSchema,
  metadatas: Joi.array()
    .items(MetadataSchema)
    .default(DEFAULT_CONFIG.metadatas),
  logo: LogoSchema,
  navbar: Joi.object({
    hideOnScroll: Joi.boolean().default(DEFAULT_CONFIG.navbar.hideOnScroll),
    items: Joi.array()
      .items(NavbarItemSchema)
      .default(DEFAULT_CONFIG.navbar.items),
  }),
  footer: FooterSchema,
  prism: PrismSchema,
  tailwindConfig: Joi.object().optional(),
  customCss: CustomCssSchema,
});

export function validateThemeConfig({ themeConfig, validate }) {
  return validate(ThemeConfigSchema, themeConfig);
}
