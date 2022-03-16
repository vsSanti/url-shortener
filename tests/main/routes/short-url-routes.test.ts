import faker from '@faker-js/faker';
import { Express } from 'express';
import nanoid from 'nanoid';
import request from 'supertest';

import { setupApp } from '@/main/config/app';
import { MongoHelper } from '@/infra/db/mongodb';
import { ShortUrlMongoModel } from '@/infra/db/mongodb/schemas';

describe('ShortUrl Routes', () => {
  let app: Express;

  beforeAll(async () => {
    app = await setupApp();
    await MongoHelper.connect();
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    await MongoHelper.clearCollection(ShortUrlMongoModel);
  });

  describe('POST /short-url', () => {
    it('should return 201 on success', async () => {
      const url = faker.internet.url();

      const response = await request(app)
        .post('/short-url')
        .send({
          url,
        })
        .expect(201);

      expect(response.body).toBeTruthy();
      expect(response.body).toHaveProperty('url');
      expect(response.body.url).toBe(url);
      expect(response.body).toHaveProperty('alias');
      expect(typeof response.body.alias).toBe('string');
      expect(response.body.alias.length).toBe(8);
    });

    it('should return 409 if alias is already registered', async () => {
      const response = await request(app)
        .post('/short-url')
        .send({ url: faker.internet.url() })
        .expect(201);

      jest.spyOn(nanoid, 'nanoid').mockImplementationOnce(() => response.body.alias);

      await request(app).post('/short-url').send({ url: faker.internet.url() }).expect(409);
    });
  });

  describe('GET /:alias', () => {
    it('should return 404 if alias is not registered', async () => {
      await request(app).get('/something').expect(404);
    });

    it('should redirect to correct url on success', async () => {
      const url = faker.internet.url();
      const response = await request(app).post('/short-url').send({ url }).expect(201);

      await request(app).get(`/${response.body.alias}`).expect(301).expect('Location', url);
    });
  });
});
