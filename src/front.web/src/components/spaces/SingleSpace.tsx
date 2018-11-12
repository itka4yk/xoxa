import * as React from 'react';
import { Col, Grid, Navbar, Row } from 'react-bootstrap';
import SpacesContainer from 'front.core/lib/modules/spaces/containers/spacesTabBar.container';
import SendMessageContainer from 'front.core/lib/modules/chat/containers/sendMessage.container';
import CreateChannelContainer from 'front.core/lib/modules/channels/containers/create.container';
import ChannelsListContainer from 'front.core/lib/modules/channels/containers/list.container';
import SpacesTabBar from './SpacesTabBar';
import CreateChannelForm from '../channels/CreateChannelForm';
// tslint:disable-next-line:max-line-length
import { ISingleSpaceComponentProps } from 'front.core/lib/modules/spaces/containers/singleSpace.container';
import { OtherMessage } from '../chat/OtherMessage';
import { MyMessage } from '../chat/MyMessage';
import ChannelsList from '../channels/ChannelsList';
import { as } from 'front.core';
import LinkButton from '../../containers/LinkButton';
import SendMessageForm from '../chat/SendMessageForm';

const SingleSpace = (props: ISingleSpaceComponentProps) => (
  <div>
    <Navbar className="workspace-tabs">
      <LinkButton to={`/workspaces/single/${props.spaceName}/settings`}>Settings</LinkButton>
      <LinkButton to="/workspaces/create">Create</LinkButton>
      <SpacesContainer>
        <SpacesTabBar />
      </SpacesContainer>
    </Navbar>
    <Grid className="wrapper">
      <Row className="content-wrapper">
        <Col className="sidebar" xs={3} md={3}>
          <h2>{props.spaceName}</h2>

          <h3>Channels:</h3>
          <ChannelsListContainer spaceId={props.spaceId}>
            <ChannelsList />
          </ChannelsListContainer>
          <CreateChannelContainer spaceId={props.spaceId}>
            <CreateChannelForm />
          </CreateChannelContainer>
        </Col>
        <Col className="chat-content" xs={9} md={9}>
          <div className="chat-messages">
            <ul>
              <OtherMessage />
              <MyMessage />
            </ul>
          </div>
          <SendMessageContainer>
            <SendMessageForm />
          </SendMessageContainer>
        </Col>
      </Row>
    </Grid>
  </div>
);

export default as<React.ComponentClass>(SingleSpace);
