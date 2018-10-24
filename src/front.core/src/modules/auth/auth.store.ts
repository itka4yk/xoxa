import { injectable, inject } from 'inversify';
import { observable, computed, action, autorun, reaction, when } from 'mobx';
import { persistable } from '../../helpers/persist.helpers';
import { ApiServiceType, IApiService } from '../../services/api.service';
import { RouterStoreType, IRouterStore } from '../../stores/router.store';

export const AuthStoreType = Symbol('AUTH_STORE');

export interface IAuthStore {
  token: string;
  isAuthorized: boolean;
  signIn(userName: string, password: string): Promise<void>;
  signOut(): void;
}

@persistable()
@injectable()
export class AuthStore implements IAuthStore {
  @observable token: string = '123';

  onActivation() {
    when(() => this.routerStore.location && this.routerStore.location.pathname === '/logout', () => this.signOut());
  }

  @inject(ApiServiceType) private readonly apiService!: IApiService;
  @inject(RouterStoreType) private readonly routerStore!: IRouterStore;

  @computed get isAuthorized(): boolean {
    return this.token !== '';
  }

  @action
  async signIn(email: string, password: string) {
    const result = await this.apiService.auth().postAsync('/auth/login', { email, password });
    if (result instanceof Error) return;
    this.token = result as string;
    this.routerStore.push('/home');
  }

  @action
  async signOut() {
    this.token = '';
    this.routerStore.push('/login');
  }
}
