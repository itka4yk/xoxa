import { inject, injectable } from 'inversify';
import { action, computed, observable, reaction, when } from 'mobx';
import { persistable } from '../../helpers/persist.helpers';
import { ApiServiceType, IApiService } from '../../services/api.service';
import { IRouterStore, RouterStoreType } from '../../stores/router.store';
import { INotificationsStore, NotificationsStoreType } from '../../stores/stores.module';
import { NotificationType } from '../../models';
import { ISocketsService, SocketsServiceType } from '../../services/sockets.service';
import { IUserInfo } from 'auth.contract';

export const AuthStoreType = Symbol('AUTH_STORE');

interface IAuth {
  token: string;
  userInfo: IUserInfo;
}

export interface IAuthStore {
  store: IAuth;
  isAuthorized: boolean;

  signIn(userName: string, password: string): Promise<void>;

  register(userName: string, password: string): Promise<void>;

  signOut(): void;
}

@persistable()
class AuthData implements IAuth {
  @observable token: string = '';
  @observable userInfo!: IUserInfo;
}

@injectable()
export class AuthStore implements IAuthStore {
  @observable store: IAuth = new AuthData();

  @inject(NotificationsStoreType)
  notifications!: INotificationsStore;
  @inject(SocketsServiceType) private readonly socketsService!: ISocketsService;

  @inject(ApiServiceType) private readonly apiService!: IApiService;

  @computed
  get isAuthorized(): boolean {
    return this.store.token !== '';
  }

  @inject(RouterStoreType) private readonly routerStore!: IRouterStore;

  onActivation() {
    when(
      () => this.routerStore.location && this.routerStore.location.pathname === '/logout',
      () => this.signOut(),
    );
    reaction(
      () => this.store.token,
      (token: string) => {
        if (!token) return;
        this.apiService.setToken(token);
        this.socketsService.setToken(token);
      },
      { fireImmediately: true },
    );
  }

  @action
  async signIn(email: string, password: string) {
    const result = await this.apiService.postAsync('/auth/authenticate', { email, password });
    if (result instanceof Error) {
      this.notifications.push({ body: 'Invalid login or password', type: NotificationType.ERROR });
    } else {
      this.store.token = result as string;
      this.routerStore.push('/workspaces');
      this.getUserInfo();
    }
  }

  @action
  async register(email: string, password: string) {
    await this.apiService.postAsync('/auth/register', { email, password });
  }

  @action
  async signOut() {
    this.store.token = '';
    this.routerStore.push('/auth/login');
  }

  @action
  async getUserInfo() {
    const userInfo = await this.apiService.getAsync<IUserInfo>('/auth/userInfo');
    if (userInfo instanceof Error) {
    } else {
      this.store.userInfo = userInfo;
    }
  }
}
