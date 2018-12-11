// tslint:disable:jsx-no-lambda
import * as React from 'react';
import { as, ICreateSpaceComponent } from 'front.core';
import { Container, Header, Content, Form, Item, Input, Button, Text } from 'native-base';

const CreateSpace = (props: ICreateSpaceComponent) => (
  <Container>
    <Header />
    <Content>
      <Form>
        <Item>
          <Input
            placeholder="Space name"
            onChangeText={props.onNameChange}
            autoCapitalize="none"
          />
        </Item>
        <Item last>
          <Input
            placeholder="Admin Name"
            onChangeText={props.onAdminNameChange}
            autoCapitalize="none"
          />
        </Item>
        <Button block onPress={props.onFormSubmit}>
          <Text>Create</Text>
        </Button>
      </Form>
    </Content>
  </Container>
);

export default as<React.ComponentClass>(CreateSpace);
