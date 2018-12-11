import * as React from 'react';
import { as, injectProps, IRouterStore, RouterStoreType } from 'front.core';
import { ListItem } from 'native-base';

interface IOuterProps {
  to?: string;
  back?: boolean | false;
  callback?(): void;
}

interface IInjectedProps {
  router: IRouterStore;
}

interface IProps extends IInjectedProps, IOuterProps {}

@injectProps({ router: RouterStoreType })
class LinkedListItem extends React.Component<IProps> {
  handleLinkClick = (e: any) => {
    e.preventDefault();
    console.log('LINKED LIST', this.props);
    if (this.props.callback) this.props.callback();
    if (this.props.to) this.props.router.push(this.props.to);
    if (this.props.back) this.props.router.goBack();
  };

  render() {
    return (
      <ListItem onPress={this.handleLinkClick} {...this.props}>
        {this.props.children}
      </ListItem>
    );
  }
}

export default as<React.ComponentClass<IOuterProps>>(LinkedListItem);
