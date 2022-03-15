import nanoid from 'nanoid';

import { NanoIDAdapter } from '@/infra/adapter';

import { throwError } from '@/tests/domain/mocks';

describe('NanoID adapter', () => {
  let sut: NanoIDAdapter;

  beforeEach(() => {
    sut = new NanoIDAdapter();
  });

  describe('generate()', () => {
    it('should return a valid random string on success', async () => {
      const randomString = await sut.generate();
      expect(typeof randomString).toBe('string');
      expect(randomString.length).toBe(8);
    });

    it('should throw if generate throws', async () => {
      jest.spyOn(nanoid, 'nanoid').mockImplementationOnce(throwError);
      const promise = sut.generate();
      await expect(promise).rejects.toThrow();
    });
  });
});
