import React from "react";
import {Nav} from "react-bootstrap";
import { withRouter } from "react-router";
import logo from '../assets/logo.png'
import { Link } from 'react-router-dom';
import { AuthService } from '../util/authService'
import  './NavigationBar.css'

const Nav2 = props => {
    let auth = AuthService();

    return (
        <>
    
            <Nav className="vertical-nav sidebar col-md-12 d-none d-md-block bg-light"
            activeKey="/home"
            onSelect={selectedKey => alert(`selected ${selectedKey}`)}
            >
                <div className="sidebar-sticky"></div>
            <Nav.Item>
                <Nav.Link href="/home">Active</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="link-1">Link</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="link-2">Link</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="disabled" disabled>
                Disabled
                </Nav.Link>
            </Nav.Item>
            </Nav>
          
        </>
        );
  };
  const NavBar = withRouter(Nav2);
  export default NavBar