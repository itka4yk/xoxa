import { injectable, inject } from 'inversify';
import { observable, computed, action, autorun, reaction, when } from 'mobx';
import { persistable } from '../../helpers/persist.helpers';
import { ApiServiceType, IApiService } from '../../services/api.service';

export const SpacesStoreType = Symbol('SPACES_STORE_TYPE');

export interface ISpacesStore {

}

@persistable()
@injectable()
export class SpacesStore implements ISpacesStore {

}
