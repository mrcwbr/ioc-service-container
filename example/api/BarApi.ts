import { Api } from '../service/Api';

export class BarApi implements Api {
  save() {
    console.log('BarApi saved successfully! 🚀');
  }
}
