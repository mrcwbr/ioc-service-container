import { TestApi } from './TestApi';
import { inject } from '../src/index';
import { TestService } from './TestService';
import { injectViaId } from '../src/decorators';
import { FooApi } from './FooApi';
import { ServiceId } from './ServiceId';

export class CustomTestService implements TestService {
  @inject
  private readonly testApi!: TestApi;

  @injectViaId(ServiceId.FooApi)
  private readonly nameThisHowYouWant!: FooApi;

  save() {
    this.testApi.save();
    this.nameThisHowYouWant.update();
  }
}
