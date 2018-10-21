import { RouterStore as Base } from 'mobx-react-router';
import { injectable, decorate } from 'inversify';

export interface IRouterStore extends RouterStore {}

export const RouterStoreType = Symbol('ROUTER_STORE');

decorate(injectable(), Base);

export class RouterStore extends Base {}
