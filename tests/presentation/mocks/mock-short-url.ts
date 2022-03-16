import faker from '@faker-js/faker';

import { AddShortUrl, LoadShortUrlByAlias } from '@/domain/usecases';

export class AddShortUrlSpy implements AddShortUrl {
  params: AddShortUrl.Params;
  result: AddShortUrl.Result = {
    alias: faker.random.alphaNumeric(8),
    url: faker.internet.url(),
  };

  async add(params: AddShortUrl.Params): Promise<AddShortUrl.Result> {
    this.params = params;
    return this.result;
  }
}

export class LoadShortUrlByAliasSpy implements LoadShortUrlByAlias {
  params: LoadShortUrlByAlias.Params;
  result: LoadShortUrlByAlias.Result = {
    alias: faker.random.alphaNumeric(8),
    url: faker.internet.url(),
  };

  async loadByAlias(params: LoadShortUrlByAlias.Params): Promise<LoadShortUrlByAlias.Result> {
    this.params = params;
    return this.result;
  }
}
