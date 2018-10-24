import * as React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import autobind from 'autobind-decorator';
import NavItem from './NavItem';

@autobind
export default class NavBar extends React.Component {
  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/home">XOXA</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <NavItem to="/todo/form">Form</NavItem>
          <NavItem to="/todo/list">List</NavItem>
        </Nav>
        <Nav>
          <NavItem to="/logout">Logout</NavItem>
        </Nav>
      </Navbar>
    );
  }
}
