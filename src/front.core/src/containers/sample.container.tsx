import * as React from 'react';

export class SampleContainer extends React.Component<any> {
  render() {
    return (
      <div>
        Sample container
        {this.props.children}
      </div>
    );
  }
}
