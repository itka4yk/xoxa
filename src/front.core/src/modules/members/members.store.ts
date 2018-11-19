import { observable, action } from 'mobx';
import { persistable } from '../../helpers/persist.helpers';
import { IMemberInfo } from 'api.contract';
import { ApiServiceType, IApiService } from '../../services/api.service';
import { inject, injectable } from 'inversify';

export const MembersStoreType = Symbol.for('MEMBERS_STORE');

export interface IMembersStore {
  members: { [spaceId: string]: IMemberInfo[] };
  requestMembers(spaceId: string): void;
}

@persistable()
@injectable()
export class MembersStore implements IMembersStore {
  @observable members: { [spaceId: string]: IMemberInfo[] } = {};

  @inject(ApiServiceType) apiService!: IApiService;

  @action
  async requestMembers(spaceId: string) {
    const result = await this.apiService.getAsync<IMemberInfo[]>(
      `/spaces/spaceMembers?spaceId=${spaceId}`,
    );
    if (result instanceof Error) throw result;
    this.members[spaceId] = result;
  }
}
