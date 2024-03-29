import faker from '@faker-js/faker';

import { LoadShortUrlController } from '@/presentation/controllers';
import { badRequest, movedPermanently, notFound } from '@/presentation/helpers';

import { throwError, ValidationSpy } from '@/tests/domain/mocks';
import { LoadShortUrlByAliasSpy } from '@/tests/presentation/mocks';

const mockParams = (): LoadShortUrlController.HandleParams => ({
  params: {
    alias: faker.random.alphaNumeric(8),
  },
});

describe('LoadShortUrl Controller', () => {
  let loadShortUrlByAliasSpy: LoadShortUrlByAliasSpy;
  let validationSpy: ValidationSpy;
  let sut: LoadShortUrlController;
  let params: LoadShortUrlController.HandleParams;

  beforeEach(() => {
    loadShortUrlByAliasSpy = new LoadShortUrlByAliasSpy();
    validationSpy = new ValidationSpy();
    sut = new LoadShortUrlController({
      loadShortUrlByAlias: loadShortUrlByAliasSpy,
      validation: validationSpy,
    });
    params = mockParams();
  });

  it('should call Validation with correct params', async () => {
    await sut.handle(params);
    expect(validationSpy.params).toEqual(params.params);
  });

  it('should return 400 if Validation returns an error', async () => {
    validationSpy.error = new Error();
    const response = await sut.handle(params);
    expect(response).toEqual(badRequest(validationSpy.error));
  });

  it('should throw if Validation throws', async () => {
    jest.spyOn(validationSpy, 'validate').mockImplementationOnce(throwError);
    const promise = sut.handle(params);
    await expect(promise).rejects.toThrow();
  });

  it('should call LoadShortUrlByAlias with correct params', async () => {
    await sut.handle(params);
    expect(loadShortUrlByAliasSpy.params).toEqual(params.params);
  });

  it('should return 404 if LoadShortUrlByAlias returns undefined', async () => {
    loadShortUrlByAliasSpy.result = undefined;
    const response = await sut.handle(params);
    expect(response).toEqual(notFound());
  });

  it('should return 500 if LoadShortUrlByAlias throws', async () => {
    jest.spyOn(loadShortUrlByAliasSpy, 'loadByAlias').mockImplementationOnce(throwError);
    const promise = sut.handle(params);
    await expect(promise).rejects.toThrow();
  });

  it('should return 301 with correct alias on success', async () => {
    const response = await sut.handle(params);
    expect(response).toEqual(movedPermanently(loadShortUrlByAliasSpy.result?.url));
  });
});
