import { Validation } from '@/domain/usecases';
import { Controller, HttpResponse } from '@/presentation/protocols';
import { noContent } from '@/presentation/helpers';

export class AddShortUrlController implements Controller {
  private readonly validation: Validation;

  constructor(params: AddShortUrlController.ConstructorParams) {
    Object.assign(this, params);
  }

  async handle({ body }: AddShortUrlController.HandleParams): Promise<HttpResponse> {
    this.validation.validate(body);

    return noContent();
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
