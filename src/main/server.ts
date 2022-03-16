import env from '@/main/config/env';

import { MongoHelper } from '@/infra/db/mongodb';

MongoHelper.connect().then(async () => {
  const { setupApp } = await import('./config/app');
  const app = await setupApp();
  app.listen(env.port, () => console.log(`🚀 Server running at http://localhost:${env.port}`));
});
