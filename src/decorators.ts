import ServiceContainer from './ServiceContainer';

export function inject(target: Object, propertyKey: string): void;
export function inject(serviceId: string): (target: Object, propertyKey: string) => void;
export function inject(serviceIdOrTarget: string | Object, propertyKey?: string) {
  if (typeof serviceIdOrTarget !== 'string') {
    redefineObject(serviceIdOrTarget, propertyKey);
  } else {

    return function (target: Object, propertyKey: string) {
      redefineObject(target, propertyKey, serviceIdOrTarget);
    };
  }
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
