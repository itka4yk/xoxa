// tslint:disable:jsx-no-lambda
// tslint:disable:jsx-no-multiline-js
import * as React from 'react';
import { ISpacesComponentProps } from 'front.core/lib/modules/spaces/containers';
import { as } from 'front.core';
// tslint:disable-next-line:max-line-length
import { Container, Header, Content, Text, List, ListItem, Right, Body, Left } from 'native-base';
import LinkButton from '../../containers/LinkButton';
import { observer } from 'mobx-react';

const SpacesList = observer((props: ISpacesComponentProps) => (
  <Container>
    <Header>
      <Left />
      <Body>
        <Text>My Spaces</Text>
      </Body>
      <Right>
        <LinkButton transparent block to="/workspaces/create">
          <Text>New</Text>
        </LinkButton>
      </Right>
    </Header>
    <Content>
      <List>
        {props.spaces.map(s => (
          <ListItem onPress={() => props.onSpaceSelected(s.name)} key={s.id}>
            <Text>{s.name}</Text>
          </ListItem>
        ))}
      </List>
    </Content>
  </Container>
));

export default as<React.ComponentClass>(SpacesList);
