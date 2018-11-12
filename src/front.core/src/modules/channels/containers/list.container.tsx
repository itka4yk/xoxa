import * as React from 'react';

import { ChannelsStoreType, IChannelsStore } from '../channels.store';
import { as, injectProps } from '../../../helpers';
import { observer } from 'mobx-react';
import { IChannel } from 'api.contract';

interface IInjectedProps {
  store: IChannelsStore;
}

interface IOuterProps {
  spaceId: string;
}

interface IProps extends IOuterProps, IInjectedProps {}

export interface IChannelsListProps {
  channels: IChannel[];

  onSelect(id: string): void;
}

@injectProps({ store: ChannelsStoreType })
@observer
class ChannelsListContainer extends React.Component<IProps> {
  render() {
    const childrenWithProps = React.Children.map(this.props.children, (child: any) =>
      React.cloneElement(child, {
        channels: this.props.store.channels[this.props.spaceId] || [],
        onSelect: id => this.props.store.setActiveChannel(id),
      } as IChannelsListProps),
    );
    return childrenWithProps;
  }
}

export default as<React.ComponentClass<IOuterProps>>(ChannelsListContainer);
