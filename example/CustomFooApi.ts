import { FooApi } from './FooApi';

export class CustomFooApi implements FooApi {
  update() {
    console.log('FooApi updated successfully! 🎉');
  }
}
