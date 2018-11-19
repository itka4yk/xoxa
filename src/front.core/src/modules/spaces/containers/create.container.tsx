import * as React from 'react';
import autobind from 'autobind-decorator';

import { ISpacesStore, SpacesStoreType } from '../spaces.store';
import { injectProps, as } from '../../../helpers';

interface IInjectedProps {
  store: ISpacesStore;
}

interface IState {
  name: string;
  adminName: string;
}

export interface ICreateSpaceComponent {
  onNameChange(name: string): void;
  onAdminNameChange(adminName: string): void;
  onFormSubmit(): void;
}

@injectProps({ store: SpacesStoreType })
@autobind
class CreateSpaceContainer extends React.Component<IInjectedProps, IState> {
  state = { name: '', adminName: '' };

  handleFormSubmit() {
    this.props.store.createNewSpace(this.state);
  }

  handleNameChange = (name: string) => this.setState({ name });

  handleAdminNameChange = (adminName: string) => this.setState({ adminName });

  render() {
    const childrenWithProps = React.Children.map(this.props.children, (child: any) =>
      React.cloneElement(child, {
        onAdminNameChange: this.handleAdminNameChange,
        onNameChange: this.handleNameChange,
        onFormSubmit: this.handleFormSubmit,
      } as ICreateSpaceComponent),
    );
    return childrenWithProps;
  }
}

export default as<React.ComponentClass>(CreateSpaceContainer);
