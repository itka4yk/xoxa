import { observer } from 'mobx-react';
import * as React from 'react';
import { Container } from 'inversify';

export interface IInjectProps {
  [typeName: string]: string | symbol;
}

export interface ICallbackResult {
  [objName: string]: any;
}

let container: Container;
export function initContainer(cont: Container) {
  container = cont;
}

export function injectProps(props: IInjectProps, callback?: (s: any) => ICallbackResult) {
  return function(Component: React.ComponentClass<any>): any {

    if (container === undefined) throw new Error('Uninitialized container in injectProps decorator');

    let newProps = Object.keys(props)
      .map(k => ({ [k]: container.get(props[k]) }))
      .reduce((c, a) => ({ ...a, ...c }));

    if (callback) newProps = callback({ ...newProps });

    const DecoratedComponent = observer(Component);
    class Wrapper extends React.Component {
      render() {
        return <DecoratedComponent {...newProps} {...this.props} />;
      }
    }

    return Wrapper;
  };
}

/**
 * Casts object to type T.
 * Helps in runtime with react components, which have injected props.
 * @param input object
 */
export const as = <T extends {}>(input: any): T => input;
