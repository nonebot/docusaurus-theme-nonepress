import type {
  OptionValidationContext,
  ThemeConfigValidationContext,
} from "@docusaurus/types";
import { Joi, URISchema } from "@docusaurus/utils-validation";
import type {
  Options,
  PluginOptions,
  ThemeConfig,
  UserThemeConfig,
} from "@nullbot/docusaurus-theme-nonepress";
import defaultPrismTheme from "prism-react-renderer/themes/palenight";

const DEFAULT_DOCS_CONFIG: ThemeConfig["docs"] = {
  versionPersistence: "localStorage",
  sidebar: {
    hideable: true,
    autoCollapseCategories: true,
  },
};

const DEFAULT_COLOR_MODE_CONFIG: ThemeConfig["colorMode"] = {
  defaultMode: "light",
  disableSwitch: false,
  respectPrefersColorScheme: true,
};

export const DEFAULT_CONFIG: Omit<ThemeConfig, "algolia"> = {
  docs: DEFAULT_DOCS_CONFIG,
  colorMode: DEFAULT_COLOR_MODE_CONFIG,
  metadata: [],
  prism: {
    additionalLanguages: [],
    theme: defaultPrismTheme,
    magicComments: [
      {
        className: "theme-code-block-highlighted-line",
        line: "highlight-next-line",
        block: { start: "highlight-start", end: "highlight-end" },
      },
    ],
  },
  navbar: {
    hideOnScroll: true,
    items: [],
  },
  tableOfContents: {
    minHeadingLevel: 2,
    maxHeadingLevel: 3,
  },
  nonepress: {
    navbar: {
      docsVersionDropdown: {
        enabled: true,
        dropdownItemsBefore: [],
        dropdownItemsAfter: [],
      },
      localeDropdown: {
        enabled: true,
        dropdownItemsBefore: [],
        dropdownItemsAfter: [],
      },
    },
    footer: {},
  },
};

const DocsSchema = Joi.object({
  versionPersistence: Joi.string()
    .equal("localStorage", "none")
    .default(DEFAULT_DOCS_CONFIG.versionPersistence),
  sidebar: Joi.object({
    hideable: Joi.bool().default(DEFAULT_DOCS_CONFIG.sidebar.hideable),
    autoCollapseCategories: Joi.bool().default(
      DEFAULT_DOCS_CONFIG.sidebar.autoCollapseCategories,
    ),
  }).default(DEFAULT_DOCS_CONFIG.sidebar),
}).default(DEFAULT_DOCS_CONFIG);

const ColorModeSchema = Joi.object({
  defaultMode: Joi.string()
    .equal("dark", "light")
    .default(DEFAULT_COLOR_MODE_CONFIG.defaultMode),
  disableSwitch: Joi.bool().default(DEFAULT_COLOR_MODE_CONFIG.disableSwitch),
  respectPrefersColorScheme: Joi.bool().default(
    DEFAULT_COLOR_MODE_CONFIG.respectPrefersColorScheme,
  ),
}).default(DEFAULT_COLOR_MODE_CONFIG);

const HtmlMetadataSchema = Joi.object({
  id: Joi.string(),
  name: Joi.string(),
  property: Joi.string(),
  content: Joi.string(),
  itemprop: Joi.string(),
}).unknown();

const NavbarItemBaseSchema = Joi.object({
  label: Joi.string(),
  html: Joi.string(),
  className: Joi.string(),
})
  .nand("html", "label")
  .unknown();

// simple link
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

// docs version
const DocsVersionNavbarItemSchema = NavbarItemBaseSchema.append({
  type: Joi.string().equal("docsVersion").required(),
  to: Joi.string(),
  docsPluginId: Joi.string(),
});

// doc
const DocItemSchema = NavbarItemBaseSchema.append({
  type: Joi.string().equal("doc").required(),
  docId: Joi.string().required(),
  docsPluginId: Joi.string(),
});

// doc sidebar
const DocSidebarItemSchema = NavbarItemBaseSchema.append({
  type: Joi.string().equal("docSidebar").required(),
  sidebarId: Joi.string().required(),
  docsPluginId: Joi.string(),
});

// html
const HtmlNavbarItemSchema = Joi.object({
  type: Joi.string().equal("html").required(),
  className: Joi.string(),
  value: Joi.string().required(),
});

// custom
const CustomNavbarItemRegexp = /custom-.*/;
const CustomNavbarItemSchema = Joi.object({
  type: Joi.string().regex(CustomNavbarItemRegexp).required(),
}).unknown();

