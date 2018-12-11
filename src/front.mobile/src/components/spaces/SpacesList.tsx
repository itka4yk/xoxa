// tslint:disable:jsx-no-lambda
// tslint:disable:jsx-no-multiline-js
import * as React from 'react';
import { ISpacesComponentProps } from 'front.core/lib/modules/spaces/containers';
import { as } from 'front.core';
import { Container, Header, Content, Text, List, ListItem, Button } from 'native-base';
import LinkButton from '../../containers/LinkButton';
import { observer } from 'mobx-react';

const SpacesList = observer((props: ISpacesComponentProps) => (
  <Container>
    <Header>
      <Text>My Spaces</Text>
    </Header>
    <Content>
      <LinkButton block to="/workspaces/create">
        <Text>Create new</Text>
      </LinkButton>
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
