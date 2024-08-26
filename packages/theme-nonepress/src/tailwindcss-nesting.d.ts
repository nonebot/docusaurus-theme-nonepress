declare module "tailwindcss/nesting" {
  import { PluginCreator } from "postcss";

  import type pluginOptions from "postcss-nesting";

  const creator = PluginCreator<PluginCreator<pluginOptions>>;
  export default creator;
}
