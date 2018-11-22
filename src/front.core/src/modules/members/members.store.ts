import { IMemberInfo } from 'api.contract';
import { observable } from 'mobx';
import { persistable } from '../../helpers/persist.helpers';
import { injectable } from 'inversify';

export const MembersStoreType = Symbol('MEMBERS_STORE');

export interface IMembersStore {
  members: { [spaceId: string]: IMemberInfo[] };
}

@persistable()
@injectable()
export class MembersStore implements IMembersStore {
  @observable members: { [p: string]: IMemberInfo[] } = {};
}
