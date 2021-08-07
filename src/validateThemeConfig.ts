import { Joi, URISchema } from "@docusaurus/utils-validation";

const DEFAULT_COLOR_MODE_CONFIG = {
  defaultMode: "light",
  disableSwitch: false,
  switchConfig: {
    darkIcon: "🌜",
    darkIconStyle: {},
    lightIcon: "🌞",
    lightIconStyle: {},
  },
};

export const DEFAULT_CONFIG = {
  colorMode: DEFAULT_COLOR_MODE_CONFIG,
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
    darkIcon: Joi.string().default(
      DEFAULT_COLOR_MODE_CONFIG.switchConfig.darkIcon
    ),
    darkIconStyle: Joi.object().default(
      DEFAULT_COLOR_MODE_CONFIG.switchConfig.darkIconStyle
    ),
    lightIcon: Joi.string().default(
      DEFAULT_COLOR_MODE_CONFIG.switchConfig.lightIcon
    ),
    lightIconStyle: Joi.object().default(
      DEFAULT_COLOR_MODE_CONFIG.switchConfig.lightIconStyle
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
  metadatas: Joi.array()
    .items(MetadataSchema)
    .default(DEFAULT_CONFIG.metadatas),
  logo: LogoSchema,
  footer: FooterSchema,
  prism: PrismSchema,
  tailwindConfig: Joi.object().optional(),
  customCss: CustomCssSchema,
});

export function validateThemeConfig({ themeConfig, validate }) {
  return validate(ThemeConfigSchema, themeConfig);
}
