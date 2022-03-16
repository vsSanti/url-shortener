import { FindShortUrlByAliasRepository } from '@/data/protocols';
import { LoadShortUrlByAlias } from '@/domain/usecases';

export class DbLoadShortUrlByAlias implements LoadShortUrlByAlias {
  private readonly findShortUrlByAliasRepository: FindShortUrlByAliasRepository;

  constructor(params: DbLoadShortUrlByAlias.ConstructorParams) {
    Object.assign(this, params);
  }

  async loadByAlias({ alias }: LoadShortUrlByAlias.Params): Promise<LoadShortUrlByAlias.Result> {
    const shortUrl = await this.findShortUrlByAliasRepository.findByAlias({ alias });
    if (!shortUrl) return undefined;

    return shortUrl;
  }
}

export namespace DbLoadShortUrlByAlias {
  export type ConstructorParams = {
    findShortUrlByAliasRepository: FindShortUrlByAliasRepository;
  };
}
