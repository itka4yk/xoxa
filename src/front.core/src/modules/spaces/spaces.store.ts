import { inject, injectable } from 'inversify';
import { action, computed, observable } from 'mobx';
import { persistable } from '../../helpers/persist.helpers';
import { ICreateNewSpaceDto, IMySpace } from 'api.contract';
import { ApiServiceType, IApiService } from '../../services/api.service';
import { IRouterStore, RouterStoreType } from '../../stores/router.store';
import { ChannelsStoreType, IChannelsStore } from '../channels/channels.store';

export const SpacesStoreType = 'SPACES_STORE_TYPE';

export interface ISpacesStore {
  getMySpaces(): void;
  mySpaces: IMySpace[];
  createNewSpace(newSpace: any): void;
}

@persistable()
@injectable()
export class SpacesStore implements ISpacesStore {
  @observable private spaces: IMySpace[] = [];

  @inject(ApiServiceType) private readonly apiService!: IApiService;
  @inject(ChannelsStoreType) private readonly channelsStore!: IChannelsStore;
  @inject(RouterStoreType) private readonly routerStore!: IRouterStore;

  onActivation() {
    this.getMySpaces();
  }

  @computed
  get mySpaces() {
    return this.spaces.map(s => s);
  }

  @action
  async getMySpaces() {
    const result = await this.apiService.getAsync<IMySpace[]>('/spaces');
    if (result instanceof Error) return;
    this.spaces = result;
    this.requestChannels();
  }

  @action
  async requestChannels() {
    this.mySpaces.forEach(s => this.channelsStore.getChannels(s.id));
  }

  @action
  async createNewSpace(newSpace: ICreateNewSpaceDto) {
    await this.apiService.postAsync('/spaces', newSpace);
    this.routerStore.push('/workspaces');
  }
}
