import { Service } from './Service';

let services: Service[] = [];

export default {

  set(id: string, factory: () => any) {
    const lowerId = id.toLowerCase();
    if (services.find(s => s.id === lowerId) !== undefined) {
      throw new Error(`Service [${id}] is already registered`);
    }

    services.push({
      id: lowerId,
      factory
    });
  },

  get<T>(id: string): T {
    const service = services.find(s => s.id === id.toLowerCase());
    if (!service) {
      throw new Error(`No service is registered for [${id}]`);
    }

    if (!service.instance) {
      service.instance = service.factory();
    }

    return service.instance;
  },

  override(id: string, factory: () => any) {
    const lowerId = id.toLowerCase();
    const index = services.findIndex(s => s.id === lowerId);
    if (index === -1) {
      throw new Error(`No service is registered for [${id}]`);
    }

    services[index] = {
      id: lowerId,
      factory
    };
  },

  reset() {
    services = [];
  }

};

