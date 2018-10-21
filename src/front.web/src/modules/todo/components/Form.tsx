import * as React from 'react';
import { as, injectProps } from 'front.core';
import { FormControl, FormGroup, Button, Panel } from 'react-bootstrap';
import autobind from 'autobind-decorator';
import { ITodoStore, TodoStoreType } from '../todo.module';

interface IInjectedProps {
  store: ITodoStore;
}

interface IState {
  body: string;
  type: string;
}

@injectProps({ store: TodoStoreType })
@autobind
class TodoForm extends React.Component<IInjectedProps, IState> {
  state: IState = {
    type: '',
    body: '',
  };

  handleBodyChange = (e: React.FormEvent<FormControl>) => this.setState({ body: e.target.value });
  handleTypeChange = (e: React.FormEvent<FormControl>) => this.setState({ type: e.target.value });
  handleAddTodo = () => this.props.store.addTodo(this.state.body);
  render() {
    return (
      <Panel>
        <Panel.Heading>
          <Panel.Title componentClass="h3">Create new todo</Panel.Title>
        </Panel.Heading>
        <Panel.Body>
          <form>
            <FormGroup>
              <FormControl
                type="text"
                placeholder="type"
                value={this.state.type}
                onChange={this.handleTypeChange}
              />
              <br />
              <FormControl
                type="text"
                placeholder="body"
                value={this.state.body}
                onChange={this.handleBodyChange}
              />
              <br />
              <Button block bsStyle="success" onClick={this.handleAddTodo}>
                Save
              </Button>
            </FormGroup>
          </form>
        </Panel.Body>
      </Panel>
    );
  }
}

export default as<React.ComponentClass>(TodoForm);
