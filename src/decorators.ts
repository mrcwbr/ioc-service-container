import ServiceContainer from './ServiceContainer';

export function inject(target: Object, propertyKey: string) {
  redefineObject(target, propertyKey);
}

export function injectViaId(serviceId: string) {
  return function(target: Object, propertyKey: string) {
    redefineObject(target, propertyKey, serviceId);
  };
}

function redefineObject(target: Object, propertyKey: string, serviceId?: string) {
  const getter = () => {
    return ServiceContainer.get(serviceId?.toLowerCase() || propertyKey.toLowerCase());
  };

  const setter = () => {
    throw new Error(`Injected property [${propertyKey}] can't be reset`);
  };

  Object.defineProperty(target, propertyKey, {
    get: getter,
    set: setter
  });
}
