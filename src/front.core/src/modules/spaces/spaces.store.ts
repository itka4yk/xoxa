import { injectable, inject } from 'inversify';
import { observable, computed, action, autorun, reaction, when } from 'mobx';
import { persistable } from '../../helpers/persist.helpers';
import { IMySpace, ICreateNewSpaceDto } from 'api.contract';
import { ApiServiceType, IApiService } from '../../services/services.module';
import { RouterStoreType, IRouterStore } from '../../stores/stores.module';

export const SpacesStoreType = 'SPACES_STORE_TYPE';

export interface ISpacesStore {
  getMySpaces(): void;
  mySpaces: IMySpace[];
  createNewSpace(newSpace: any): void;
}

@persistable()
@injectable()
export class SpacesStore implements ISpacesStore {
  @observable private spaces: IMySpace[] = [];

  @inject(ApiServiceType) private readonly apiService!: IApiService;
  @inject(RouterStoreType) private readonly routerStore!: IRouterStore;

  onActivation() {
    when(
      () => this.routerStore.location && this.routerStore.location.pathname === '/workspaces',
      () => this.getMySpaces(),
    );
  }

  @computed
  get mySpaces() {
    return this.spaces.map(s => s);
  }

  @action
  async getMySpaces() {
    const result = await this.apiService.getAsync<IMySpace[]>('/spaces');
    if (result instanceof Error) return;
    console.log('RESULT', result);
    this.spaces = result;
  }

  @action
  async createNewSpace(newSpace: ICreateNewSpaceDto) {
    await this.apiService.postAsync('/spaces', newSpace);
    this.routerStore.push('/workspaces');
  }
}
