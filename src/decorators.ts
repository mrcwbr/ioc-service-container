import ServiceContainer from './ServiceContainer';

export const inject = (target: any, key: string) => {

  const getter = () => {
    return ServiceContainer.get(key.toLocaleLowerCase());
  };

  // @ts-ignore
  if (delete this[key]) {
    Object.defineProperty(target, key, {
      get: getter,
      set: undefined,
      enumerable: true,
      configurable: true
    });
  }
}

