import { injectable } from 'inversify';
import { PersistService } from '../services/persist.service';

/**
 * Persists object in browser storage.
 * Don't use it, when you have @inject decorator in constructor
 */
export function persistable(): any {
  return function<T>(target: new () => T): new () => T {
    const persistService = new PersistService();
    @injectable()
    class PersistedClass {
      constructor() {
        target.apply(this);
        persistService.persistStore(this);
      }
    }
    PersistedClass.prototype = Object.create(target.prototype);

    return PersistedClass as new () => T;
  };
}
