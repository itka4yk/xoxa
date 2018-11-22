import * as React from 'react';

import { ChannelsServiceType, IChannelsService } from '../channels.service';
import { as, injectProps } from '../../../helpers';
import { observer } from 'mobx-react';
import { IChannel } from 'api.contract';

interface IInjectedProps {
  service: IChannelsService;
}

interface IOuterProps {
  spaceId: string;
}

interface IProps extends IOuterProps, IInjectedProps {}

export interface IChannelsListProps {
  channels: IChannel[];

  onSelect(id: string): void;
}

@injectProps({ service: ChannelsServiceType })
@observer
class ChannelsListContainer extends React.Component<IProps> {
  render() {
    const childrenWithProps = React.Children.map(this.props.children, (child: any) =>
      React.cloneElement(child, {
        channels: this.props.service.store.publicChannels[this.props.spaceId] || [],
        onSelect: id => this.props.service.setActivePublicChannel(id),
      } as IChannelsListProps),
    );
    return childrenWithProps;
  }
}

export default as<React.ComponentClass<IOuterProps>>(ChannelsListContainer);
