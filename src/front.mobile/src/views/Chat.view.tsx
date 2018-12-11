import * as React from 'react';
import { RouteProps } from 'react-router';
// tslint:disable-next-line:max-line-length
import { Container, Header, Content, Body, Text, Left, Right } from 'native-base';
import MessagesContainer from 'front.core/lib/modules/chat/containers/messages.container';
import SendMessageContainer from 'front.core/lib/modules/chat/containers/sendMessage.container';
import { Messages } from '../components/chat/Messages';
import SendMessageForm from '../components/chat/SendMessageForm';
import LinkButton from '../containers/LinkButton';

export const ChatView = ({ location }: RouteProps) => (
  <Container>
    <Header>
      <Left>
        <LinkButton transparent back>
          <Text>Back</Text>
        </LinkButton>
      </Left>
      <Body>
        <Text>Create</Text>
      </Body>
      <Right />
    </Header>
    <Content>
      <MessagesContainer>
        <Messages />
      </MessagesContainer>
      <SendMessageContainer>
        <SendMessageForm />
      </SendMessageContainer>
    </Content>
  </Container>
);
