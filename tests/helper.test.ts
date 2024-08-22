import { scg, ServiceContainer } from '../src/';

describe('helper', () => {
  it('scg should get service from container', () => {
    const id = 'aService';
    const service = Symbol(1);
    ServiceContainer.set(id, () => service);

    const res = scg(id);
    expect(res).toEqual(service);
  });

  afterEach(() => {
    ServiceContainer.reset();
  });
});
