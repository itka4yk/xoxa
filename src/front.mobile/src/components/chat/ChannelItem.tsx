import * as React from 'react';
import { Text } from 'native-base';
import LinkedListItem from '../../containers/LinkedListItem';

interface IProps {
  name: string;
  onSelect(): void;
}

export const Channel = (props: IProps) => (
  <LinkedListItem to="/workspaces/chat" callback={props.onSelect}>
    <Text>{props.name}</Text>
  </LinkedListItem>
);
