import { FindShortUrlByAliasRepository } from '@/data/protocols';

export class ShortUrlMongoRepository implements FindShortUrlByAliasRepository {
  async findByAlias({
    alias,
  }: FindShortUrlByAliasRepository.Params): Promise<FindShortUrlByAliasRepository.Result> {
    throw new Error();
  }
}
