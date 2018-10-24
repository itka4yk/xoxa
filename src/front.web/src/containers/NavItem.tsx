import * as React from 'react';
import { injectProps, RouterStoreType, as, IRouterStore } from 'front.core';
import { NavItem as Base } from 'react-bootstrap';

interface IOuterProps {
  to: string;
}
interface IInjectedProps {
  router: IRouterStore;
}
interface IProps extends IInjectedProps, IOuterProps {}

@injectProps({ router: RouterStoreType })
class NavItem extends React.Component<IProps> {
  handleLinkClick = (e: any) => {
    e.preventDefault();
    this.props.router.push(this.props.to);
  };

  render() {
    return <Base onClick={this.handleLinkClick}>{this.props.children}</Base>;
  }
}

export default as<React.ComponentClass<IOuterProps>>(NavItem);
