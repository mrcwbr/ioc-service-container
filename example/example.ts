import { ServiceContainer } from '../src/index';
import { CustomTestApi } from './CustomTestApi';
import { CustomTestService } from './CustomTestService';
import { TestService } from './TestService';
import { ServiceId } from './ServiceId';
import { CustomFooApi } from './CustomFooApi';

example();

export function example() {
  console.log('Started example');

  setupServiced();
  console.log('Passed factories to container');

  const testService = ServiceContainer.get<TestService>(ServiceId.TestService);
  console.log('Instantiated testService via ServiceContainer');

  testService.save();
}

function setupServiced() {
  ServiceContainer.set(ServiceId.TestApi, () => new CustomTestApi());
  ServiceContainer.set(ServiceId.FooApi, () => new CustomFooApi());
  ServiceContainer.set(ServiceId.TestService, () => new CustomTestService());
}
