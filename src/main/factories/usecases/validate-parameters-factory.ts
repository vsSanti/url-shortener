import { Schema } from 'joi';

import { ValidateParameters } from '@/data/usecases';
import { JoiAdapter } from '@/infra/adapter';

export const makeValidateParameters = (schema: Schema): ValidateParameters => {
  const validateParametersAdapter = new JoiAdapter({ schema });

  return new ValidateParameters({ validateParametersAdapter: validateParametersAdapter });
};
