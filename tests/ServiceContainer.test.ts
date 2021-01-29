import ServiceContainer from '../src/ServiceContainer';

describe('ServiceContainer', () => {

  it('should set and get service', () => {
    const id = 'aService';
    const service = jest.fn();
    ServiceContainer.set(id, () => service);

    const serviceFromIoc = ServiceContainer.get(id);
    expect(service).toEqual(serviceFromIoc);
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

  afterEach(() => {
    ServiceContainer.reset();
  });


});
