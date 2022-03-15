import faker from '@faker-js/faker';

import { DbAddShortUrl } from '@/data/usecases';
import { AddShortUrl } from '@/domain/usecases';
import { ParameterInUseError } from '@/presentation/errors';

import {
  AddShortUrlRepositorySpy,
  FindShortUrlByAliasRepositorySpy,
  GenerateAliasSpy,
} from '@/tests/data/mocks';
import { throwError } from '@/tests/domain/mocks';

const mockParams = (): AddShortUrl.Params => ({ url: faker.internet.url() });

describe('DbAddShortUrl usecase', () => {
  let addShortUrlRepositorySpy: AddShortUrlRepositorySpy;
  let findShortUrlByAliasRepositorySpy: FindShortUrlByAliasRepositorySpy;
  let generateAliasSpy: GenerateAliasSpy;
  let sut: DbAddShortUrl;
  let params: AddShortUrl.Params;

  beforeEach(() => {
    addShortUrlRepositorySpy = new AddShortUrlRepositorySpy();
    findShortUrlByAliasRepositorySpy = new FindShortUrlByAliasRepositorySpy();
    generateAliasSpy = new GenerateAliasSpy();
    sut = new DbAddShortUrl({
      addShortUrlRepository: addShortUrlRepositorySpy,
      findShortUrlByAliasRepository: findShortUrlByAliasRepositorySpy,
      generateAlias: generateAliasSpy,
    });
    params = mockParams();

    findShortUrlByAliasRepositorySpy.result = undefined;
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

  it('should throw ParameterInUseError if FindShortUrlByAliasRepository finds something', async () => {
    findShortUrlByAliasRepositorySpy.result = {
      alias: faker.random.alphaNumeric(8),
      url: faker.internet.url(),
    };
    const promise = sut.add(params);
    await expect(promise).rejects.toThrow(ParameterInUseError);
  });

  it('should throw if FindShortUrlByAliasRepository throws', async () => {
    jest.spyOn(findShortUrlByAliasRepositorySpy, 'findByAlias').mockImplementationOnce(throwError);
    const promise = sut.add(params);
    await expect(promise).rejects.toThrow();
  });

  it('should call AddShortUrlRepository with correct params', async () => {
    await sut.add(params);
    expect(addShortUrlRepositorySpy.params.alias).toBe(generateAliasSpy.result);
    expect(addShortUrlRepositorySpy.params.url).toBe(params.url);
  });

  it('should throw if AddShortUrlRepository throws', async () => {
    jest.spyOn(addShortUrlRepositorySpy, 'add').mockImplementationOnce(throwError);
    const promise = sut.add(params);
    await expect(promise).rejects.toThrow();
  });

  it('should return a short url on success', async () => {
    const response = await sut.add(params);
    expect(response).toEqual(addShortUrlRepositorySpy.result);
  });
});
