import { example } from '../example/example';
import { ServiceContainer } from '../src';

describe('example', () => {

  beforeEach(() => {
    ServiceContainer.reset();
  });

  test('example', () => {
    const consoleSpy = jest.fn();
    console.log = consoleSpy;

    example();

    expect(consoleSpy).toHaveBeenCalledWith('FooApi updated successfully! 🎉');
    expect(consoleSpy).toHaveBeenCalledWith('TestApi saved successfully! 🚀');
  });

  afterEach(() => {
    ServiceContainer.reset();
  });
});
