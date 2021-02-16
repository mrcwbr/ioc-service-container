import { TestApi } from './TestApi';
import { inject } from '../src/';
import { TestService } from './TestService';
import { FooApi } from './FooApi';
import { ServiceId } from './ServiceId';

export class CustomTestService implements TestService {
  @inject
  private readonly testApi!: TestApi;

  @inject(ServiceId.FooApi)
  private readonly nameThisHowYouWant!: FooApi;

  save() {
    this.testApi.save();
    this.nameThisHowYouWant.update();
  }
}
