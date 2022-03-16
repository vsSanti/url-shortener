import { LoadShortUrlByAlias, Validation } from '@/domain/usecases';
import { Controller, HttpResponse } from '@/presentation/protocols';
import { badRequest, movedPermanently, notFound } from '@/presentation/helpers';

export class LoadShortUrlController implements Controller {
  private readonly loadShortUrlByAlias: LoadShortUrlByAlias;
  private readonly validation: Validation;

  constructor(params: LoadShortUrlController.ConstructorParams) {
    Object.assign(this, params);
  }

  async handle({ params }: any): Promise<HttpResponse> {
    const error = await this.validation.validate(params);
    if (error) return badRequest(error);

    const { alias } = params;
    const shortUrl = await this.loadShortUrlByAlias.loadByAlias({ alias });
    if (!shortUrl) return notFound();

    return movedPermanently(shortUrl.url);
  }
}

export namespace LoadShortUrlController {
  export type ConstructorParams = {
    loadShortUrlByAlias: LoadShortUrlByAlias;
    validation: Validation;
  };

  export type HandleParams = {
    params: {
      alias: string;
    };
  };
}
