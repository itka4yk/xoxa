import { action, computed } from 'mobx';
import { IMemberInfo } from 'api.contract';
import { ApiServiceType, IApiService } from '../../services/api.service';
import { inject, injectable } from 'inversify';
import { IMembersStore, MembersStoreType } from './members.store';
import { AuthServiceType, IAuthService } from '../auth/auth.service';
import { ISpacesStore, SpacesStoreType } from '../spaces/spaces.store';

export const MembersServiceType = Symbol.for('MEMBERS_SERVICE');

export interface IMembersService {
  store: IMembersStore;
  requestMembers(spaceId: string): void;

  setMembers(spaceId: string, members: IMemberInfo[]): void;
  activeSpaceMemberId: string;
}

@injectable()
export class MembersService implements IMembersService {
  @inject(MembersStoreType) store!: IMembersStore;

  @inject(ApiServiceType) apiService!: IApiService;
  @inject(SpacesStoreType) spacesStore!: ISpacesStore;
  @inject(AuthServiceType) authService!: IAuthService;

  @action
  async requestMembers(spaceId: string) {
    const result = await this.apiService.getAsync<IMemberInfo[]>(
      `/spaces/spaceMembers?spaceId=${spaceId}`,
    );
    if (result instanceof Error) throw result;
    this.store.members[spaceId] = result;
  }

  @action
  setMembers(spaceId: string, members: IMemberInfo[]) {
    this.store.members[spaceId] = members;
  }

  @computed
  get activeSpaceMemberId() {
    const spaceId = this.spacesStore.activeSpace!;
    const senderUserId = this.authService.store.userInfo.id;
    const spaceMembers = this.store.members[spaceId];
    const senderId = spaceMembers.find(m => m.userId === senderUserId)!.id;
    return senderId;
  }
}
