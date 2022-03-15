import { Schema } from 'joi';

import { ValidateParametersAdapter } from '@/data/protocols';

export class JoiAdapter implements ValidateParametersAdapter {
  private readonly schema: Schema;

  constructor(params: JoiAdapter.ConstructorParams) {
    Object.assign(this, params);
  }

  async validate(params: any): Promise<void> {
    await this.schema.validateAsync(params);
  }
}

declare namespace JoiAdapter {
  export type ConstructorParams = {
    schema: Schema;
  };
}
