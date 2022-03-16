export interface AddShortUrl {
  add: (params: AddShortUrl.Params) => Promise<AddShortUrl.Result>;
}

export namespace AddShortUrl {
  export type Params = {
    url: string;
  };

  export type Result = {
    url: string;
    alias: string;
  };
}