const itemWithType = (type: string | RegExp | undefined) => {
  // Because equal(undefined) is not supported :/
  const typeSchema =
    type instanceof RegExp
      ? Joi.string().required().regex(type)
      : type
      ? Joi.string().required().equal(type)
      : Joi.string().forbidden();
  return Joi.object({
    type: typeSchema,
  })
    .unknown()
    .required();
};

// dropdown
const DropdownSubitemSchema = Joi.object({
  position: Joi.forbidden(),
}).when(".", {
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
      is: itemWithType("docSidebar"),
      then: DocSidebarItemSchema,
    },
    {
      is: itemWithType(undefined),
      then: DefaultNavbarItemSchema,
    },
    {
      is: itemWithType("html"),
      then: HtmlNavbarItemSchema,
    },
    {
      is: itemWithType(CustomNavbarItemRegexp),
      then: CustomNavbarItemSchema,
    },
    {
      is: Joi.alternatives().try(
        itemWithType("dropdown"),
        itemWithType("docsVersionDropdown"),
        itemWithType("localeDropdown"),
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

// docs menu
const DocsMenuNavbarItemSchema = NavbarItemBaseSchema.append({
  type: Joi.string().equal("docsMenu").required(),
  docId: Joi.string(),
  docsPluginId: Joi.string(),
  category: Joi.string().required(),
});

const NavbarItemSchema = Joi.object().when(".", {
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
      is: itemWithType("doc"),
      then: DocItemSchema,
    },
    {
      is: itemWithType("docSidebar"),
      then: DocSidebarItemSchema,
    },
    {
      is: itemWithType("docsMenu"),
      then: DocsMenuNavbarItemSchema,
    },
    {
      is: itemWithType("html"),
      then: HtmlNavbarItemSchema,
    },
    {
      is: itemWithType(CustomNavbarItemRegexp),
      then: CustomNavbarItemSchema,
    },
    {
      is: itemWithType(undefined),
      then: Joi.object().when(".", {
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

const FooterLinkItemSchema = Joi.object({
  to: Joi.string(),
  href: URISchema,
  html: Joi.string(),
  label: Joi.string(),
})
  .xor("to", "href", "html")
  .with("to", "label")
  .with("href", "label")
  .nand("html", "label")
  // We allow any unknown attributes on the links (users may need additional
  // attributes like target, aria-role, data-customAttribute...)
  .unknown();

const LogoSchema = Joi.object({
  alt: Joi.string().allow(""),
  src: Joi.string().required(),
  srcDark: Joi.string(),
  width: Joi.alternatives().try(Joi.string(), Joi.number()),
  height: Joi.alternatives().try(Joi.string(), Joi.number()),
  href: Joi.string(),
  target: Joi.string(),
  style: Joi.object(),
  className: Joi.string(),
});

// nonepress
const SocialLinkSchema = Joi.object({
  icon: Joi.array().items(Joi.string()).length(2).required(),
  href: Joi.string().required(),
});
const NonepressSchema = Joi.object({
  tailwindConfig: Joi.object().unknown(),
  navbar: Joi.object({
    docsVersionDropdown: Joi.object({
      enabled: Joi.boolean().default(
        DEFAULT_CONFIG.nonepress.navbar.docsVersionDropdown.enabled,
      ),
      docsPluginId: Joi.string(),
      dropdownItemsBefore: Joi.array()
        .items(DropdownSubitemSchema)
        .default(
          DEFAULT_CONFIG.nonepress.navbar.docsVersionDropdown
            .dropdownItemsBefore,
        ),
      dropdownItemsAfter: Joi.array()
        .items(DropdownSubitemSchema)
        .default(
          DEFAULT_CONFIG.nonepress.navbar.docsVersionDropdown
            .dropdownItemsAfter,
        ),
    }).default(DEFAULT_CONFIG.nonepress.navbar.docsVersionDropdown),
    localeDropdown: Joi.object({
      enabled: Joi.boolean().default(
        DEFAULT_CONFIG.nonepress.navbar.localeDropdown.enabled,
      ),
      dropdownItemsBefore: Joi.array()
        .items(DropdownSubitemSchema)
        .default(
          DEFAULT_CONFIG.nonepress.navbar.localeDropdown.dropdownItemsBefore,
        ),
      dropdownItemsAfter: Joi.array()
        .items(DropdownSubitemSchema)
        .default(
          DEFAULT_CONFIG.nonepress.navbar.localeDropdown.dropdownItemsAfter,
        ),
      queryString: Joi.string(),
    }).default(DEFAULT_CONFIG.nonepress.navbar.localeDropdown),
    socialLinks: Joi.array().items(SocialLinkSchema),
  }),
  footer: Joi.object({
    socialLinks: Joi.array().items(SocialLinkSchema),
  }).default(DEFAULT_CONFIG.nonepress.footer),
}).default(DEFAULT_CONFIG.nonepress);

export const ThemeConfigSchema = Joi.object({
  colorMode: ColorModeSchema,
  image: Joi.string(),
  docs: DocsSchema,
  metadata: Joi.array()
    .items(HtmlMetadataSchema)
    .default(DEFAULT_CONFIG.metadata),
  announcementBar: Joi.object({
    id: Joi.string().default("announcement-bar"),
    content: Joi.string().required(),
    backgroundColor: Joi.string(),
    textColor: Joi.string(),
    isCloseable: Joi.bool().default(true),
  }).optional(),
  navbar: Joi.object({
    style: Joi.string().equal("dark", "primary"),
    hideOnScroll: Joi.bool().default(DEFAULT_CONFIG.navbar.hideOnScroll),
    items: Joi.array()
      .items(NavbarItemSchema)
      .default(DEFAULT_CONFIG.navbar.items),
    title: Joi.string().allow("", null),
    logo: LogoSchema,
  }).default(DEFAULT_CONFIG.navbar),
  footer: Joi.object({
    style: Joi.string().equal("dark", "light").default("light"),
    logo: LogoSchema,
    copyright: Joi.string(),
    links: Joi.alternatives(
      Joi.array().items(
        Joi.object({
          title: Joi.string().allow(null).default(null),
          items: Joi.array().items(FooterLinkItemSchema).default([]),
        }),
      ),
      Joi.array().items(FooterLinkItemSchema),
    )
      .messages({
        "alternatives.match":
          "The footer must be either simple or multi-column, and not a mix of the two. See: https://docusaurus.io/docs/api/themes/configuration#footer-links",
      })
      .default([]),
  }).optional(),
  prism: Joi.object({
    theme: Joi.object({
      plain: Joi.alternatives().try(Joi.array(), Joi.object()).required(),
      styles: Joi.alternatives().try(Joi.array(), Joi.object()).required(),
    }).default(DEFAULT_CONFIG.prism.theme),
    darkTheme: Joi.object({
      plain: Joi.alternatives().try(Joi.array(), Joi.object()).required(),
      styles: Joi.alternatives().try(Joi.array(), Joi.object()).required(),
    }),
    defaultLanguage: Joi.string(),
    additionalLanguages: Joi.array()
      .items(Joi.string())
      .default(DEFAULT_CONFIG.prism.additionalLanguages),
    magicComments: Joi.array()
      .items(
        Joi.object({
          className: Joi.string().required(),
          line: Joi.string(),
          block: Joi.object({
            start: Joi.string().required(),
            end: Joi.string().required(),
          }),
        }).or("line", "block"),
      )
      .default(DEFAULT_CONFIG.prism.magicComments),
  })
    .default(DEFAULT_CONFIG.prism)
    .unknown(),
  tableOfContents: Joi.object({
    minHeadingLevel: Joi.number()
      .default(DEFAULT_CONFIG.tableOfContents.minHeadingLevel)
      .when("maxHeadingLevel", {
        is: Joi.exist(),
        then: Joi.number()
          .integer()
          .min(2)
          .max(6)
          .max(Joi.ref("maxHeadingLevel")),
        otherwise: Joi.number().integer().min(2).max(6),
      }),
    maxHeadingLevel: Joi.number()
      .integer()
      .min(2)
      .max(6)
      .default(DEFAULT_CONFIG.tableOfContents.maxHeadingLevel),
  }).default(DEFAULT_CONFIG.tableOfContents),
  nonepress: NonepressSchema,
});

export function validateThemeConfig({
  themeConfig,
  validate,
}: ThemeConfigValidationContext<UserThemeConfig, ThemeConfig>): ThemeConfig {
  return validate(ThemeConfigSchema, themeConfig);
}

const DEFAULT_OPTIONS = {
  customCss: [],
};
export const PluginOptionSchema = Joi.object<PluginOptions>({
  customCss: Joi.alternatives()
    .try(
      Joi.array().items(Joi.string().required()),
      Joi.alternatives().conditional(Joi.string().required(), {
        then: Joi.custom((val: string) => [val]),
        otherwise: Joi.forbidden().messages({
          "any.unknown": '"customCss" must be a string or an array of strings',
        }),
      }),
    )
    .default(DEFAULT_OPTIONS.customCss),
});

export function validateOptions({
  validate,
  options,
}: OptionValidationContext<Options, PluginOptions>): PluginOptions {
  const validatedOptions = validate(PluginOptionSchema, options);
  return validatedOptions;
}
