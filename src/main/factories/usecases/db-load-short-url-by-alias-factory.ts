import { DbLoadShortUrlByAlias } from '@/data/usecases';
import { LoadShortUrlByAlias } from '@/domain/usecases';
import { ShortUrlMongoRepository } from '@/infra/db/mongodb';

export const makeDbLoadShortUrlByAlias = (): LoadShortUrlByAlias => {
  const shortUrlMongoRepository = new ShortUrlMongoRepository();

  return new DbLoadShortUrlByAlias({
    findShortUrlByAliasRepository: shortUrlMongoRepository,
  });
};
