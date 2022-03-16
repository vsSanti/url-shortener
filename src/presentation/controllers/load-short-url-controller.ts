import { Validation } from '@/domain/usecases';
import { Controller, HttpResponse } from '@/presentation/protocols';
import { badRequest, noContent } from '@/presentation/helpers';

export class LoadShortUrlController implements Controller {
  private readonly validation: Validation;

  constructor(params: LoadShortUrlController.ConstructorParams) {
    Object.assign(this, params);
  }

  async handle({ params }: any): Promise<HttpResponse> {
    const error = await this.validation.validate(params);
    if (error) return badRequest(error);

    return noContent();
  }
}

export namespace LoadShortUrlController {
  export type ConstructorParams = {
    validation: Validation;
  };

  export type HandleParams = {
    params: {
      alias: string;
    };
  };
}
