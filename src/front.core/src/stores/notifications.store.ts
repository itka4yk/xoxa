import { observable, autorun, reaction, computed, action } from 'mobx';
import { INotification } from '../models';
import { injectable } from 'inversify';

export const NotificationsStoreType = Symbol('NOTIFICATION_STORE');

export interface INotificationsStore {
  push(notification: INotification): void;
  initNotifications(callback: (notification: INotification) => void): void;
}

@injectable()
export class NotificationsStore implements INotificationsStore {
  @observable notifications: INotification[] = [];

  constructor() {
    autorun(() => {
      if (this.notifications.length === 0) return;
      const notification = this.notifications.shift();
      if (!notification || !this.callback) return;
      this.callback(notification);
    });
  }

  @action
  push(notification: INotification) {
    this.notifications.push(notification);
  }

  private callback: any;

  initNotifications(callback: (notification: INotification) => void) {
    this.callback = callback;
  }
}