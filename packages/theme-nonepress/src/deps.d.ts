declare module "@docsearch/react/modal";

declare module "@docsearch/react/style";

// TODO incompatible declaration file
declare module "eta" {
  export const defaultConfig: object;

  export function compile(
    template: string,
    options?: object,
  ): (data: object, config: object) => string;
}
