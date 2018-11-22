import { inject, injectable } from 'inversify';
import { action, computed, observable, reaction, when } from 'mobx';
import { ApiServiceType, IApiService } from '../../services/api.service';
import { IRouterStore, RouterStoreType } from '../../stores/router.store';
import { INotificationsStore, NotificationsStoreType } from '../../stores/stores.module';
import { NotificationType } from '../../models';
import { ISocketsService, SocketsServiceType } from '../../services/sockets.service';
import { IUserInfo } from 'auth.contract';
import { AuthStoreType, IAuthStore } from './auth.store';

export const AuthServiceType = Symbol('AUTH_SERVICE');

export interface IAuthService {
  store: IAuthStore;
  isAuthorized: boolean;

  signIn(userName: string, password: string): Promise<void>;
  register(userName: string, password: string): Promise<void>;
  signOut(): void;
}

@injectable()
export class AuthService implements IAuthService {
  @inject(AuthStoreType) @observable store!: IAuthStore;

  @inject(NotificationsStoreType) notifications!: INotificationsStore;
  @inject(SocketsServiceType) private readonly socketsService!: ISocketsService;
  @inject(ApiServiceType) private readonly apiService!: IApiService;
  @inject(RouterStoreType) private readonly routerStore!: IRouterStore;

  @computed
  get isAuthorized(): boolean {
    return this.store.token !== '';
  }

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
        this.getUserInfo();
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
    localStorage.clear();
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
