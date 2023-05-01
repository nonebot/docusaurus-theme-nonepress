import type { TranslationFile } from "@docusaurus/types";
import type { ThemeConfig } from "@nullbot/docusaurus-theme-nonepress";

export function getTranslationFiles({
  themeConfig,
}: {
  themeConfig: ThemeConfig;
}): TranslationFile[] {
  return [];
}
export function translateThemeConfig({
  themeConfig,
  translationFiles,
}: {
  themeConfig: ThemeConfig;
  translationFiles: TranslationFile[];
}): ThemeConfig {
  return {
    ...themeConfig,
  };
}
