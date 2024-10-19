export type PluginOptions = {
  changelogPath: string;
  changelogDestPath: string;
  changelogHeader: string;
  changelogPerPage: number;
};

export type Options = Partial<PluginOptions>;
