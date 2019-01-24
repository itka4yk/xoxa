import * as React from 'react';
import { as, injectProps } from '../../../helpers';
import { observer } from 'mobx-react';
import { RouteComponentProps, withRouter as wr } from 'react-router';
import { ISpacesStore, SpacesStoreType } from '../spaces.store';

interface IInjectedProps extends RouteComponentProps<{ spaceId: string }> {
  store: ISpacesStore;
}

export interface ISingleSpaceComponentProps {
  spaceId: string;
  spaceName: string;
}

const withRouter: any = wr;

@injectProps({ store: SpacesStoreType })
@observer
@withRouter
class SingleSpaceContainer extends React.Component<IInjectedProps> {
  render() {
    const space = this.props.store.spaces.find(s => s.id === this.props.match.params.spaceId)!;
    return React.Children.map(this.props.children, (child: any) =>
      React.cloneElement(child, {
        spaceId: space.id,
        spaceName: space.name,
      } as ISingleSpaceComponentProps),
    );
  }
}

export default as<React.ComponentClass>(SingleSpaceContainer);
