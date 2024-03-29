import { UnauthorizedError } from '@/presentation/errors';
import { HttpResponse } from '@/presentation/protocols';

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data,
});

export const created = (data: any): HttpResponse => ({
  statusCode: 201,
  body: data,
});

export const noContent = (): HttpResponse => ({
  statusCode: 204,
  body: undefined,
});

export const movedPermanently = (data: any): HttpResponse => ({
  statusCode: 301,
  body: data,
});

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error,
});

export const unauthorized = (): HttpResponse => ({
  statusCode: 401,
  body: new UnauthorizedError(),
});

export const forbidden = (error: Error): HttpResponse => ({
  statusCode: 403,
  body: error,
});

export const notFound = (error?: Error): HttpResponse => ({
  statusCode: 404,
  body: error?.message || 'Not found.',
});

export const conflict = (error: Error): HttpResponse => ({
  statusCode: 409,
  body: error,
});

export const serverError = (error?: Error): HttpResponse => ({
  statusCode: 500,
  body: error?.message || 'Internal server error.',
});
