import * as React from 'react';
import { RouteComponentProps, Route } from 'react-router';
import { SwitchWithNotFound } from 'front.core/lib/containers';

import TodoForm from '../modules/todo/components/Form';
import TodoList from '../modules/todo/components/List';
import { NotFoundView } from './NotFound.view';
import NavBar from '../containers/NavBar';

export const TodoView = ({ match }: RouteComponentProps) => (
  <div>
    <NavBar />
    <SwitchWithNotFound notFound={NotFoundView}>
      <Route exact path={`${match.path}/form`} component={TodoForm} />
      <Route exact path={`${match.path}/list`} component={TodoList} />
    </SwitchWithNotFound>
  </div>
);
