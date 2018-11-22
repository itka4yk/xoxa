import { persistable } from '../../helpers/persist.helpers';
import { observable } from 'mobx';
import { IUserInfo } from '../../../../auth.contract/lib/interfaces/userInfo.interface';
import { injectable } from 'inversify';

export const AuthStoreType = Symbol('AUTH_STORE');

export interface IAuthStore {
  token: string;
  userInfo: IUserInfo;
}

@persistable()
@injectable()
export class AuthStore implements IAuthStore {
  @observable token: string = '';
  @observable userInfo!: IUserInfo;
}
