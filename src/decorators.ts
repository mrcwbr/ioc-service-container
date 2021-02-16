import ServiceContainer from './ServiceContainer';

export function inject(serviceIdOrTarget: Object | string, propertyKey?: string): any {
  if (typeof serviceIdOrTarget === 'string') {
    return function(target: Object, propertyKey: string): void {
      redefineObject(target, propertyKey, serviceIdOrTarget);
    };
  }

  redefineObject(serviceIdOrTarget, propertyKey);
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
