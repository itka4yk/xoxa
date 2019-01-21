import * as React from 'react';
import { IMessagesListProps, as } from 'front.core';
import { observer } from 'mobx-react';
import { MyMessage } from './MyMessage';
import { OtherMessage } from './OtherMessage';

const MessagesBase = (props: IMessagesListProps) =>
  props.messages.length === 0 ? (
    <div>No messages :(</div>
  ) : (
    props.messages.map((m, i) =>
      m.mine ? <MyMessage key={i} {...m} /> : <OtherMessage key={i} {...m} />,
    )
  );

export const Messages = as<React.StatelessComponent>(observer(MessagesBase));
