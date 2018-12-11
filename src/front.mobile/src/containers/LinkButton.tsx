import * as React from 'react';
import { as, injectProps, IRouterStore, RouterStoreType } from 'front.core';
import { Button } from 'native-base';

interface IOuterProps extends Button {
  to?: string;
  back?: boolean | false;
  children: any;
}

interface IInjectedProps {
  router: IRouterStore;
}

interface IProps extends IInjectedProps, IOuterProps {}

@injectProps({ router: RouterStoreType })
class LinkButton extends React.Component<IProps> {
  handleLinkClick = (e: any) => {
    e.preventDefault();
    if (this.props.to) this.props.router.push(this.props.to);
    if (this.props.back) this.props.router.goBack();
  };

  render() {
    return (
      <Button onPress={this.handleLinkClick} {...this.props}>
        {this.props.children}
      </Button>
    );
  }
}

export default as<React.ComponentClass<IOuterProps>>(LinkButton);
