import { enableLogging } from 'mobx-logger';

declare var process: any;

export function enableDevTools() {
  if (process.env.NODE_ENV !== 'development') return;

  enableLogging({
    reaction: true,
    action: true,
    transaction: true,
    compute: true,
  });
}
