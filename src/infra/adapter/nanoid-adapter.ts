import { nanoid } from 'nanoid';

import { GenerateAlias } from '@/data/protocols';

export class NanoIDAdapter implements GenerateAlias {
  async generate(): Promise<GenerateAlias.Result> {
    return nanoid(8);
  }
}
