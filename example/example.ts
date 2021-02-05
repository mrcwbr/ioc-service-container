import { ServiceContainer } from '../src/index';
import { CustomTestApi } from './CustomTestApi';
import { CustomTestService } from './CustomTestService';
import { TestService } from './TestService';
import { ServiceId } from './ServiceId';

console.log('Started example');

ServiceContainer.set(ServiceId.TestApi, () => new CustomTestApi());
console.log('Passed testApi-factory to ServiceContainer');

ServiceContainer.set(ServiceId.TestService, () => new CustomTestService());
console.log('Passed testService-Factory to ServiceContainer');

const testService = ServiceContainer.get<TestService>(ServiceId.TestService);
console.log('Instantiated testService via ServiceContainer')

testService.save()
