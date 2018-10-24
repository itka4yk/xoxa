import * as React from 'react';
import { Button, Grid, Row, Col, Navbar, ButtonGroup } from 'react-bootstrap';

export const WorkspacesView = () => (
  <div>
    <Navbar className="workspace-tabs">
      <ButtonGroup>
        <Button>Left</Button>
        <Button>Middle</Button>
        <Button>Right</Button>
      </ButtonGroup>
    </Navbar>
    <Grid className="wrapper">
      <Row className="content-wrapper">
        <Col className="sidebar" xs={3} md={3}>
          <div className="search">
            <input type="text" placeholder="search" />
            <i className="fa fa-search" />
          </div>
          <h3>Channels:</h3>
          <ul className="list">
            <Channel />
            <Channel />
            <Channel />
          </ul>
          <h3>Direct:</h3>
          <ul className="list">
            <ChatMember />
            <ChatMember />
            <ChatMember />
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
);

const MyMessage = () => (
  <li className="clearfix">
    <div className="message-data align-right">
      <span className="message-data-time">10:10 AM, Today</span>
      <br />
      <span className="message-data-name">Olia</span>
      <i className="fa fa-circle me" />
    </div>
    <div className="message my-message">
      Hi Vincent, how are you? How is the project coming along?
    </div>
  </li>
);

const OtherMessage = () => (
  <li className="clearfix">
    <div className="message-data align-left">
      <span className="message-data-time">10:10 AM, Today</span>
      <br />
      <span className="message-data-name">Olia</span>
      <i className="fa fa-circle me" />
      <br />
    </div>
    <div>
      <div className="message other-message">
        Hi Vincent, how are you? How is the project coming along?
      </div>
    </div>
  </li>
);

const ChatMember = () => (
  <li className="chat-member">
    <div className="name">Vincent Porter</div>
  </li>
);
const Channel = () => (
  <li className="chat-member">
    <div className="name">All</div>
  </li>
);
