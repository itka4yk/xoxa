// tslint:disable:jsx-no-lambda
import * as React from 'react';
import { IRegisterComponentProps } from 'front.core/lib/modules/auth/containers';
import { as } from 'front.core';
import { Container, Header, Content, Form, Item, Input, Button, Text } from 'native-base';

const Register = (props: IRegisterComponentProps) => (
  <Container>
    <Header />
    <Content>
      <Form>
        <Item>
          <Input placeholder="Email" onChangeText={props.onEmailChange} />
        </Item>
        <Item last>
          <Input placeholder="Password" onChangeText={props.onPasswordChange} />
        </Item>
        <Button block onPress={props.onRegisterSubmit}>
          <Text>Login</Text>
        </Button>
      </Form>
    </Content>
  </Container>
);

export default as<React.ComponentClass>(Register);
