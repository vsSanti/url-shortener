import { FindShortUrlByAliasRepository, GenerateAlias } from '@/data/protocols';
import { AddShortUrl } from '@/domain/usecases';

export class DbAddShortUrl implements AddShortUrl {
  private readonly findShortUrlByAliasRepository: FindShortUrlByAliasRepository;
  private readonly generateAlias: GenerateAlias;

  constructor(params: DbAddShortUrl.ConstructorParams) {
    Object.assign(this, params);
  }

  async add(params: AddShortUrl.Params): Promise<AddShortUrl.Result> {
    this.generateAlias.generate();

    return {
      alias: 'alias',
      url: 'url',
    };
  }
}

declare namespace DbAddShortUrl {
  export type ConstructorParams = {
    findShortUrlByAliasRepository: FindShortUrlByAliasRepository;
    generateAlias: GenerateAlias;
  };
}
