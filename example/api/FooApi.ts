import { Api } from '../service/Api';

export class FooApi implements Api {
  save() {
    console.log('FooApi saved successfully! ❤️');
  }
}
