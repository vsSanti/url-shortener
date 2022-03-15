import faker from '@faker-js/faker';

import { FindShortUrlByAliasRepository } from '@/data/protocols';

export class FindShortUrlByAliasRepositorySpy implements FindShortUrlByAliasRepository {
  params: FindShortUrlByAliasRepository.Params;
  result: FindShortUrlByAliasRepository.Result = {
    alias: faker.datatype.string(),
    url: faker.internet.url(),
  };

  async findByAlias(
    params: FindShortUrlByAliasRepository.Params
  ): Promise<FindShortUrlByAliasRepository.Result> {
    this.params = params;
    return this.result;
  }
}
