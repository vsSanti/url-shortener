import { GenerateAlias } from '@/data/protocols';
import { AddShortUrl } from '@/domain/usecases';

export class DbAddShortUrl implements AddShortUrl {
  private readonly generateAlias: GenerateAlias;

  constructor(params: DbAddShortUrl.ConstructorParams) {
    Object.assign(this, params);
  }

  async add(params: AddShortUrl.Params): Promise<AddShortUrl.Result> {
    return {
      alias: 'alias',
      url: 'url',
    };
  }
}

declare namespace DbAddShortUrl {
  export type ConstructorParams = {
    generateAlias: GenerateAlias;
  };
}
