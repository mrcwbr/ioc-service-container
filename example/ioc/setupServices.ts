import { ServiceContainer } from '../../src';
import { ServiceId } from './ServiceId';
import { CustomApi } from '../api/CustomApi';
import { BarApi } from '../api/BarApi';
import { FooApi } from '../api/FooApi';
import { ExampleService } from '../service/ExampleService';

export function setupServices() {
  ServiceContainer.set(ServiceId.BarApi, () => new BarApi());
  ServiceContainer.set(ServiceId.FooApi, () => new FooApi());
  ServiceContainer.set(ServiceId.CustomApi, () => new CustomApi());
  ServiceContainer.set(ServiceId.Service, () => new ExampleService());
}
