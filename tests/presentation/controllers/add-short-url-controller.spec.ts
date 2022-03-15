import faker from '@faker-js/faker';

import { AddShortUrlController } from '@/presentation/controllers';
import { badRequest, conflict, created } from '@/presentation/helpers';

import { throwError, ValidationSpy } from '@/tests/domain/mocks';
import { AddShortUrlSpy } from '@/tests/presentation/mocks';
import { ParameterInUseError } from '@/presentation/errors';

const mockParams = (): AddShortUrlController.HandleParams => ({
  body: {
    url: faker.internet.url(),
  },
});

describe('AddShortUrl Controller', () => {
  let addShortUrlSpy: AddShortUrlSpy;
  let validationSpy: ValidationSpy;
  let sut: AddShortUrlController;
  let params: AddShortUrlController.HandleParams;

  beforeEach(() => {
    addShortUrlSpy = new AddShortUrlSpy();
    validationSpy = new ValidationSpy();
    sut = new AddShortUrlController({ addShortUrl: addShortUrlSpy, validation: validationSpy });
    params = mockParams();
  });

  it('should call Validation with correct params', async () => {
    await sut.handle(params);
    expect(validationSpy.params).toEqual(params.body);
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

  it('should call AddShortUrl with correct params', async () => {
    await sut.handle(params);
    expect(addShortUrlSpy.params).toEqual(params.body);
  });

  it('should return 409 if AddShortUrl throws ParameterInUseError', async () => {
    jest.spyOn(addShortUrlSpy, 'add').mockImplementationOnce(() => {
      throw new ParameterInUseError('alias');
    });

    const response = await sut.handle(params);
    expect(response).toEqual(conflict(new ParameterInUseError('alias')));
  });

  it('should throw if AddShortUrl throws', async () => {
    jest.spyOn(addShortUrlSpy, 'add').mockImplementationOnce(throwError);
    const promise = sut.handle(params);
    await expect(promise).rejects.toThrow();
  });

  it('should return 201 with short url', async () => {
    const response = await sut.handle(params);
    expect(response).toEqual(created(addShortUrlSpy.result));
  });
});
