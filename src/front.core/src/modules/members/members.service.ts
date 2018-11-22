import { action } from 'mobx';
import { IMemberInfo } from 'api.contract';
import { ApiServiceType, IApiService } from '../../services/api.service';
import { inject, injectable } from 'inversify';
import { IMembersStore, MembersStoreType } from './members.store';

export const MembersServiceType = Symbol.for('MEMBERS_SERVICE');

export interface IMembersService {
  store: IMembersStore;
  requestMembers(spaceId: string): void;
}

@injectable()
export class MembersService implements IMembersService {
  @inject(MembersStoreType) store!: IMembersStore;

  @inject(ApiServiceType) apiService!: IApiService;

  @action
  async requestMembers(spaceId: string) {
    const result = await this.apiService.getAsync<IMemberInfo[]>(
      `/spaces/spaceMembers?spaceId=${spaceId}`,
    );
    if (result instanceof Error) throw result;
    this.store.members[spaceId] = result;
  }
}
