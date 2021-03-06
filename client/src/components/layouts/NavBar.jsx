import React from "react";
import { Link } from 'react-router-dom'
import { Navbar, NavItem } from "react-materialize";

const NavBar = () => {
  
  return (
    <Navbar
      className="bg-primary"
      style={{ paddingLeft: "20px" }}
      brand="Short Link!"
      right
    >
      
      <NavItem children="span"><Link to="/">Home</Link></NavItem>
      <NavItem children="span"><Link to="/dashboard">Dashboard</Link></NavItem>
      <NavItem><Link to="/signup">Signup</Link></NavItem>
      <NavItem><Link to="/login">Login</Link></NavItem>
      <NavItem><Link to="/about">About</Link></NavItem>
    </Navbar>
  );
}

export default NavBar;
