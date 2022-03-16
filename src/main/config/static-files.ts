import express, { Router } from 'express';
import { resolve } from 'path';

export default (router: Router): void => {
  router.use('/', express.static(resolve(__dirname, '..', '..', 'public')));
};
