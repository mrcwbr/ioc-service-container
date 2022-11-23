import { ServiceContainer } from '../src';

describe('ServiceContainer', () => {

  it('should set (by factory) and get service', () => {
    const id = 'aService';
    ServiceContainer.set(id, () => 123);

    const serviceFromIoc = ServiceContainer.get(id);
    expect(serviceFromIoc).toEqual(123);
  });

  it('should set (by class reference) and get service', () => {
    class Foo {
      bar() {
        return 'bar';
      }
    }

    const id = 'aService';
    ServiceContainer.set(id, Foo);

    const serviceFromIoc = ServiceContainer.get<Foo>(id);
    expect(serviceFromIoc.bar()).toBe('bar');
  });

  it('service should be instantiated on demand by default', () => {
    const listener = jest.fn();
    const factory = () => {
      listener();
    };
    ServiceContainer.set('id', factory);
    expect(listener).not.toHaveBeenCalled();
  });

  describe('service should be instantiated instantly if required', () => {

    describe('set', () => {

      it('as factory', () => {
        const listener = jest.fn();
        const factory = () => {
          listener();
        };
        ServiceContainer.set('id', factory, true);
        expect(listener).toHaveBeenCalled();
      });

      it('as class reference', () => {
        const listener = jest.fn();

        class Foo {
          constructor() {
            listener();
          }
        }

        ServiceContainer.set('id', Foo, true);
        expect(listener).toHaveBeenCalled();
      });
    });

    describe('override', () => {
      it('as factory', () => {
        const listener = jest.fn();
        const factory = () => {
          listener();
        };
        ServiceContainer.override('id', factory, true);
        expect(listener).toHaveBeenCalled();
      });

      it('as class reference', () => {
        const listener = jest.fn();

        class Foo {
          constructor() {
            listener();
          }
        }

        ServiceContainer.override('id', Foo, true);
        expect(listener).toHaveBeenCalled();
      });
    });

  });

  it('should only call factory once', () => {
    const id = 'aService';
    const service = jest.fn();
    const factoryCountListener = jest.fn();

    ServiceContainer.set(id, () => {
      factoryCountListener();
      return service;
    });

    const serviceOneFromIoc = ServiceContainer.get(id);
    const serviceTwoFromIoc = ServiceContainer.get(id);
    expect(serviceOneFromIoc).toEqual(service);
    expect(serviceTwoFromIoc).toEqual(service);
    expect(factoryCountListener).toHaveBeenCalledTimes(1);
  });

  it('should throw error if service is set twice', () => {
    const id = 'aService';
    ServiceContainer.set(id, () => jest.fn());
    expect(() => ServiceContainer.set(id, () => jest.fn())).toThrow('Service [aService] is already registered');
  });

  it('should throw error if service is not set', () => {
    expect(() => ServiceContainer.get('aService')).toThrow('No service is registered for [aService]');
  });

  it('should reset all services', () => {
    const firstId = 'firstId';
    const secondId = 'secondID';
    ServiceContainer.set(firstId, jest.fn());
    ServiceContainer.set(secondId, jest.fn());

    ServiceContainer.reset();

    expect(() => ServiceContainer.get(firstId)).toThrow('No service is registered for [firstId]');
    expect(() => ServiceContainer.get(secondId)).toThrow('No service is registered for [secondID]');
  });

  it('should set service or override if already set', () => {
    expect(() => ServiceContainer.override('TestCounter', () => 99)).not.toThrow();
    expect(ServiceContainer.get('TestCounter')).toBe(99);
    ServiceContainer.override('TestCounter', () => 22);
    expect(ServiceContainer.get('TestCounter')).toBe(22);
  });

  it('should override service with class reference', () => {
    class Foo {
      bar() {
        return 'bar';
      }
    }

    const id = 'aService';
    ServiceContainer.override(id, Foo);

    const serviceFromIoc = ServiceContainer.get<Foo>(id);
    expect(serviceFromIoc.bar()).toBe('bar');
  });

  it('should check if a service is registered', () => {
    const firstId = 'firstId';
    const secondId = 'secondID';
    ServiceContainer.set(firstId, jest.fn());
    ServiceContainer.set(secondId, jest.fn());

    expect(ServiceContainer.isSet(firstId)).toBe(true);
    expect(ServiceContainer.isSet(secondId)).toBe(true);
    expect(ServiceContainer.isSet('thirdId')).toBe(false);
  });

  afterEach(() => {
    ServiceContainer.reset();
  });

});
