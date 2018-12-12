// tslint:disable:jsx-no-multiline-js
import * as React from 'react';
import { IChatProps, IExtendedMessage, as } from 'front.core';
import { observer } from 'mobx-react';

import { GiftedChat, IMessage } from 'react-native-gifted-chat';

class MessagesBase extends React.Component<IChatProps> {
  remapMessages(messages: IExtendedMessage[]): IMessage[] {
    return this.props.messages.map((m: IExtendedMessage, i: number) => ({
      _id: i.toString(),
      text: m.body,
      createdAt: m.timestamp,
      user: {
        _id: m.senderId,
        name: m.name,
        avatar: `https://ui-avatars.com/api/?name=${m.name}&rounded=true&size=32`,
      },
    }));
  }

  render() {
    return (
      <GiftedChat
        messages={this.remapMessages(this.props.messages)}
        onSend={this.props.onMessageSend}
        onInputTextChanged={this.props.onBodyChange}
        user={{
          _id: this.props.myId,
        }}
      />
    );
  }
}

export const Messages = as<React.FunctionComponent>(observer(MessagesBase));
