import { TestApi } from './TestApi';

export class CustomTestApi implements TestApi {
  save() {
    console.log('TestApi saved successfully! 🚀');
  }
}
