import Joi from 'joi';

import { makeDbAddShortUrl, makeValidateParameters } from '@/main/factories';
import { AddShortUrlController } from '@/presentation/controllers';
import { Controller } from '@/presentation/protocols';

export const makeAddShortUrlController = (): Controller => {
  const schema = Joi.object({ url: Joi.string().trim().uri().required() });

  const controller = new AddShortUrlController({
    addShortUrl: makeDbAddShortUrl(),
    validation: makeValidateParameters(schema),
  });

  return controller;
};
