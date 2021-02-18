import { Api } from '../service/Api';

export class CustomApi implements Api {
  save() {
    console.log('CustomApi saved successfully! 🎉');
  }
}
