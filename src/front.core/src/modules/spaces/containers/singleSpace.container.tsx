import * as React from 'react';
import { as, injectProps } from '../../../helpers';
import { IMySpace } from 'api.contract';
import { observer } from 'mobx-react';
import { RouteComponentProps, withRouter as wr } from 'react-router';
import autobind from 'autobind-decorator';
import { ISpacesService, SpacesServiceType } from '../spaces.service';

interface IInjectedProps extends RouteComponentProps<any> {
  spaceService: ISpacesService;
}

export interface ISingleSpaceComponentProps {
  spaceId: string;
  spaceName: string;
}

const withRouter: any = wr;

@injectProps({ spaceService: SpacesServiceType })
@observer
@withRouter
class SingleSpaceContainer extends React.Component<IInjectedProps> {
  componentWillMount() {
    this.props.spaceService.getMySpaces();
  }

  @autobind
  handleSpaceSelected(name: string) {
    this.props.history.push(`/workspaces/single/${name.toLowerCase()}`);
  }

  render() {
    const routeChatName = this.props.match.params.spaceName.toLowerCase();
    // FIXME: fix routing problems
    const space: IMySpace | undefined = this.props.spaceService.mySpaces.find(
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
