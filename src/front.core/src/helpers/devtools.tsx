import * as React from 'react';
import { enableLogging } from 'mobx-logger';
import { isObservable } from 'mobx';
import { whyDidYouUpdate } from 'why-did-you-update';

declare var process: any;

export function enableDevTools() {
  if (process.env.NODE_ENV !== 'development') return;
  // const React = require('react');

  enableLogging({
    reaction: true,
    action: true,
    transaction: true,
    compute: true,
  });

  const notifier = (a: boolean, b: boolean, componentName: string, diffs: any[]) => {
    if (componentName === 'Switch') return;
    if (Object.values(diffs[0].prev).some(p => isObservable(p))) return;
    // tslint:disable-next-line:no-console
    console.error('Why did you MOTHERFUCKER update?', componentName, diffs);
  };

  whyDidYouUpdate(React, { notifier, groupByComponent: false, collapseComponentGroups: false } as any);
}
