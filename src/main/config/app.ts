import express, { Express } from 'express';

import setupStaticFiles from '@/main/config/static-files';
import setupMiddlewares from '@/main/config/middlewares';
import setupRoutes from '@/main/config/routes';

export const setupApp = async (): Promise<Express> => {
  const app = express();

  setupStaticFiles(app);
  setupMiddlewares(app);
  setupRoutes(app);

  return app;
};
