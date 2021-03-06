import { Joi, URISchema } from "@docusaurus/utils-validation";

const DEFAULT_DOCS_CONFIG = {
  versionPersistence: "localStorage",
};

const DEFAULT_COLOR_MODE_CONFIG = {
  defaultMode: "light",
  disableSwitch: false,
  respectPrefersColorScheme: true,
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
  hideableSidebar: false,
  metadatas: [],
  logo: {
    href: "/",
  },
  prism: {
    additionalLanguages: [],
  },
  algolia: {
    contextualSearch: false, // future: maybe we want to enable this by default

    // By default, all Docusaurus sites are using the same AppId
    // This has been designed on purpose with Algolia.
    appId: "BH4D9OD16A",

    searchParameters: {},
  },
  tableOfContents: {
    minHeadingLevel: 2,
    maxHeadingLevel: 3,
  },
};

const ColorModeSchema = Joi.object({
  defaultMode: Joi.string()
    .equal("dark", "light")
    .default(DEFAULT_COLOR_MODE_CONFIG.defaultMode),
  disableSwitch: Joi.bool().default(DEFAULT_COLOR_MODE_CONFIG.disableSwitch),
  respectPrefersColorScheme: Joi.bool().default(
    DEFAULT_COLOR_MODE_CONFIG.respectPrefersColorScheme
  ),
  switchConfig: Joi.object({
    darkIcon: Joi.array().items(Joi.string()).length(2),
    darkIconText: Joi.string().default(
      DEFAULT_COLOR_MODE_CONFIG.switchConfig.darkIconText
    ),
    lightIcon: Joi.array().items(Joi.string()).length(2),
    lightIconText: Joi.string().default(
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
  icon: Joi.array().items(Joi.string()).length(2),
  className: Joi.string(),
}).unknown();

// simple link
const DefaultNavbarItemSchema = NavbarItemBaseSchema.append({
  to: Joi.string(),
  href: URISchema,
  prependBaseUrlToHref: Joi.bool(),
  items: Joi.forbidden().messages({
    "any.unknown": "Nested dropdowns are not allowed",
  }),
})
  .xor("href", "to")
  .messages({
    "object.xor": 'One and only one between "to" and "href" should be provided',
  });

// doc link
const DocLinkNavbarItemSchema = NavbarItemBaseSchema.append({
  docId: Joi.string().required(),
  docsPluginId: Joi.string(),
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

// dropdown
const DropdownSubitemSchema = Joi.object().when(Joi.ref("."), {
  switch: [
    {
      is: itemWithType("docLink"),
      then: DocLinkNavbarItemSchema,
    },
    {
      is: itemWithType(undefined),
      then: DefaultNavbarItemSchema,
    },
  ],
  otherwise: Joi.forbidden().messages({
    "any.unknown": "Bad navbar item type {.type}",
  }),
});

const DropdownNavbarItemSchema = NavbarItemBaseSchema.append({
  to: Joi.string(),
  href: URISchema,
  prependBaseUrlToHref: Joi.bool(),
  items: Joi.array().items(DropdownSubitemSchema).required(),
})
  .xor("href", "to")
  .messages({
    "object.xor": 'One and only one between "to" and "href" should be provided',
  });

// docs menu
const DocsMenuDropdownNavbarItemSchema = NavbarItemBaseSchema.append({
  docId: Joi.string(),
  docsPluginId: Joi.string(),
  type: Joi.string().equal("docsMenu").required(),
  category: Joi.string().optional(),
});

export const NavbarItemSchema = Joi.object().when(Joi.ref("."), {
  switch: [
    {
      is: itemWithType("dropdown"),
      then: DropdownNavbarItemSchema,
    },
    {
      is: itemWithType("docsMenu"),
      then: DocsMenuDropdownNavbarItemSchema,
    },
    {
      is: itemWithType("docLink"),
      then: DocLinkNavbarItemSchema,
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
        icon: Joi.array().items(Joi.string()).length(2).required(),
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
      icon: Joi.array().items(Joi.string()).length(2),
      items: Joi.array().items(
        Joi.object({
          to: Joi.string(),
          href: URISchema,
          html: Joi.string(),
          label: Joi.string(),
          icon: Joi.array().items(Joi.string()).length(2),
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
    docsVersionItemBefore: Joi.array().items(DropdownSubitemSchema).default([]),
    docsVersionItemAfter: Joi.array().items(DropdownSubitemSchema).default([]),
  }),
  footer: FooterSchema,
  hideableSidebar: Joi.boolean().default(DEFAULT_CONFIG.hideableSidebar),
  prism: PrismSchema,
  algolia: Joi.object({
    // Docusaurus attributes
    contextualSearch: Joi.boolean().default(
      DEFAULT_CONFIG.algolia.contextualSearch
    ),
    externalUrlRegex: Joi.string().optional(),
    // Algolia attributes
    appId: Joi.string().default(DEFAULT_CONFIG.algolia.appId),
    apiKey: Joi.string().required(),
    indexName: Joi.string().required(),
    searchParameters: Joi.object()
      .default(DEFAULT_CONFIG.algolia.searchParameters)
      .unknown(),
  })
    .label("themeConfig.algolia")
    .required()
    .unknown(),
  tailwindConfig: Joi.object().optional(),
  customCss: CustomCssSchema,
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
});

export function validateThemeConfig({ themeConfig, validate }) {
  return validate(ThemeConfigSchema, themeConfig);
}
