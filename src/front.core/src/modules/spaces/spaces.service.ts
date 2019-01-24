import { injectable, inject } from 'inversify';
import { ICreateNewSpaceDto, IMySpace } from 'api.contract';
import { computed, action } from 'mobx';
import { ISpacesStore, SpacesStoreType } from './spaces.store';
import { ApiServiceType, IApiService } from '../../services/api.service';
import { RouterStoreType, IRouterStore } from '../../stores/router.store';

export const SpacesServiceType = Symbol('SPACES_SERVICE');

export interface ISpacesService {
  store: ISpacesStore;
  mySpaces: IMySpace[];
  getMySpaces(): void;
  createNewSpace(newSpace: any): void;
}

@injectable()
export class SpacesService implements ISpacesService {
  @inject(SpacesStoreType) store!: ISpacesStore;

  @inject(ApiServiceType) private readonly apiService!: IApiService;
  @inject(RouterStoreType) private readonly routerStore!: IRouterStore;

  @computed
  get mySpaces() {
    return this.store.spaces.map(s => s);
  }

  onActivation() {}

  @action
  async getMySpaces() {
    const result = await this.apiService.getAsync<IMySpace[]>('/spaces');
    if (result instanceof Error) throw result;
    this.store.spaces = [...result];
  }

  @action
  async createNewSpace(newSpace: ICreateNewSpaceDto) {
    await this.apiService.postAsync('/spaces', newSpace);
    this.routerStore.push('/workspaces');
  }
}
