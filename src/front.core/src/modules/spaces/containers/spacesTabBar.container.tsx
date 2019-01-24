import * as React from 'react';
import { as, injectProps } from '../../../helpers';
import { IMySpace } from 'api.contract';
import { observer } from 'mobx-react';
import { RouteComponentProps, withRouter as wr } from 'react-router';
import autobind from 'autobind-decorator';
import { ISpacesService, SpacesServiceType } from '../spaces.service';
import { ISpacesComponentProps } from './spacesTabBar.container';

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
  componentDidMount() {
    this.props.spacesService.getMySpaces();
  }

  @autobind
  handleSpaceSelected(id: string) {
    this.props.history.push(`/workspaces/single/${id}`);
  }

  render() {
    const { pathname } = this.props.location;
    return React.Children.map(this.props.children, (child: any) =>
      React.cloneElement(child, {
        spaces: this.props.spacesService.mySpaces.map(s => ({
          ...s,
          active: `/workspaces/${s.name}` === pathname,
        })),
        onSpaceSelected: this.handleSpaceSelected,
      } as ISpacesComponentProps),
    );
  }
}

export default as<React.ComponentClass>(SpacesContainer);
