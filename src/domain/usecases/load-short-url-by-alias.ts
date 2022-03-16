export interface LoadShortUrlByAlias {
  loadByAlias: (params: LoadShortUrlByAlias.Params) => Promise<LoadShortUrlByAlias.Result>;
}

export namespace LoadShortUrlByAlias {
  export type Params = {
    alias: string;
  };

  export type Result =
    | undefined
    | {
        url: string;
        alias: string;
      };
}
