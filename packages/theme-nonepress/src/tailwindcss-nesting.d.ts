declare module "tailwindcss/nesting" {
  import type { PluginCreator } from "postcss";
  import type pluginOptions from "postcss-nesting";

  const creator = PluginCreator<PluginCreator<pluginOptions>>;
  export default creator;
}
