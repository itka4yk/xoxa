import { injectable, inject } from 'inversify';
import { PersistServiceType, IPersistService } from '../services/persist.service';

/**
 * Persists object in browser storage.
 * Don't use it, when you have @inject decorator in constructor
 */
export function persistable(): any {
  return function<T>(target: new () => T): new () => T {
    @injectable()
    class PersistedClass {
      constructor(@inject(PersistServiceType) persistService: IPersistService) {
        target.apply(this);
        persistService.persistStore(this);
      }
    }
    PersistedClass.prototype = Object.create(target.prototype);

    return PersistedClass as any;
  };
}
