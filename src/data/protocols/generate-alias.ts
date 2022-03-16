export interface GenerateAlias {
  generate: () => Promise<GenerateAlias.Result>;
}

export namespace GenerateAlias {
  export type Result = string;
}
