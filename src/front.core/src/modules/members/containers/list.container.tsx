import * as React from 'react';

import { as, injectProps } from '../../../helpers';
import { observer } from 'mobx-react';
import { IChannel } from 'api.contract';
import { ChannelsServiceType, IChannelsService, ISpacesStore, SpacesStoreType } from '../..';
import { RouteComponentProps, withRouter } from 'react-router';
import { IMembersListProps } from './list.container';

interface IInjectedProps extends RouteComponentProps<{ spaceId: string }> {
  channelsService: IChannelsService;
  spacesStore: ISpacesStore;
}

interface IOuterProps {
  spaceId: string;
}

interface IProps extends IOuterProps, IInjectedProps {}

export interface IMembersListProps {
  channels: IChannel[]; // FIXME: rename prop
  onSelect(id: string): void;
}

@injectProps({
  channelsService: ChannelsServiceType,
  spacesStore: SpacesStoreType,
})
@observer
@(withRouter as any)
class ListContainer extends React.Component<IProps> {
  render() {
    const members = this.props.spacesStore.spaces.find(
      s => s.id === this.props.match.params.spaceId,
    )!.members;
    return React.Children.map(this.props.children, (child: any) =>
      React.cloneElement(child, {
        channels: members,
        onSelect: id =>
          this.props.history.push(
            `/workspaces/single/${this.props.match.params.spaceId}/false/${id}`,
          ),
      } as IMembersListProps),
    );
  }
}

export default as<React.ComponentClass<IOuterProps>>(ListContainer);
