import { TestApi } from './TestApi';
import { inject } from '../src/index';
import { TestService } from './TestService';

export class CustomTestService implements TestService {
  @inject
  private readonly testApi!: TestApi;

  save() {
    this.testApi.save();
  }
}
