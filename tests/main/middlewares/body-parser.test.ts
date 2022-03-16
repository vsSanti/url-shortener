import { Express } from 'express';
import request from 'supertest';

import { setupApp } from '@/main/config/app';
import { MongoHelper } from '@/infra/db/mongodb';

describe('Body Parser Middleware', () => {
  let app: Express;

  beforeAll(async () => {
    app = await setupApp();
    await MongoHelper.connect();
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  test('should parse body as json', async () => {
    app.post('/test_body_parser', (req, res) => {
      res.send(req.body);
    });

    await request(app)
      .post('/test_body_parser')
      .send({ name: 'Vinicius' })
      .expect({ name: 'Vinicius' });
  });
});
