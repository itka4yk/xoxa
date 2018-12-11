import { Container, injectable } from 'inversify';
import { coreModules, initContainer } from 'front.core';
import { AsyncStorage } from 'react-native';
import SyncStorage from 'sync-storage';
import RNStorage from 'react-native-storage';

@injectable()
class Storage {
  storage: RNStorage;
  constructor() {
    this.storage = new RNStorage({
      defaultExpires: null,
      storageBackend: AsyncStorage,
    });
  }
  // init = async () => await SyncStorage.init();
  // getFromStore = (key: string) => JSON.parse(SyncStorage.get({ key }));
  // saveToStore = (key: string, data: any) => {
  //   console.log('KEY', key);
  //   console.log('VALUE', data);
  //   const json = JSON.stringify(data);
  //   // const json = btoa(JSON.stringify(data).toString());
  //   console.log('JSON', json);
  //   SyncStorage.set(key, json);
  // }
  getFromStore = async (key: string) => await this.storage.load({ key });
  saveToStore = async (key: string, data: any) => await this.storage.save({ key, data });
}
const container = new Container();
container.bind('STORAGE').to(Storage);
container.load(...coreModules);

initContainer(container);

export { container };
