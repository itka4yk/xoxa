import { injectable } from 'inversify';
import { observable } from 'mobx';
import { persistable } from '../../helpers/persist.helpers';
import { IMySpace, ISpaceMember } from 'api.contract';

export const SpacesStoreType = Symbol('SPACES_STORE');

export interface ISpacesStore {
  spaces: IMySpace[];
  activeSpace: string | undefined; // TODO: remove this kurwa
  spaceMembers: { [spaceId: string]: ISpaceMember[] }; // TODO: remove this kurwa
}

@persistable()
@injectable()
export class SpacesStore implements ISpacesStore {
  @observable spaces: IMySpace[] = [];
  @observable spaceMembers: { [p: string]: ISpaceMember[] } = {};
  @observable activeSpace: string | undefined;
}
