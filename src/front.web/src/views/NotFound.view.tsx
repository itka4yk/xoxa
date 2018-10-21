import * as React from 'react';
import { RouteProps } from 'react-router';

export const NotFoundView = ({ location }: RouteProps) => (
  <div>
    <h3>
      No match for <code>{location ? location.pathname : 'undefined'}</code>
    </h3>
  </div>
);
