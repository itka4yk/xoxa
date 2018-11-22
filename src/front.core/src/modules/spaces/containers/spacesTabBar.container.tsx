import * as React from 'react';
import { as, injectProps } from '../../../helpers';
import { IMySpace } from 'api.contract';
import { observer } from 'mobx-react';
import { RouteComponentProps, withRouter as wr } from 'react-router';
import autobind from 'autobind-decorator';
import { ISpacesService, SpacesServiceType } from '../spaces.service';

interface IInjectedProps extends RouteComponentProps<any> {
  spacesService: ISpacesService;
}

interface ISpaceTabElement extends IMySpace {
  active: boolean;
}

export interface ISpacesComponentProps {
  spaces: ISpaceTabElement[];
  onSpaceSelected(name: string): void;
}

const withRouter: any = wr;

@injectProps({ spacesService: SpacesServiceType })
@withRouter
@observer
class SpacesContainer extends React.Component<IInjectedProps> {
  componentWillMount() {
    this.props.spacesService.getMySpaces();
  }

  @autobind
  handleSpaceSelected(name: string) {
    const spaceId = this.props.spacesService.mySpaces.find(s => s.name === name)!.id;
    this.props.spacesService.setActiveSpace(spaceId);
    this.props.history.push(`/workspaces/single/${name.toLowerCase()}`);
  }

  render() {
    const { pathname } = this.props.location;
    const childrenWithProps = React.Children.map(this.props.children, (child: any) =>
      React.cloneElement(child, {
        spaces: this.props.spacesService.mySpaces.map(s => ({
          ...s,
          active: `/workspaces/${s.name}` === pathname,
        })),
        onSpaceSelected: this.handleSpaceSelected,
      } as ISpacesComponentProps),
    );
    return childrenWithProps;
  }
}

export default as<React.ComponentClass>(SpacesContainer);
