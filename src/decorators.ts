import ServiceContainer from './ServiceContainer';

export const inject = (target: Object, propertyKey: string) => {
  // todo further improvements set key as string not via name
  // https://dev.to/danywalls/using-property-decorators-in-typescript-with-a-real-example-44e

  const getter = () => {
    return ServiceContainer.get(propertyKey.toLowerCase());
  };

  const setter = () => {
    throw new Error(`Injected property [${propertyKey}] can't be reset`);
  };

  Object.defineProperty(target, propertyKey, {
    get: getter,
    set: setter
  });
};

