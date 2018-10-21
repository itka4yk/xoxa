import { injectable } from 'inversify';
import { observable, computed } from 'mobx';
import { persistable } from '../helpers/persist.helpers';

export const AuthStoreType = Symbol('AUTH_STORE');

export interface IAuthStore {
  token: string;
  isAuthorized: boolean;
}

@persistable()
@injectable()
export class AuthStore implements IAuthStore {
  @observable token: string = '123';

  @computed get isAuthorized(): boolean {
    return this.token !== '';
  }
}
