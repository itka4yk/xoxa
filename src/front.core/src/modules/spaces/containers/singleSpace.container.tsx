import * as React from 'react';

import { ISpacesStore, SpacesStoreType } from '../spaces.store';
import { injectProps, as } from '../../../helpers';
import { IMySpace } from 'api.contract';
import { observer } from 'mobx-react';
import { withRouter, RouterProps, RouteComponentProps } from 'react-router';
import autobind from 'autobind-decorator';
import { IChannelsStore, ChannelsStoreType } from '../../channels/channels.store';

interface IInjectedProps extends RouteComponentProps<any> {
  spaces: ISpacesStore;
  channels: IChannelsStore;
}

export interface ISingleSpaceComponentProps {
  spaceId: string;
  spaceName: string;
  channels: any[];
  privates: any[];
}

@injectProps({ spaces: SpacesStoreType, channels: ChannelsStoreType })
@observer
@withRouter
class SingleSpaceContainer extends React.Component<IInjectedProps> {

  componentWillMount() {
    this.props.spaces.getMySpaces();
  }

  @autobind
  handleSpaceSelected(name: string) {
    console.log(name);
    this.props.history.push(`/workspaces/single/${name.toLowerCase()}`)
  }

  render() {
    console.log('SINGLE SPACE RENDER');
    const routeChatName = this.props.match.params.spaceName.toLowerCase();
    // FIXME: fix routing problems
    const space: IMySpace| undefined = this.props.spaces.mySpaces.find(c => c.name.toLowerCase() === routeChatName);
    if (!space) return 'NOT FOUND';
    this.props.channels.getChannels(space.id);

    const childrenWithProps = React.Children.map(this.props.children, (child: any) => React.cloneElement(child, {
      spaceId: space.id,
      spaceName: space.name,
      channels: this.props.channels.channels.map(s => s),
      privates: [],
    } as ISingleSpaceComponentProps));
    return childrenWithProps;
  }
}

export default as<React.ComponentClass>(SingleSpaceContainer);
