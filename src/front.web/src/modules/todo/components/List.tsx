import * as React from 'react';
import autobind from 'autobind-decorator';
import { ListGroup, ProgressBar, ListGroupItem, Checkbox, Panel } from 'react-bootstrap';
import { ITodoStore, TodoStoreType } from '../todo.module';
import { injectProps } from 'front.core';

interface IInjectedProps {
  store: ITodoStore;
}

@injectProps({ store: TodoStoreType })
@autobind
class TodoList extends React.Component<IInjectedProps> {
  toggleTodoStatus(e: React.MouseEvent<Checkbox>) {
    this.props.store.toggleTodoStatus((e.target as HTMLButtonElement).value);
  }
  get renderTodos(): React.ReactElement<{}>[] {
    return this.props.store.todos.map(t => (
      <ListGroupItem key={t.id} value={t.id} onClick={this.toggleTodoStatus}>
        {t.completed ? <s>{t.body}</s> : t.body}
      </ListGroupItem>
    ));
  }
  render() {
    const { completedTodoCount, todoCount } = this.props.store;
    return (
      <Panel>
        <Panel.Heading>
          <Panel.Title componentClass="h3">Todo list</Panel.Title>
        </Panel.Heading>
        <Panel.Body>
          <div>
            <ProgressBar>
              <ProgressBar
                striped
                active
                bsStyle="success"
                max={todoCount}
                now={completedTodoCount}
                label={completedTodoCount}
              />
              <ProgressBar
                striped
                active
                bsStyle="warning"
                max={todoCount}
                now={todoCount - completedTodoCount}
                label={todoCount - completedTodoCount}
              />
            </ProgressBar>
            <ListGroup>
              {this.renderTodos}
            </ListGroup>
            <br />
          </div>
        </Panel.Body>
      </Panel>
    );
  }
}

export default TodoList as React.ComponentClass<any>;
