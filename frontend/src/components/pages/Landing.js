import React from 'react';
import  { Link } from "react-router-dom";
import logo from '../../assets/logo.png'
import { Nav, Navbar } from 'react-bootstrap'
import './Landing.css'

function LandingContent() {
    return (
      <div className="content">
        <h1>Helping Africa’s brightest minds go from idea to MVP to market </h1>
        <br/>
        <h3>An e-learning social platform tailored for instructors, partners, and young entrepreneurs.</h3>
        <ul>
          <li>Individual profile creates and company profile creations for entrepreneurs.</li>
          <li>E-learning through prerecorded content that can be consumed in a self pace manner.</li>
          <li>Community features to interact with partners and other entrepreneurs.</li>
          <li>Deliverable completion/submission and event scheduling on a calendar.</li>
        </ul>
      </div>
    )
  }

function Landing() {
return (
    <div>
      <Navbar className="navbar">
        <Navbar.Brand href="https://www.africanimpact.ca/the-african-impact-challenge" className="mr-auto">
          <img 
              alt="alt text"
              src={logo}
              width="100"
              height="80"
              />{' '}
              Ampact
          </Navbar.Brand>
          <Nav className="d-flex align-items-end">
          <Link to="/login" className="route-link">Login</Link>
          <Link to="/register" className="route-link">Register</Link>
          </Nav>
        </Navbar>
      <LandingContent/>
    </div>
    )
}

export default Landing;