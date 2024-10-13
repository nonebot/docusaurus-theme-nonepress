export type PluginOptions = {
  changelogPath: string;
  changelogDestPath: string;
  changelogHeader: string;
};

export type Options = Partial<PluginOptions>;
