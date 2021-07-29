let services: Service[] = [];

export default {
  /**
   *
   * @param id to identify the service in the container, it can be mapped to a property name via the inject decorator
   * @param factoryOrClassReference to create the instance of the service
   * @param buildInstantly by default the service is only instantiated on demand, if required your are able to build the service directly
   */
  set(id: string, factoryOrClassReference: Factory | Function, buildInstantly: boolean = false) {
    const lowerId = id.toLowerCase();
    if (services.find(s => s.id === lowerId) !== undefined) {
      throw new Error(`Service [${id}] is already registered`);
    }

    let factory: Factory | undefined = undefined;
    if (isConstructable(factoryOrClassReference)) {
      factory = () => new factoryOrClassReference();
    }

    services.push({
      id: lowerId,
      factory: factory || factoryOrClassReference as Factory,
      instance: buildInstantly ? factoryOrClassReference() : undefined,
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

function isConstructable(obj: any): obj is Function { // https://stackoverflow.com/a/46320004
  return !!obj.prototype && !!obj.prototype.constructor.name;
}

type Factory = () => any;
type Service = {
  id: string;
  factory: () => any;
  instance?: any;
}
