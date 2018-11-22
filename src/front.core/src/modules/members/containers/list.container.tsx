import * as React from 'react';

import { MembersServiceType, IMembersService } from '../members.service';
import { as, injectProps } from '../../../helpers';
import { observer } from 'mobx-react';
import { IChannel } from 'api.contract';
import { ChannelsServiceType, IChannelsService } from '../../channels/channels.service';

interface IInjectedProps {
  membersService: IMembersService;
  channelsService: IChannelsService;
}

interface IOuterProps {
  spaceId: string;
}

interface IProps extends IOuterProps, IInjectedProps {}

export interface IMembersListProps {
  channels: IChannel[];
  onSelect(id: string): void;
}

@injectProps({ membersService: MembersServiceType, channelsService: ChannelsServiceType })
@observer
class ListContainer extends React.Component<IProps> {
  render() {
    const childrenWithProps = React.Children.map(this.props.children, (child: any) =>
      React.cloneElement(child, {
        channels: this.props.membersService.store.members[this.props.spaceId] || [],
        onSelect: this.props.channelsService.setActivePrivateChannel,
      } as IMembersListProps),
    );
    return childrenWithProps;
  }
}

export default as<React.ComponentClass<IOuterProps>>(ListContainer);
