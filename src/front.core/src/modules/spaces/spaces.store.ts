import { inject, injectable } from 'inversify';
import { action, computed, observable } from 'mobx';
import { persistable } from '../../helpers/persist.helpers';
import { ICreateNewSpaceDto, IMySpace, ISpaceMember } from 'api.contract';
import { ApiServiceType, IApiService } from '../../services/api.service';
import { IRouterStore, RouterStoreType } from '../../stores/router.store';
import { ChannelsStoreType, IChannelsStore } from '../channels/channels.store';
import { IMembersStore, MembersStoreType } from '../members/members.store';

export const SpacesStoreType = 'SPACES_STORE_TYPE';

export interface ISpacesStore {
  getMySpaces(): void;
  activeSpace: string | undefined;
  mySpaces: IMySpace[];
  spaceMembers: { [spaceId: string]: ISpaceMember[] };
  createNewSpace(newSpace: any): void;
  setActiveSpace(spaceId: string): void;
}

@persistable()
@injectable()
export class SpacesStore implements ISpacesStore {
  @observable spaces: IMySpace[] = [];
  @observable spaceMembers: { [p: string]: ISpaceMember[] } = {};
  @observable activeSpace: string | undefined;

  @inject(ApiServiceType) private readonly apiService!: IApiService;
  @inject(ChannelsStoreType) private readonly channelsStore!: IChannelsStore;
  @inject(RouterStoreType) private readonly routerStore!: IRouterStore;
  @inject(MembersStoreType) private readonly membersStore!: IMembersStore;

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
    if (result instanceof Error) throw result;
    this.spaces = result;
    this.requestChannels();
    this.requestSpaceMembers();
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

  @action
  requestSpaceMembers() {
    this.mySpaces.forEach(s => this.membersStore.requestMembers(s.id));
  }

  @action
  setActiveSpace(spaceId: string): void {
    this.activeSpace = spaceId;
  }
}
