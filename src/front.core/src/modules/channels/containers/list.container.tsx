import * as React from 'react';

import { as, injectProps } from '../../../helpers';
import { observer } from 'mobx-react';
import { IChannel } from 'api.contract';
import { IChannelsListProps } from './list.container';
import { ISpacesStore, SpacesStoreType } from '../..';
import { RouteComponentProps, withRouter } from 'react-router';

interface IInjectedProps extends RouteComponentProps<{ spaceId: string }> {
  spacesStore: ISpacesStore;
}

interface IOuterProps {
  spaceId: string;
}

interface IProps extends IOuterProps, IInjectedProps {}

export interface IChannelsListProps {
  channels: IChannel[];

  onSelect(id: string): void;
}

@injectProps({ spacesStore: SpacesStoreType })
@observer
@(withRouter as any)
class ChannelsListContainer extends React.Component<IProps> {
  render() {
    return React.Children.map(this.props.children, (child: any) =>
      React.cloneElement(child, {
        channels: this.props.spacesStore.spaces.find(s => s.id === this.props.match.params.spaceId)!
          .channels,
        onSelect: id =>
          this.props.history.push(
            `/workspaces/single/${this.props.match.params.spaceId}/true/${id}`,
          ),
      } as IChannelsListProps),
    );
  }
}

export default as<React.ComponentClass<IOuterProps>>(ChannelsListContainer);
