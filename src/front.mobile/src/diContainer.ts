import { Container, injectable } from 'inversify';
import { coreModules, initContainer } from 'front.core';
import SyncStorage from 'sync-storage';

@injectable()
class Storage {
  constructor() {
    SyncStorage.init();
  }
  getFromStore = (...arg) => SyncStorage.get(...arg);
  saveToStore = (...arg) => SyncStorage.set(...arg);
}
const container = new Container();
container.bind('STORAGE').to(Storage);
container.load(...coreModules);

initContainer(container);

export { container };
