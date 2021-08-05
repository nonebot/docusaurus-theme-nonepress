import { Joi } from "@docusaurus/utils-validation";

export const FooterConfigSchema = Joi.object({
  copyright: Joi.string(),
}).optional();

export const ThemeConfigSchema = Joi.object({
  footer: FooterConfigSchema,
});

export function validateThemeConfig({ themeConfig, validate }) {
  return validate(ThemeConfigSchema, themeConfig);
}
