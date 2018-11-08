import * as React from 'react';
import { Grid, Row, Col, Navbar, Button } from 'react-bootstrap';
import SpacesContainer from 'front.core/lib/modules/spaces/containers/spacesTabBar.container';
import CreateChannelContainer from 'front.core/lib/modules/channels/containers/create.container';
import SpacesTabBar from './SpacesTabBar';
import CreateChannelForm from '../channels/CreateChannelForm';
// tslint:disable-next-line:max-line-length
import { ISingleSpaceComponentProps } from 'front.core/lib/modules/spaces/containers/singleSpace.container';
import { Channel } from '../chat/ChannelItem';
import { OtherMessage } from '../chat/OtherMessage';
import { MyMessage } from '../chat/MyMessage';
import { observer } from 'mobx-react';

export const SingleSpace = observer((props: ISingleSpaceComponentProps) => (
  <div>
    <Navbar className="workspace-tabs">
      <SpacesContainer>
        <SpacesTabBar />
      </SpacesContainer>
    </Navbar>
    <Grid className="wrapper">
      <Row className="content-wrapper">
        <Col className="sidebar" xs={3} md={3}>
          <h2>{props.spaceName}</h2>
          {/* <div className="search">
            <input type="text" placeholder="search" />
            <i className="fa fa-search" />
          </div> */}
          <h3>Channels:</h3>
          <ul className="list">
            {props.channels.map(c => <Channel key={c.id}/>)}
          </ul>
          <CreateChannelContainer spaceId={props.spaceId}>
            <CreateChannelForm />
          </CreateChannelContainer>
          <h3>Direct:</h3>
          <ul className="list">
            {props.privates.map(c => <Channel key={c.id}/>)}
          </ul>
        </Col>
        <Col className="chat-content" xs={9} md={9}>
          <div className="chat-messages">
            <ul>
              <OtherMessage />
              <MyMessage />
            </ul>
          </div>
          <div className="chat-input-wrapper">
            <textarea />
            <button type="submit">Send</button>
          </div>
        </Col>
      </Row>
    </Grid>
  </div>
));
