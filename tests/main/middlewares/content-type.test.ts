import { Express } from 'express';
import request from 'supertest';

import { setupApp } from '@/main/config/app';

describe('Content Type Middleware', () => {
  let app: Express;

  beforeAll(async () => {
    app = await setupApp();
  });

  test('should return default content type as json', async () => {
    app.get('/test_content_type', (req, res) => {
      res.send('');
    });

    await request(app).get('/test_content_type').expect('content-type', /json/);
  });

  test('should return xml content type when forced', async () => {
    app.get('/test_content_type_xml', (req, res) => {
      res.type('xml').send('');
    });

    await request(app).get('/test_content_type_xml').expect('content-type', /xml/);
  });
});
