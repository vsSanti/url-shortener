import { AddShortUrl, Validation } from '@/domain/usecases';
import { Controller, HttpResponse } from '@/presentation/protocols';
import { badRequest, noContent } from '@/presentation/helpers';

export class AddShortUrlController implements Controller {
  private readonly addShortUrl: AddShortUrl;
  private readonly validation: Validation;

  constructor(params: AddShortUrlController.ConstructorParams) {
    Object.assign(this, params);
  }

  async handle({ body }: AddShortUrlController.HandleParams): Promise<HttpResponse> {
    const error = await this.validation.validate(body);
    if (error) return badRequest(error);

    return noContent();
  }
}

export namespace AddShortUrlController {
  export type ConstructorParams = {
    addShortUrl: AddShortUrl;
    validation: Validation;
  };

  export type HandleParams = {
    body: { url: string };
  };
}
