import { Validation } from '@/domain/usecases';

export class ValidationSpy implements Validation {
  error: Error | undefined;
  params: any;

  async validate(params: any): Promise<Error | undefined> {
    this.params = params;
    return this.error;
  }
}
