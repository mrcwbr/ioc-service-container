import { TestApi } from "./TestApi";
import { TestService } from "./TestService";
import { ServiceContainer } from "../src/index";

console.log('Started example');

ServiceContainer.set('testApi', () => new TestApi())
console.log('Passed testApi-factory to ServiceContainer');

ServiceContainer.set('testService', () => new TestService())
console.log('Passed testService-Factory to ServiceContainer')

const testService = ServiceContainer.get<TestService>('testService')
console.log('Instantiated testService via ServiceContainer')

testService.save()
