import { inject, ServiceContainer } from '../../src';
import { ServiceId } from '../ioc/ServiceId';
import { Service } from '../Service';
import { Api } from './Api';

export class ExampleService implements Service {
  @inject
  private readonly customApi!: Api;

  @inject(ServiceId.FooApi)
  private readonly nameThisHowYouWant!: Api;

  private readonly barApi = ServiceContainer.get<Api>(ServiceId.BarApi);

  save() {
    this.customApi.save();
    this.nameThisHowYouWant.save();
    this.barApi.save();
  }
}
