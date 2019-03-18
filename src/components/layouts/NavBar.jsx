import React, { Component } from "react";
import { Link, Redirect } from 'react-router-dom'
import { Navbar, NavItem } from "react-materialize";
import Icon from "react-materialize/lib/Icon";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Navbar
        className="bg-primary"
        style={{ paddingLeft: "20px" }}
        brand="Short Link!"
        right
      >
        <NavItem href="#!">
          <Icon>search</Icon>
        </NavItem>
        <NavItem href="#!" onClick={ ()=> (<Redirect to="/"/>) } >
          <Icon>home</Icon>
        </NavItem>
        <NavItem href="/login"><Link to="/login">Login</Link></NavItem>
        <NavItem href="/login"><Link to="/about">About</Link></NavItem>
      </Navbar>
    );
  }
}

export default NavBar;
