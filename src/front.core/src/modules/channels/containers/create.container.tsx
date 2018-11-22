import * as React from 'react';
import autobind from 'autobind-decorator';

import { ChannelsServiceType, IChannelsService } from '../channels.service';
import { as, injectProps } from '../../../helpers';

interface IInjectedProps {
  store: IChannelsService;
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

@injectProps({ store: ChannelsServiceType })
@autobind
class CreateChannelContainer extends React.Component<IProps, IState> {
  state = { name: '' };

  async handleFormSubmit() {
    await this.props.store.createNewChannel({ name: this.state.name, spaceId: this.props.spaceId });
    await this.props.store.getChannels(this.props.spaceId);
  }

  handleNameChange = (name: string) => this.setState({ name });

  render() {
    const childrenWithProps = React.Children.map(this.props.children, (child: any) =>
      React.cloneElement(child, {
        onNameChange: this.handleNameChange,
        onFormSubmit: this.handleFormSubmit,
      } as ICreateChannelFormProps),
    );
    return childrenWithProps;
  }
}

export default as<React.ComponentClass<IOuterProps>>(CreateChannelContainer);
