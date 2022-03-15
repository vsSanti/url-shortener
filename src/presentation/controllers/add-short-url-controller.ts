import { Validation } from '@/domain/usecases';
import { Controller, HttpResponse } from '@/presentation/protocols';

export class AddShortUrlController implements Controller {
  private readonly validation: Validation;

  constructor(params: AddShortUrlController.ConstructorParams) {
    Object.assign(this, params);
  }

  async handle({ body }: AddShortUrlController.HandleParams): Promise<HttpResponse> {
    throw new Error();
  }
}

export namespace AddShortUrlController {
  export type ConstructorParams = {
    validation: Validation;
  };

  export type HandleParams = {
    body: { url: string };
  };
}
