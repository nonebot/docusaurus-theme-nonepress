export type PluginOptions = {
  changelogPath: string;
  changelogDestPath: string;
  changelogHeader: string;
  changelogPerPage: number;
  changelogSidebarID: string;
};

export type Options = Partial<PluginOptions>;
