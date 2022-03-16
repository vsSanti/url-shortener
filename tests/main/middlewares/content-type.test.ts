import { Express } from 'express';
import request from 'supertest';

import { setupApp } from '@/main/config/app';
import { MongoHelper } from '@/infra/db/mongodb';

describe('Content Type Middleware', () => {
  let app: Express;

  beforeAll(async () => {
    app = await setupApp();
    await MongoHelper.connect();
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  test('should return default content type as json', async () => {
    app.get('/test_content_type', (req, res) => {
      res.send('');
    });

    await request(app).get('/test_content_type').expect('content-type', /json/);
  });
});
