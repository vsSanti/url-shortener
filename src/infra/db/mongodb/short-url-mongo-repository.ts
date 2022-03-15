import { FindShortUrlByAliasRepository } from '@/data/protocols';
import { ShortUrlMongoModel } from './schemas';

export class ShortUrlMongoRepository implements FindShortUrlByAliasRepository {
  async findByAlias({
    alias,
  }: FindShortUrlByAliasRepository.Params): Promise<FindShortUrlByAliasRepository.Result> {
    const shortUrl = await ShortUrlMongoModel.findOne({ alias });
    return shortUrl ?? undefined;
  }
}
