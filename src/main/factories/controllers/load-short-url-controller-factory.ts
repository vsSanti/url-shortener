import Joi from 'joi';

import { makeDbLoadShortUrlByAlias, makeValidateParameters } from '@/main/factories';
import { LoadShortUrlController } from '@/presentation/controllers';
import { Controller } from '@/presentation/protocols';

export const makeLoadShortUrlController = (): Controller => {
  const schema = Joi.object({ alias: Joi.string().required() });

  return new LoadShortUrlController({
    loadShortUrlByAlias: makeDbLoadShortUrlByAlias(),
    validation: makeValidateParameters(schema),
  });
};
