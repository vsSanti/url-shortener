import {
  AddShortUrlRepository,
  FindShortUrlByAliasRepository,
  GenerateAlias,
} from '@/data/protocols';
import { AddShortUrl } from '@/domain/usecases';
import { ParameterInUseError } from '@/presentation/errors';

export class DbAddShortUrl implements AddShortUrl {
  private readonly addShortUrlRepository: AddShortUrlRepository;
  private readonly findShortUrlByAliasRepository: FindShortUrlByAliasRepository;
  private readonly generateAlias: GenerateAlias;

  constructor(params: DbAddShortUrl.ConstructorParams) {
    Object.assign(this, params);
  }

  async add({ url }: AddShortUrl.Params): Promise<AddShortUrl.Result> {
    const generatedAlias = await this.generateAlias.generate();

    const foundShortUrl = await this.findShortUrlByAliasRepository.findByAlias({
      alias: generatedAlias,
    });
    if (foundShortUrl) throw new ParameterInUseError('alias');

    const newShortUrl = await this.addShortUrlRepository.add({ alias: generatedAlias, url });

    return newShortUrl;
  }
}

declare namespace DbAddShortUrl {
  export type ConstructorParams = {
    addShortUrlRepository: AddShortUrlRepository;
    findShortUrlByAliasRepository: FindShortUrlByAliasRepository;
    generateAlias: GenerateAlias;
  };
}
