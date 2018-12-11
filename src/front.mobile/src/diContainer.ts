import { Container, injectable } from 'inversify';
import { coreModules, initContainer } from 'front.core';
import { AsyncStorage } from 'react-native';
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
  getFromStore = async (key: string) => await this.storage.load({ key });
  saveToStore = async (key: string, data: any) => await this.storage.save({ key, data });
}
const container = new Container();
container.bind('STORAGE').to(Storage);
container.load(...coreModules);

initContainer(container);

export { container };
