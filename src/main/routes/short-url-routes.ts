import { Router } from 'express';

import { adaptRoute } from '@/main/adapters';
import { makeAddShortUrlController } from '@/main/factories';

export default (router: Router): void => {
  router.post('/short-url', adaptRoute({ controller: makeAddShortUrlController() }));
};
