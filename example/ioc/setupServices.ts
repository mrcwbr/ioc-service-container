import { ServiceContainer } from '../../src';
import { ServiceId } from './ServiceId';
import { CustomApi } from '../api/CustomApi';
import { BarApi } from '../api/BarApi';
import { FooApi } from '../api/FooApi';
import { ExampleService } from '../service/ExampleService';

export function setupServices() {
  ServiceContainer.set(ServiceId.BarApi, BarApi);
  ServiceContainer.set(ServiceId.FooApi, FooApi);
  ServiceContainer.set(ServiceId.CustomApi, CustomApi);
  ServiceContainer.set(ServiceId.Service, ExampleService);
}
