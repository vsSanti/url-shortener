import { DbAddShortUrl } from '@/data/usecases';
import { AddShortUrl } from '@/domain/usecases';
import { ShortUrlMongoRepository } from '@/infra/db/mongodb';
import { NanoIDAdapter } from '@/infra/adapter';

export const makeDbAddShortUrl = (): AddShortUrl => {
  const generateAlias = new NanoIDAdapter();
  const shortUrlMongoRepository = new ShortUrlMongoRepository();

  return new DbAddShortUrl({
    addShortUrlRepository: shortUrlMongoRepository,
    generateAlias,
    findShortUrlByAliasRepository: shortUrlMongoRepository,
  });
};
