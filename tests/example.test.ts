import { example } from '../example/example';
import { ServiceContainer } from '../src';

describe('example', () => {

  beforeEach(() => {
    ServiceContainer.reset();
  });

  it('should print expected lines to console', () => {
    const consoleSpy = jest.fn();
    console.log = consoleSpy;

    example();

    expect(consoleSpy).toHaveBeenCalledWith('CustomApi saved successfully! 🎉');
    expect(consoleSpy).toHaveBeenCalledWith('FooApi saved successfully! ❤️');
    expect(consoleSpy).toHaveBeenCalledWith('BarApi saved successfully! 🚀');
  });

  afterEach(() => {
    ServiceContainer.reset();
  });
});
