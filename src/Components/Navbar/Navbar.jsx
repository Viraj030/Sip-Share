import React, { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase';
import { AuthContext } from '../../AuthContext';
import {toast} from "react-toastify"

const NavigationBar = () => {
  const { user } = useContext(AuthContext);

  const handleLogout = () => {
    if (user) {
      auth.signOut()
        .then(() => {
          toast.success("Logout Successful");
          window.location.reload();
        })
        .catch((error) => {
          toast.error("Error Logging Out",error)
        });
    }
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <div className="container">
        <Navbar.Brand href="/">Sip&Share</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            <Link className='nav-link' to="/">Home</Link>
            {/* <Link className='nav-link' to="/about">About</Link> */}
            <Link className='nav-link' to="/recipes">Recipes</Link>
            <NavDropdown
              title={<i className="fa fa-user"></i>}
              id="basic-nav-dropdown"
            >
              {user ? (
                <>
                  
                  <NavDropdown.Item >{`Hello, Dear`}</NavDropdown.Item>
                  <Link className='dropdown-item' to="/" onClick={handleLogout}>Logout</Link>
                </>
              ) : (
                <Link className='dropdown-item' to="/login">Login/Register</Link>
              )}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default NavigationBar;
