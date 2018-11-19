import * as React from 'react';
import { IMessagesListProps } from 'front.core';
import { as } from '../../../../front.core/src/helpers/react.helpers';
import { observer } from 'mobx-react';
import { MyMessage } from './MyMessage';
import { OtherMessage } from './OtherMessage';

const MessagesBase = (props: IMessagesListProps) =>
  props.messages.map((m, i) =>
    m.mine ? <MyMessage key={i} {...m} /> : <OtherMessage key={i} {...m} />,
  );

export const Messages = as<React.StatelessComponent>(observer(MessagesBase));
