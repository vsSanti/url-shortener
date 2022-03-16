import faker from '@faker-js/faker';

import { DbLoadShortUrlByAlias } from '@/data/usecases';
import { LoadShortUrlByAlias } from '@/domain/usecases';

import { FindShortUrlByAliasRepositorySpy } from '@/tests/data/mocks';
import { throwError } from '@/tests/domain/mocks';

const mockParams = (): LoadShortUrlByAlias.Params => ({
  alias: faker.random.alphaNumeric(8),
});

describe('DbLoadShortUrlByAlias usecase', () => {
  let findShortUrlByAliasRepositorySpy: FindShortUrlByAliasRepositorySpy;
  let sut: DbLoadShortUrlByAlias;
  let params: LoadShortUrlByAlias.Params;

  beforeEach(() => {
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

  it('should throw if FindShortUrlByAliasRepository throws', async () => {
    jest.spyOn(findShortUrlByAliasRepositorySpy, 'findByAlias').mockImplementationOnce(throwError);
    const promise = sut.loadByAlias(params);
    await expect(promise).rejects.toThrow();
  });

  it('should return a short url on success', async () => {
    const response = await sut.loadByAlias(params);
    expect(response).toHaveProperty('url');
    expect(response).toHaveProperty('alias');
    expect(response?.url).toBe(findShortUrlByAliasRepositorySpy.result?.url);
    expect(response?.alias).toBe(findShortUrlByAliasRepositorySpy.result?.alias);
  });
});
