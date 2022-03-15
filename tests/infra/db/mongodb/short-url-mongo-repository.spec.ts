import faker from '@faker-js/faker';

import { MongoHelper, ShortUrlMongoRepository } from '@/infra/db/mongodb';
import { ShortUrlMongoModel } from '@/infra/db/mongodb/schemas';

const makeAddShortUrlParams = () => ({ alias: faker.random.word(), url: faker.internet.url() });

describe('ShortUrlMongo Repository', () => {
  let sut: ShortUrlMongoRepository;
  let params: any;

  beforeAll(async () => {
    await MongoHelper.connect();
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    sut = new ShortUrlMongoRepository();
    params = makeAddShortUrlParams();
    await MongoHelper.clearCollection(ShortUrlMongoModel);
  });

  describe('findByAlias()', () => {
    it('should return undefined if nothing is found', async () => {
      const response = await sut.findByAlias({ alias: 'alias' });
      expect(response).toBeUndefined();
    });

    it('should return a short url on success', async () => {
      await new ShortUrlMongoModel(params).save();
      const response = await sut.findByAlias({ alias: params.alias });
      expect(response).toBeTruthy();
      expect(response?.alias).toBe(params.alias);
      expect(response?.url).toBe(params.url);
    });
  });
});
