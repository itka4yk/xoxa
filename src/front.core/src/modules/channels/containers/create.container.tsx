import * as React from 'react';
import autobind from 'autobind-decorator';

import { IChannelsStore, ChannelsStoreType } from '../channels.store';
import { injectProps, as } from '../../../helpers';

interface IInjectedProps {
  store: IChannelsStore;
}

interface IOuterProps {
  spaceId: string;
}

interface IState {
  name: string;
}

interface IProps extends IOuterProps, IInjectedProps {}

export interface ICreateChannelFormProps {
  onNameChange(name: string): void;
  onFormSubmit(): void;
}

@injectProps({ store: ChannelsStoreType })
@autobind
class CreateChannelContainer extends React.Component<IProps, IState> {

  state = { name: '' };

  handleFormSubmit() {
    this.props.store.createNewChannel({ name: this.state.name, spaceId: this.props.spaceId });
  }

  handleNameChange = (name: string) => this.setState({ name });

  render() {
    const childrenWithProps = React.Children.map(this.props.children, (child: any) => React.cloneElement(child, {
      onNameChange: this.handleNameChange,
      onFormSubmit: this.handleFormSubmit,
    } as ICreateChannelFormProps));
    return childrenWithProps;
  }
}

export default as<React.ComponentClass<IOuterProps>>(CreateChannelContainer);
