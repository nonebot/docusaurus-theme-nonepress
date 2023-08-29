export type PluginOptions = Record<string, never>;

export type DocFrontmatter = {
  options?: { menu?: { category: string; weight?: number }[] };
};
