import * as React from 'react';
import { ListItem, Text } from 'native-base';

interface IProps {
  name: string;
  onSelect(): void;
}

export const Member = (props: IProps) => (
  <ListItem onPress={props.onSelect}>
    <Text>{props.name}</Text>
  </ListItem>
);
