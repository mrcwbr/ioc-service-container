import ServiceContainer from './ServiceContainer';

/**
 * Shortcut for ServiceContainer.get
 * @param id ServiceId
 */
export function scg<T>(id: string): T {
  return ServiceContainer.get<T>(id);
}
