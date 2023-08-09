import ServiceContainer from './ServiceContainer';

export function inject(serviceIdOrTarget: Object | string, propertyKey?: string): any {
  if (typeof serviceIdOrTarget === 'string') {
    return function(target: Object, propertyKey: string): void {
      redefineObject(target, propertyKey, serviceIdOrTarget);
    };
  }

  redefineObject(serviceIdOrTarget, propertyKey!);
}

function redefineObject(target: Object, propertyKey: string, serviceId?: string) {
  function get() {
    return ServiceContainer.get(serviceId?.toLowerCase() ?? propertyKey.toLowerCase());
  }

  function set() {
    throw new Error(`Injected property [${propertyKey}] can't be reset`);
  }

  Object.defineProperty(target, propertyKey, {
    get,
    set
  });
}
