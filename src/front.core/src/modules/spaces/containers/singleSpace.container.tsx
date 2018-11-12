import * as React from 'react';

import { ISpacesStore, SpacesStoreType } from '../spaces.store';
import { as, injectProps } from '../../../helpers';
import { IMySpace } from 'api.contract';
import { observer } from 'mobx-react';
import { RouteComponentProps, withRouter as wr } from 'react-router';
import autobind from 'autobind-decorator';
import { ChannelsStoreType, IChannelsStore } from '../../channels/channels.store';

interface IInjectedProps extends RouteComponentProps<any> {
  spaces: ISpacesStore;
  channels: IChannelsStore;
}

export interface ISingleSpaceComponentProps {
  spaceId: string;
  spaceName: string;
}

const withRouter: any = wr;

@injectProps({ spaces: SpacesStoreType, channels: ChannelsStoreType })
@observer
@withRouter
class SingleSpaceContainer extends React.Component<IInjectedProps> {
  componentWillMount() {
    this.props.spaces.getMySpaces();
  }

  @autobind
  handleSpaceSelected(name: string) {
    this.props.history.push(`/workspaces/single/${name.toLowerCase()}`);
  }

  render() {
    const routeChatName = this.props.match.params.spaceName.toLowerCase();
    // FIXME: fix routing problems
    const space: IMySpace | undefined = this.props.spaces.mySpaces.find(
      c => c.name.toLowerCase() === routeChatName,
    );
    if (!space) return 'NOT FOUND';

    const childrenWithProps = React.Children.map(this.props.children, (child: any) =>
      React.cloneElement(child, {
        spaceId: space.id,
        spaceName: space.name,
      } as ISingleSpaceComponentProps),
    );
    return childrenWithProps;
  }
}

export default as<React.ComponentClass>(SingleSpaceContainer);
