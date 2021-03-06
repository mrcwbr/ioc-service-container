import { ServiceContainer } from '../src';

describe('ServiceContainer', () => {

  it('should set and get service', () => {
    const id = 'aService';
    const service = jest.fn();
    ServiceContainer.set(id, () => service);

    const serviceFromIoc = ServiceContainer.get(id);
    expect(service).toEqual(serviceFromIoc);
  });

  it('service should be instantiated on demand by default', () => {
    const listener = jest.fn();
    const factory = () => {
      listener();
    };
    ServiceContainer.set('id', factory);
    expect(listener).not.toHaveBeenCalled();
  });

  it('service should be instantiated instantly if required', () => {
    const listener = jest.fn();
    const factory = () => {
      listener();
    };
    ServiceContainer.set('id', factory, true);
    expect(listener).toHaveBeenCalled();
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

  it('should override service if possible', () => {
    expect(() => ServiceContainer.override('TestCounter', () => 99)).toThrow('No service is registered for [TestCounter]');
    ServiceContainer.set('TestCounter', () => 1);
    expect(ServiceContainer.get('TestCounter')).toBe(1);
    ServiceContainer.override('TestCounter', () => 22);
    expect(ServiceContainer.get('TestCounter')).toBe(22);
  });

  afterEach(() => {
    ServiceContainer.reset();
  });

});
