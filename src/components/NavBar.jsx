import React, { Component } from "react";
import { Navbar, NavItem
  
} from "react-materialize";
import Icon from 'react-materialize/lib/Icon'

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Navbar className="primary-color" style={{ paddingLeft:'20px' }} brand="Short Link!" right>
        <NavItem href="#!">
          <Icon>search</Icon>
        </NavItem>
        <NavItem href="#!">
          <Icon>view_module</Icon>
        </NavItem>
        <NavItem href="#!">
          <Icon>autorenew</Icon>
          
        </NavItem>
        
        <NavItem href="#!">
          Login
        </NavItem>
      </Navbar>
    );
  }
}

export default NavBar;
