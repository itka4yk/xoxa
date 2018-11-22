import { injectable, inject } from 'inversify';
import { ICreateNewSpaceDto, IMySpace } from 'api.contract';
import { MembersServiceType, IMembersService } from '../members/members.module';
import { computed, action } from 'mobx';
import { ISpacesStore, SpacesStoreType } from './spaces.store';
import { ApiServiceType, IApiService } from '../../services/api.service';
import { ChannelsServiceType, IChannelsService } from '../channels/channels.service';
import { RouterStoreType, IRouterStore } from '../../stores/router.store';

export const SpacesServiceType = Symbol('SPACES_SERVICE');

export interface ISpacesService {
  store: ISpacesStore;
  mySpaces: IMySpace[];
  getMySpaces(): void;
  createNewSpace(newSpace: any): void;
  setActiveSpace(spaceId: string): void;
}

@injectable()
export class SpacesService implements ISpacesService {
  @inject(SpacesStoreType) store!: ISpacesStore;
  @inject(ApiServiceType) private readonly apiService!: IApiService;
  @inject(ChannelsServiceType) private readonly channelsService!: IChannelsService;
  @inject(RouterStoreType) private readonly routerStore!: IRouterStore;
  @inject(MembersServiceType) private readonly membersService!: IMembersService;

  onActivation() {
    this.getMySpaces();
  }

  @computed
  get mySpaces() {
    return this.store.spaces.map(s => s);
  }

  @action
  async getMySpaces() {
    const result = await this.apiService.getAsync<IMySpace[]>('/spaces');
    if (result instanceof Error) throw result;
    this.store.spaces = result;
    this.requestChannels();
    this.requestSpaceMembers();
  }

  @action
  async requestChannels() {
    this.mySpaces.forEach(s => this.channelsService.getChannels(s.id));
  }

  @action
  async createNewSpace(newSpace: ICreateNewSpaceDto) {
    await this.apiService.postAsync('/spaces', newSpace);
    this.routerStore.push('/workspaces');
  }

  @action
  requestSpaceMembers() {
    this.mySpaces.forEach(s => this.membersService.requestMembers(s.id));
  }

  @action
  setActiveSpace(spaceId: string): void {
    this.store.activeSpace = spaceId;
  }
}
