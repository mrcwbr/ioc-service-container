import { inject, ServiceContainer } from '../src/';

describe('decorators', () => {

  it('inject() should inject service to an object', () => {
    const id = 'aService';
    const service = jest.fn();
    ServiceContainer.set(id, () => service);

    const anObject = {
      aService: undefined,
    };

    inject(anObject, 'aService');
    expect(anObject.aService).toEqual(service);
  });

  it('should prevent injected property from reset', () => {
    const id = 'aService';
    const service = jest.fn();
    ServiceContainer.set(id, () => service);

    const anObject = {
      aService: undefined,
    };

    inject(anObject, 'aService');

    // @ts-ignore
    expect(() => anObject.aService = jest.fn()).toThrow('Injected property [aService] can\'t be reset');
  });

  it('inject should work as an decorator', () => {
    const service = jest.fn();
    ServiceContainer.set('service', () => service);

    class Foo {
      @inject
      service: any;
    }

    const foo = new Foo();
    expect(foo.service).toEqual(service);
  });

  it('injectViaId should work as an decorator on a custom property key', () => {
    const serviceId = 'service';
    const service = jest.fn();
    ServiceContainer.set(serviceId, () => service);

    class Foo {
      @inject(serviceId)
      fooService: any;
    }

    const foo = new Foo();
    expect(foo.fooService).toEqual(service);
  });

  afterEach(() => {
    ServiceContainer.reset();
  });

});
