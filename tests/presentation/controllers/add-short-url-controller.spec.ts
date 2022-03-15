import faker from '@faker-js/faker';

import { AddShortUrlController } from '@/presentation/controllers';

import { ValidationSpy } from '@/tests/domain/mocks';

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
});
