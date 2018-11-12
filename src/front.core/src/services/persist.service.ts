import { autorun, toJS } from 'mobx';
import { injectable } from 'inversify';
import { get as getFromStore, set as saveToStore } from 'store';

export const PersistServiceType = Symbol('PERSIST_SERVICE');
export interface IPersistService {
  persistStore(store: any): void;
}

@injectable()
export class PersistService implements IPersistService {
  persistStore(store: any) {
    const storeName = store.constructor.name;
    let firstRun = true;

    autorun(() => {
      if (firstRun) {
        const existingStore = getFromStore(storeName);

        if (existingStore) {
          for(const key in existingStore) {
            store[key] = existingStore[key];
          }
        }
      }
      saveToStore(storeName, toJS(store));
    });

    firstRun = false;
  }
}
