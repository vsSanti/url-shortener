import { AddShortUrlRepository, FindShortUrlByAliasRepository } from '@/data/protocols';
import { MongoHelper } from '@/infra/db/mongodb';
import { ShortUrlMongoModel } from '@/infra/db/mongodb/schemas';

export class ShortUrlMongoRepository
  implements AddShortUrlRepository, FindShortUrlByAliasRepository
{
  async add({ alias, url }: AddShortUrlRepository.Params): Promise<AddShortUrlRepository.Result> {
    const response = await new ShortUrlMongoModel({ alias, url }).save();
    return MongoHelper.map(response.toJSON());
  }

  async findByAlias({
    alias,
  }: FindShortUrlByAliasRepository.Params): Promise<FindShortUrlByAliasRepository.Result> {
    const shortUrl = await ShortUrlMongoModel.findOne({ alias });

    return shortUrl ? MongoHelper.map(shortUrl.toJSON()) : undefined;
  }
}
