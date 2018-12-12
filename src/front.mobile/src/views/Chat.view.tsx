import * as React from 'react';
import { RouteProps } from 'react-router';
// tslint:disable-next-line:max-line-length
import { View, StyleSheet } from 'react-native';
import { Container, Header, Body, Text, Left, Right } from 'native-base';
import ChatContainer from 'front.core/lib/modules/chat/containers/chat.container';
import { Messages } from '../components/chat/Messages';
import LinkButton from '../containers/LinkButton';

const styles = StyleSheet.create({
  view: {
    flex: 1,
    marginBottom: 30,
  },
});

export const ChatView = (props: RouteProps) => (
  <Container>
    <Header>
      <Left>
        <LinkButton transparent back>
          <Text>Back</Text>
        </LinkButton>
      </Left>
      <Body>
        <Text>Chat</Text>
      </Body>
      <Right />
    </Header>
    <View style={styles.view}>
      <ChatContainer>
        <Messages />
      </ChatContainer>
    </View>
  </Container>
);
