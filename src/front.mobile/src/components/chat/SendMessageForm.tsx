// tslint:disable:jsx-no-lambda
import * as React from 'react';
import { as, ISendMessageForm } from 'front.core';
import { Form, Item, Input, Button, Text } from 'native-base';

const SendMessageForm = (props: ISendMessageForm) => (
  <Form>
    <Item>
      <Input placeholder="Space name" onChangeText={props.onBodyChange} autoCapitalize="none" />
    </Item>
    <Button block onPress={props.onMessageSend}>
      <Text>Send</Text>
    </Button>
  </Form>
);

export default as<React.ComponentClass>(SendMessageForm);
