import * as React from 'react';
import autobind from 'autobind-decorator';

import { ChannelsServiceType, IChannelsService } from '../channels.service';
import { as, injectProps } from '../../../helpers';
import { ICreateChannelFormProps } from './create.container';
import { RouteComponentProps, withRouter } from 'react-router';

interface IInjectedProps extends RouteComponentProps<{ spaceId: string }> {
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
@(withRouter as any)
class CreateChannelContainer extends React.Component<IProps, IState> {
  state = { name: '' };

  @autobind
  async handleFormSubmit() {
    await this.props.store.createNewChannel({
      name: this.state.name,
      spaceId: this.props.match.params.spaceId,
    });
  }

  handleNameChange = (name: string) => this.setState({ name });

  render() {
    return React.Children.map(this.props.children, (child: any) =>
      React.cloneElement(child, {
        onNameChange: this.handleNameChange,
        onFormSubmit: this.handleFormSubmit,
      } as ICreateChannelFormProps),
    );
  }
}

export default as<React.ComponentClass<IOuterProps>>(CreateChannelContainer);
