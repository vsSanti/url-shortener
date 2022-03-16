import faker from '@faker-js/faker';

import { AddShortUrlRepository, FindShortUrlByAliasRepository } from '@/data/protocols';

export class AddShortUrlRepositorySpy implements AddShortUrlRepository {
  params: AddShortUrlRepository.Params;
  result: AddShortUrlRepository.Result = {
    alias: faker.datatype.string(),
    url: faker.internet.url(),
  };

  async add(params: AddShortUrlRepository.Params): Promise<AddShortUrlRepository.Result> {
    this.params = params;
    this.result.url = params.url;
    this.result.alias = params.alias;

    return this.result;
  }
}

export class FindShortUrlByAliasRepositorySpy implements FindShortUrlByAliasRepository {
  params: FindShortUrlByAliasRepository.Params;
  result: FindShortUrlByAliasRepository.Result = {
    id: faker.random.alphaNumeric(),
    alias: faker.random.alphaNumeric(),
    url: faker.internet.url(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  async findByAlias(
    params: FindShortUrlByAliasRepository.Params
  ): Promise<FindShortUrlByAliasRepository.Result> {
    this.params = params;
    return this.result;
  }
}
