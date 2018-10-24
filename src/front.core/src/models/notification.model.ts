export interface INotification {
  type: NotificationType;
  body: string;
}

export enum NotificationType {
  INFO = 'info',
  SUCCESS = 'success',
  ERROR = 'error',
}

export class NotificationModel implements INotification {
  type: NotificationType = NotificationType.INFO;
  body: string = '';

  constructor(type: NotificationType, body: string) {
    this.body = body;
    this.type = type;
  }
}