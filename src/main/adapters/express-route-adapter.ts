import { Request, Response } from 'express';

import { Controller } from '@/presentation/protocols';

export type AdaptRouteParams = {
  controller: Controller;
};

export const adaptRoute = ({ controller }: AdaptRouteParams) => {
  return async (req: Request, res: Response) => {
    const request = {
      body: req.body,
      params: req.params,
    };

    try {
      const httpResponse = await controller.handle(request);
      if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
        res.status(httpResponse.statusCode).json(httpResponse.body);
      } else {
        res.status(httpResponse.statusCode).json({
          error: httpResponse.body.message,
        });
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal server error.' });
    }
  };
};
