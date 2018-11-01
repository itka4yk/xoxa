import { injectable, inject } from 'inversify';
import { observable, computed, action, autorun, reaction, when } from 'mobx';
import { persistable } from '../../helpers/persist.helpers';
import { ApiServiceType, IApiService } from '../../services/api.service';
import { RouterStoreType, IRouterStore } from '../../stores/router.store';
import { NotificationsStoreType, INotificationsStore } from '../../stores/stores.module';
import { NotificationType } from '../../models';

export const AuthStoreType = Symbol('AUTH_STORE');

export interface IAuthStore {
  token: string;
  isAuthorized: boolean;
  signIn(userName: string, password: string): Promise<void>;
  register(userName: string, password: string): Promise<void>;
  signOut(): void;
}

@persistable()
@injectable()
export class AuthStore implements IAuthStore {
  @observable token: string = '';

  @inject(NotificationsStoreType)
  notifications!: INotificationsStore;

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
    const result = await this.apiService.postAsync('/auth/authenticate', { email, password });
    if (result instanceof Error) {
      this.notifications.push({ body: 'Invalid login or password', type: NotificationType.ERROR });
    } else {
      this.token = result as string;
      this.routerStore.push('/home');
    }
  }

  @action
  async register(email: string, password: string) {
    await this.apiService.postAsync('/auth/register', { email, password });
  }

  @action
  async signOut() {
    this.token = '';
    this.routerStore.push('/auth/login');
  }
}
