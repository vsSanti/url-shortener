export interface FindShortUrlByAliasRepository {
  findByAlias: (
    params: FindShortUrlByAliasRepository.Params
  ) => Promise<FindShortUrlByAliasRepository.Result>;
}

export namespace FindShortUrlByAliasRepository {
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
