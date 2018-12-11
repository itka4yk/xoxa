import { injectable, inject } from 'inversify';
import { ICreateNewSpaceDto, IMySpace, IAllSpaces } from 'api.contract';
import { MembersServiceType, IMembersService } from '../members/members.module';
import { computed, action, autorun } from 'mobx';
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

  @computed
  get mySpaces() {
    return this.store.spaces.map(s => s);
  }

  onActivation() { }

  @action
  async getMySpaces() {
    console.log('REQUESTED');
    const result = await this.apiService.getAsync<IAllSpaces>('/spaces/allSpaces');
    console.log('RESULT', result);
    if (result instanceof Error) throw result;
    this.store.spaces = result.spaces.map(s => ({
      id: s.spaceId,
      name: s.name,
    }));
    result.spaces.forEach((s: any) => {
      console.log('SPACE', s);
      if (s.channels) this.channelsService.setChannels(s.spaceId, s.channels);
      if (s.members) this.membersService.setMembers(s.spaceId, s.members);
    });
  }

  @action
  async createNewSpace(newSpace: ICreateNewSpaceDto) {
    await this.apiService.postAsync('/spaces', newSpace);
    this.routerStore.push('/workspaces');
  }

  @action
  setActiveSpace(spaceId: string): void {
    this.store.activeSpace = spaceId;
    this.channelsService.setNoneChannel();
  }
}
