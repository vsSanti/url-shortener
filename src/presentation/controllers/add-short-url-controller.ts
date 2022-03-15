import { AddShortUrl, Validation } from '@/domain/usecases';
import { Controller, HttpResponse } from '@/presentation/protocols';
import { badRequest, conflict, noContent } from '@/presentation/helpers';
import { ParameterInUseError } from '@/presentation/errors';

export class AddShortUrlController implements Controller {
  private readonly addShortUrl: AddShortUrl;
  private readonly validation: Validation;

  constructor(params: AddShortUrlController.ConstructorParams) {
    Object.assign(this, params);
  }

  async handle({ body }: AddShortUrlController.HandleParams): Promise<HttpResponse> {
    try {
      const error = await this.validation.validate(body);
      if (error) return badRequest(error);

      this.addShortUrl.add(body);

      return noContent();
    } catch (error) {
      if (error instanceof ParameterInUseError) return conflict(error);
      throw error;
    }
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
