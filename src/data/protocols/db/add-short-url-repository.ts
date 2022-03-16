export interface AddShortUrlRepository {
  add: (params: AddShortUrlRepository.Params) => Promise<AddShortUrlRepository.Result>;
}

export namespace AddShortUrlRepository {
  export type Params = {
    alias: string;
    url: string;
  };

  export type Result = {
    alias: string;
    url: string;
  };
}
