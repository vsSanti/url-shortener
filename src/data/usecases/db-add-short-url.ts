import { FindShortUrlByAliasRepository, GenerateAlias } from '@/data/protocols';
import { AddShortUrl } from '@/domain/usecases';
import { ParameterInUseError } from '@/presentation/errors';

export class DbAddShortUrl implements AddShortUrl {
  private readonly findShortUrlByAliasRepository: FindShortUrlByAliasRepository;
  private readonly generateAlias: GenerateAlias;

  constructor(params: DbAddShortUrl.ConstructorParams) {
    Object.assign(this, params);
  }

  async add(params: AddShortUrl.Params): Promise<AddShortUrl.Result> {
    const generatedAlias = await this.generateAlias.generate();

    const foundShortUrl = await this.findShortUrlByAliasRepository.findByAlias({
      alias: generatedAlias,
    });
    if (foundShortUrl) throw new ParameterInUseError('alias');

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
