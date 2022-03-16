import faker from '@faker-js/faker';

import { DbLoadShortUrlByAlias } from '@/data/usecases';
import { LoadShortUrlByAlias } from '@/domain/usecases';

import { FindShortUrlByAliasRepositorySpy } from '@/tests/data/mocks';

const mockParams = (): LoadShortUrlByAlias.Params => ({
  alias: faker.random.alphaNumeric(8),
});

describe('DbLoadShortUrlByAlias usecase', () => {
  let findShortUrlByAliasRepositorySpy: FindShortUrlByAliasRepositorySpy;
  let sut: DbLoadShortUrlByAlias;
  let params: LoadShortUrlByAlias.Params;

  beforeAll(() => {
    findShortUrlByAliasRepositorySpy = new FindShortUrlByAliasRepositorySpy();
    sut = new DbLoadShortUrlByAlias({
      findShortUrlByAliasRepository: findShortUrlByAliasRepositorySpy,
    });

    params = mockParams();
  });

  it('should call FindShortUrlByAliasRepository with correct params', async () => {
    await sut.loadByAlias(params);
    expect(findShortUrlByAliasRepositorySpy.params).toEqual(params);
  });

  it('should return undefined if FindShortUrlByAliasRepository returns undefined', async () => {
    findShortUrlByAliasRepositorySpy.result = undefined;
    const response = await sut.loadByAlias(params);
    expect(response).toBeUndefined();
  });
});
