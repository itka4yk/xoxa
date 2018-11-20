import * as React from 'react';

import { MembersStoreType, IMembersStore } from '../members.store';
import { as, injectProps } from '../../../helpers';
import { observer } from 'mobx-react';
import { IChannel } from 'api.contract';
import { ChannelsStoreType, IChannelsStore } from '../../channels/channels.store';

interface IInjectedProps {
  membersStore: IMembersStore;
  channelsStore: IChannelsStore;
}

interface IOuterProps {
  spaceId: string;
}

interface IProps extends IOuterProps, IInjectedProps {}

export interface IMembersListProps {
  channels: IChannel[];

  onSelect(id: string): void;
}

@injectProps({ membersStore: MembersStoreType, channelsStore: ChannelsStoreType })
@observer
class ListContainer extends React.Component<IProps> {
  render() {
    const childrenWithProps = React.Children.map(this.props.children, (child: any) =>
      React.cloneElement(child, {
        channels: this.props.membersStore.members[this.props.spaceId] || [],
        onSelect: this.props.channelsStore.setActivePrivateChannel,
      } as IMembersListProps),
    );
    return childrenWithProps;
  }
}

export default as<React.ComponentClass<IOuterProps>>(ListContainer);
