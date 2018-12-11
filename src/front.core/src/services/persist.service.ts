import { autorun, toJS } from 'mobx';
import { injectable, inject } from 'inversify';

export const PersistServiceType = Symbol('PERSIST_SERVICE');

export interface IPersistService {
  persistStore(store: any): void;
}

export interface ILocalStorage {
  saveToStore: any;
  getFromStore: any;
  init: any;
}

@injectable()
export class PersistService implements IPersistService {
  constructor(@inject('STORAGE') public localStorage: ILocalStorage) { }

  persistStore(store: any) {
    const storeName = store.constructor.name;
    let firstRun = true;
    if (typeof document !== 'undefined') {
      autorun(() => {
        if (firstRun) {
          const existingStore = this.localStorage.getFromStore(storeName);
          if (existingStore) {
            for (const key in existingStore) {
              store[key] = existingStore[key];
            }
          }
        }
        this.localStorage.saveToStore(storeName, toJS(store));
      });
      } else if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
        autorun(async () => {
          const st = toJS(store);
          console.log(storeName, st, firstRun);
          if (firstRun) {
            const existingStore = await this.localStorage.getFromStore(storeName);
            console.log('EXISTING STORE', existingStore);
            if (existingStore) {
              for (const key in existingStore) {
                store[key] = existingStore[key];
              }
            }
          }
          console.log('SAVING', storeName, toJS(store));
          await this.localStorage.saveToStore(storeName, toJS(store));
        });
    // } else if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
    //   this.localStorage.init().then(() => {
    //     autorun(() => {
    //       const st = toJS(store);
    //       console.log(storeName, st, firstRun);
    //       if (firstRun) {
    //         const existingStore = this.localStorage.getFromStore(storeName);
    //         console.log('EXISTING STORE', existingStore);
    //         if (existingStore) {
    //           for (const key in existingStore) {
    //             store[key] = existingStore[key];
    //           }
    //         }
    //       }
    //       console.log('SAVING', storeName, toJS(store));
    //       this.localStorage.saveToStore(storeName, toJS(store));
    //     });
    //   });
    }

    firstRun = false;
  }
}
