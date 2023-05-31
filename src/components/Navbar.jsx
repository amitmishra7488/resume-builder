import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../Style/Navbar.css';

const NavBar = () => {
  return (
    <Navbar expand="lg" bg="dark" variant="dark" className="navbar">
      <Navbar.Brand className="navbar-brand">Resume Builder</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
        <Nav>
          <Nav.Link as={Link} to="/" className="nav-link">Create Resume</Nav.Link>
          <Nav.Link as={Link} to="/preview" className="nav-link">View Resume</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
