import faker from '@faker-js/faker';

import { GenerateAlias } from '@/data/protocols';

export class GenerateAliasSpy implements GenerateAlias {
  result: GenerateAlias.Result = faker.random.alphaNumeric(8);

  async generate(): Promise<string> {
    return this.result;
  }
}
