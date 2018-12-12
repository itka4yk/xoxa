// tslint:disable:jsx-no-lambda
// tslint:disable:jsx-no-multiline-js
import * as React from 'react';
import ChannelsListContainer from 'front.core/lib/modules/channels/containers/list.container';
import MembersListContainer from 'front.core/lib/modules/members/containers/list.container';
// tslint:disable-next-line:max-line-length
import { ISingleSpaceComponentProps } from 'front.core/lib/modules/spaces/containers/singleSpace.container';
import ChannelsList from '../channels/ChannelsList';
import MembersList from '../members/MembersList';
import { as } from 'front.core';

import { Container, Header, Content, Text, List, ListItem, Left, Right, Body } from 'native-base';
import LinkButton from '../../containers/LinkButton';
import LinkIcon from '../../containers/LinkIcon';

const SingleSpace = (props: ISingleSpaceComponentProps) => (
  <Container>
    <Header>
      <Left>
        <LinkButton transparent to="/workspaces">
          <Text>Back</Text>
        </LinkButton>
      </Left>
      <Body>
        <Text>{props.spaceName}</Text>
      </Body>
      <Right />
    </Header>
    <Content>
      <List>
        <ListItem itemDivider>
          <Left>
            <Text>Channels</Text>
          </Left>
          <Body />
          <Right>
            <LinkIcon
              name="add"
              to={`/workspaces/single/${props.spaceName}/createChannel/${props.spaceId}`}
            />
          </Right>
        </ListItem>
        <ChannelsListContainer spaceId={props.spaceId}>
          <ChannelsList />
        </ChannelsListContainer>
        <ListItem itemDivider>
          <Text>Privates</Text>
        </ListItem>
        <MembersListContainer spaceId={props.spaceId}>
          <MembersList />
        </MembersListContainer>
      </List>
    </Content>
  </Container>
);

export default as<React.ComponentClass>(SingleSpace);
