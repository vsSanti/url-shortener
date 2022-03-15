import { NanoIDAdapter } from '@/infra/adapter';

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
  });
});
