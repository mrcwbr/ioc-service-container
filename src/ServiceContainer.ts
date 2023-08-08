let services: Record<string, Service> = {};

export default {
  /**
   *
   * @param id to identify the service in the container, it can be mapped to a property name via the inject decorator
   * @param factoryOrClassReference to create the instance of the service
   * @param buildInstantly by default the service is only instantiated on demand, if required you are able to build the service directly
   */
  set(id: string, factoryOrClassReference: Factory | Function, buildInstantly: boolean = false) {
    const lowerId = id.toLowerCase();

    if (this.isSet(lowerId)) {
      throw new Error(`Service [${id}] is already registered`);
    }

    this.override(lowerId, factoryOrClassReference, buildInstantly);
  },

  get<T>(id: string): T {
    const service = services[id.toLowerCase()];
    if (!service) {
      throw new Error(`No service is registered for [${id}]`);
    }

    if (!service.instance) {
      service.instance = service.factory?.();
      service.factory = undefined;
    }

    return service.instance;
  },

  override(id: string, factoryOrClassReference: Factory | Function, buildInstantly: boolean = false) {
    const lowerId = id.toLowerCase();
    let factory: Factory = getFactory(factoryOrClassReference);

    services[lowerId] = {
      factory: buildInstantly ? undefined : factory,
      instance: buildInstantly ? factory() : undefined,
    };
  },

  isSet(id: string): boolean {
    return services[id.toLowerCase()] !== undefined;
  },

  reset() {
    services = {};
  }

};

function isConstructable(obj: any): obj is Function { // https://stackoverflow.com/a/46320004
  return !!obj.prototype && !!obj.prototype.constructor.name;
}

function getFactory(factoryOrClassReference: Factory | Function): Factory {
  return isConstructable(factoryOrClassReference)
    ? () => new factoryOrClassReference()
    : factoryOrClassReference;
}

type Factory = () => any;
type Service = {
  factory?: Factory;
  instance?: any;
}
