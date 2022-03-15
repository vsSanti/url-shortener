import { ShortUrlMongoRepository } from '@/infra/db/mongodb';

describe('ShortUrlMongo Repository', () => {
  let sut: ShortUrlMongoRepository;

  beforeEach(async () => {
    sut = new ShortUrlMongoRepository();
  });

  describe('findByAlias()', () => {
    it('should return undefined if nothing is found', async () => {
      const response = await sut.findByAlias({ alias: 'alias' });
      expect(response).toBeUndefined();
    });
  });
});
