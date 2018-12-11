// tslint:disable:jsx-no-multiline-js
import * as React from 'react';
import { IMessagesListProps, as } from 'front.core';
import { observer } from 'mobx-react';
import { MyMessage } from './MyMessage';
import { OtherMessage } from './OtherMessage';
import { Text, List } from 'native-base';

const MessagesBase = (props: IMessagesListProps) => (
  <List>
    {props.messages.map(
      (m, i) => (m.mine ? <MyMessage key={i} {...m} /> : <OtherMessage key={i} {...m} />),
    )}
  </List>
);


export const Messages = as<React.FunctionComponent>(observer(MessagesBase));
