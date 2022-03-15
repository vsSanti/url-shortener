import faker from '@faker-js/faker';

import { AddShortUrlController } from '@/presentation/controllers';
import { badRequest } from '@/presentation/helpers';

import { throwError, ValidationSpy } from '@/tests/domain/mocks';

const mockParams = (): AddShortUrlController.HandleParams => ({
  body: {
    url: faker.internet.url(),
  },
});

describe('AddShortUrl Controller', () => {
  let validationSpy: ValidationSpy;
  let sut: AddShortUrlController;
  let params: AddShortUrlController.HandleParams;

  beforeEach(() => {
    validationSpy = new ValidationSpy();
    sut = new AddShortUrlController({ validation: validationSpy });
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
});
