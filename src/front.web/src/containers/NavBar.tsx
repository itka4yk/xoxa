import * as React from 'react';
import { Navbar, NavItem, Nav } from 'react-bootstrap';
import autobind from 'autobind-decorator';

@autobind
export default class NavBar extends React.Component {
  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#home">XOXA</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <NavItem eventKey={1} href="form">
            Form
          </NavItem>
          <NavItem eventKey={2} href="list">
            List
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}
