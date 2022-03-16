import faker from '@faker-js/faker';

import { LoadShortUrlController } from '@/presentation/controllers';
import { badRequest } from '@/presentation/helpers';

import { ValidationSpy } from '@/tests/domain/mocks';

const mockParams = (): LoadShortUrlController.HandleParams => ({
  params: {
    alias: faker.random.alphaNumeric(8),
  },
});

describe('LoadShortUrl Controller', () => {
  let validationSpy: ValidationSpy;
  let sut: LoadShortUrlController;
  let params: LoadShortUrlController.HandleParams;

  beforeEach(() => {
    validationSpy = new ValidationSpy();
    sut = new LoadShortUrlController({
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
});
