import { FindShortUrlByAliasRepository } from '@/data/protocols';
import { MongoHelper } from '@/infra/db/mongodb';
import { ShortUrlMongoModel } from '@/infra/db/mongodb/schemas';

export class ShortUrlMongoRepository implements FindShortUrlByAliasRepository {
  async findByAlias({
    alias,
  }: FindShortUrlByAliasRepository.Params): Promise<FindShortUrlByAliasRepository.Result> {
    const shortUrl = await ShortUrlMongoModel.findOne({ alias });

    return shortUrl ? MongoHelper.map(shortUrl.toJSON()) : undefined;
  }
}
