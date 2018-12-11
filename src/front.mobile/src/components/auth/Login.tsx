// tslint:disable:jsx-no-lambda
import * as React from 'react';
import { ILoginComponentProps } from 'front.core/lib/modules/auth/containers';
import { as } from 'front.core';
import { Container, Header, Content, Form, Item, Input, Button, Text } from 'native-base';

const Login = (props: ILoginComponentProps) => (
  <Container>
    <Header />
    <Content>
      <Form>
        <Item>
          <Input
            placeholder="Email"
            onChangeText={props.onEmailChange}
            autoCapitalize="none"
          />
        </Item>
        <Item last>
          <Input
            placeholder="Password"
            onChangeText={props.onPasswordChange}
            autoCapitalize="none"
          />
        </Item>
        <Button block onPress={props.onLoginSubmit}>
          <Text>Login</Text>
        </Button>
      </Form>
    </Content>
  </Container>
);

export default as<React.SFC>(Login);
