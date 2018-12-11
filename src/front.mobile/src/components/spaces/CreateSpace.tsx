// tslint:disable:jsx-no-lambda
import * as React from 'react';
import { as, ICreateSpaceComponent } from 'front.core';
// tslint:disable-next-line:max-line-length
import { Container, Header, Content, Form, Item, Input, Button, Text, Left, Body, Right } from 'native-base';
import LinkButton from '../../containers/LinkButton';

const CreateSpace = (props: ICreateSpaceComponent) => (
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
