declare global {
  interface Window {
    iocServices: Record<string, Service>;
  }
}

let services: Record<string, Service> = {};
// Create or use the existing iocServices object on the window
window.iocServices = window.iocServices ?? {};

export default {
  /**
   *
   * @param id to identify the service in the container, it can be mapped to a property name via the inject decorator
   * @param factoryOrClassReference to create the instance of the service
   * @param buildInstantly by default the service is only instantiated on demand, if required you are able to build the service directly
   * @param shared by default the service is a local object, if required you are able to create a shared window object
   */
  set(
    id: string,
    factoryOrClassReference: Factory | Function,
    buildInstantly: boolean = false,
    shared: boolean = false
  ) {
    const lowerId = id.toLowerCase();

    if (this.isSet(lowerId)) {
      throw new Error(`Service [${id}] is already registered`);
    }

    this.override(lowerId, factoryOrClassReference, buildInstantly, shared);
  },

  get<T>(id: string, shared: boolean = false): T {
    const lowerId = id.toLowerCase();
    let service: Service;
    if (shared) {
      service = window.iocServices[lowerId];
    } else {
      service = services[lowerId];
    }
    if (!service) {
      throw new Error(`No service is registered for [${id}]`);
    }

    if (!service.instance) {
      service.instance = service.factory?.();
      service.factory = undefined;
    }

    return service.instance;
  },

  override(
    id: string,
    factoryOrClassReference: Factory | Function,
    buildInstantly: boolean = false,
    shared: boolean = false
  ) {
    const lowerId = id.toLowerCase();
    let factory: Factory = getFactory(factoryOrClassReference);

    if (shared) {
      window.iocServices[lowerId] = {
        factory: buildInstantly ? undefined : factory,
        instance: buildInstantly ? factory() : undefined,
      };
    } else {
      services[lowerId] = {
        factory: buildInstantly ? undefined : factory,
        instance: buildInstantly ? factory() : undefined,
      };
    }
  },

  isSet(id: string, shared: boolean = false): boolean {
    const lowerId = id.toLowerCase();
    if (shared) return window.iocServices[lowerId] !== undefined;
    else return services[lowerId] !== undefined;
  },

  reset() {
    services = {};
    window.iocServices = {};
  },
};

function isConstructable(obj: any): obj is Function {
  // https://stackoverflow.com/a/46320004
  return !!obj.prototype && !!obj.prototype.constructor.name;
}

function getFactory(factoryOrClassReference: Factory | Function): Factory {
  return isConstructable(factoryOrClassReference) ? () => new factoryOrClassReference() : factoryOrClassReference;
}

type Factory = () => any;
type Service = {
  factory?: Factory;
  instance?: any;
};
