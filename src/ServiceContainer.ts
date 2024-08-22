let services: Record<string, Service> = {};

export default {
  /**
   * Register a service in the container
   * @param id {string} to identify the service in the container, it can be mapped to a property name via the inject decorator
   * @param provider factory, constructable or entity which is stored in the container
   */
  set<T>(id: string, provider: NoUndefined<T>) {
    if (this.isSet(id)) {
      throw new Error(`Service [${id}] is already registered`);
    }

    this.override(id, provider);
  },

  /**
   * Overrides a service in the container. If the service does not exist, it will be registered.
   * @param id {string}
   * @param provider
   */
  override<T>(id: string, provider: NoUndefined<T>) {
    const lowerId = id.toLowerCase();

    if (isConstructable(provider)) {
      services[lowerId] = { factory: () => new provider() };
      return;
    }

    if (typeof provider === 'function') {
      services[lowerId] = { factory: provider };
      return;
    }

    services[lowerId] = { instance: provider };
  },

  /**
   * Get a service from the container. If the service is not instantiated, it will be instantiated.
   * @param id {string}
   */
  get<T>(id: string): T {
    const service = services[id.toLowerCase()];
    if (!service) {
      throw new Error(`No service is registered for [${id}]`);
    }

    if (service.instance === undefined) {
      service.instance = service.factory?.();
      delete service.factory;
    }

    return service.instance;
  },

  /**
   * Check if the service is set in the container
   * @param id {string}
   */
  isSet(id: string): boolean {
    return services[id.toLowerCase()] !== undefined;
  },

  /**
   * Reset the container
   */
  reset() {
    services = {};
  },
};

/**
 * Check if the object is a class
 * @param value
 * @returns {boolean} true if the object is a class
 * @see https://stackoverflow.com/a/46320004
 */
function isConstructable(value: unknown): value is Constructable {
  return typeof value === 'function' && !!value.prototype && !!value.prototype.constructor.name;
}

type NoUndefined<T> = T extends undefined ? never : T;
type Constructable<T = any> = new (...args: any[]) => T;
type Service = {
  factory?: Function;
  instance?: any;
};
