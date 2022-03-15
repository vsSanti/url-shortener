import faker from '@faker-js/faker';

import { DbAddShortUrl } from '@/data/usecases';
import { AddShortUrl } from '@/domain/usecases';

import { FindShortUrlByAliasRepositorySpy, GenerateAliasSpy } from '@/tests/data/mocks';
import { throwError } from '@/tests/domain/mocks';

const mockParams = (): AddShortUrl.Params => ({ url: faker.internet.url() });

describe('DbAddShortUrl usecase', () => {
  let findShortUrlByAliasRepositorySpy: FindShortUrlByAliasRepositorySpy;
  let generateAliasSpy: GenerateAliasSpy;
  let sut: DbAddShortUrl;
  let params: AddShortUrl.Params;

  beforeEach(() => {
    findShortUrlByAliasRepositorySpy = new FindShortUrlByAliasRepositorySpy();
    generateAliasSpy = new GenerateAliasSpy();
    sut = new DbAddShortUrl({
      findShortUrlByAliasRepository: findShortUrlByAliasRepositorySpy,
      generateAlias: generateAliasSpy,
    });
    params = mockParams();
  });

  it('should call GenerateAlias once', async () => {
    const generateAliasSpyMock = jest.spyOn(generateAliasSpy, 'generate');
    await sut.add(params);
    expect(generateAliasSpyMock).toHaveBeenCalledTimes(1);
  });

  it('should throw if GenerateAlias throws', async () => {
    jest.spyOn(generateAliasSpy, 'generate').mockImplementationOnce(throwError);
    const promise = sut.add(params);
    await expect(promise).rejects.toThrow();
  });

  it('should call FindShortUrlByAliasRepository with correct params', async () => {
    await sut.add(params);
    expect(findShortUrlByAliasRepositorySpy.params).toEqual({ alias: generateAliasSpy.result });
  });
});
