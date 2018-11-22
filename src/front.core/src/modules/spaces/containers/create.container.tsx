import * as React from 'react';
import autobind from 'autobind-decorator';

import { injectProps, as } from '../../../helpers';
import { ISpacesService, SpacesServiceType } from '../spaces.service';

interface IInjectedProps {
  service: ISpacesService;
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

@injectProps({ service: SpacesServiceType })
@autobind
class CreateSpaceContainer extends React.Component<IInjectedProps, IState> {
  state = { name: '', adminName: '' };

  handleFormSubmit() {
    this.props.service.createNewSpace(this.state);
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
