import { ServiceContainer } from '../src/index';
import { CustomTestApi } from './CustomTestApi';
import { CustomTestService } from './CustomTestService';
import { TestService } from './TestService';

console.log('Started example');

ServiceContainer.set('testApi', () => new CustomTestApi());
console.log('Passed testApi-factory to ServiceContainer');

ServiceContainer.set('testService', () => new CustomTestService());
console.log('Passed testService-Factory to ServiceContainer');

const testService = ServiceContainer.get<TestService>('testService');
console.log('Instantiated testService via ServiceContainer')

testService.save()
