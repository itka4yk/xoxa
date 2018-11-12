import * as React from 'react';

import { ISpacesStore, SpacesStoreType } from '../spaces.store';
import { as, injectProps } from '../../../helpers';
import { IMySpace } from 'api.contract';
import { observer } from 'mobx-react';
import { RouteComponentProps, withRouter as wr } from 'react-router';
import autobind from 'autobind-decorator';

interface IInjectedProps extends RouteComponentProps<any> {
  store: ISpacesStore;
}

interface ISpaceTabElement extends IMySpace {
  active: boolean;
}

export interface ISpacesComponentProps {
  spaces: ISpaceTabElement[];
  onSpaceSelected(name: string): void;
}

const withRouter: any = wr;

@injectProps({ store: SpacesStoreType })
@observer
@withRouter
class SpacesContainer extends React.Component<IInjectedProps> {
  componentWillMount() {
    this.props.store.getMySpaces();
  }

  @autobind
  handleSpaceSelected(name: string) {
    this.props.history.push(`/workspaces/single/${name.toLowerCase()}`);
  }

  render() {
    const { pathname } = this.props.location;
    const childrenWithProps = React.Children.map(this.props.children, (child: any) =>
      React.cloneElement(child, {
        spaces: this.props.store.mySpaces.map(s => ({
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
