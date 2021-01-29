import ServiceContainer from '../src/ServiceContainer';
import { inject } from '../src/decorators';

describe('decorators', () => {

  it('inject() should inject service', () => {
    const id = 'aService';
    const service = jest.fn();
    ServiceContainer.set(id, () => service);

    const anObject = {
      aService: undefined,
    };

    inject(anObject, 'aService');
    expect(anObject.aService).toEqual(service);
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


  afterEach(() => {
    ServiceContainer.reset();
  });


});
