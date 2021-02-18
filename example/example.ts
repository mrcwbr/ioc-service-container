import { ServiceContainer } from '../src/index';
import { ServiceId } from './ioc/ServiceId';
import { Service } from './Service';
import { setupServices } from './ioc/setupServices';

example();

export function example() {
  console.log('Started example');

  setupServices();
  console.log('Passed factories to container');

  const service = ServiceContainer.get<Service>(ServiceId.Service);
  console.log('Instantiated testService via ServiceContainer');

  service.save();
}
