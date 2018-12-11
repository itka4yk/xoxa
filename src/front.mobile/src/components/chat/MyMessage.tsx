import * as React from 'react';
import { IChatMessageDto } from 'api.contract';
import { ListItem, Text } from 'native-base';

export const MyMessage = (props: IChatMessageDto & { name: string }) => (
  <ListItem>
    <Text>{new Date(props.timestamp).toLocaleString()}</Text>
    <Text>{props.name}</Text>
    <Text>{props.body}</Text>
  </ListItem>
);
