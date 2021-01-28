import { Service } from './Service';

let services: Service[] = [];

export default {

  set(id: string, factory: () => any) {
    const lowerId = id.toLowerCase();
    if (services.find(service => service.id === lowerId) !== undefined) {
      throw new Error(`Service [${id}] is already registered`);
    }

    services.push({
      id: lowerId,
      factory
    });
  },

  get<T>(id: string): T {
    const service = services.find(service => service.id === id.toLowerCase());
    if (!service) {
      throw new Error(`No service is registered for [${id}]`);
    }

    if (!service.instance) {
      service.instance = service.factory();
    }

    return service.instance;
  },

  reset() {
    services = [];
  }

};

