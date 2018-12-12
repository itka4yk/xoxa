import * as React from 'react';
import { as, injectProps, IRouterStore, RouterStoreType } from 'front.core';
import { Icon } from 'native-base';

interface IOuterProps {
  to?: string;
  back?: boolean | false;
  name: string;
}

interface IInjectedProps {
  router: IRouterStore;
}

interface IProps extends IInjectedProps, IOuterProps {}

@injectProps({ router: RouterStoreType })
class LinkIcon extends React.Component<IProps> {
  handleLinkClick = (e: any) => {
    e.preventDefault();
    if (this.props.to) this.props.router.push(this.props.to);
    if (this.props.back) this.props.router.goBack();
  };

  render() {
    return (
      <Icon
        onPress={this.handleLinkClick}
        name={this.props.name}
        style={{ fontSize: 30, color: 'blue' }}
      />
    );
  }
}

export default as<React.ComponentClass<IOuterProps>>(LinkIcon);
