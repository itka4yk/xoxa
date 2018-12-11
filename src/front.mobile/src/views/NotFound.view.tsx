import * as React from 'react';
import { RouteProps } from 'react-router';
import { Container, Header, Content, Text } from 'native-base';

export const NotFoundView = ({ location }: RouteProps) => (
  <Container>
    <Header />
    <Content>
      <Text>NOT FOUND {location ? location.pathname : 'undefined'}</Text>
    </Content>
  </Container>
);
