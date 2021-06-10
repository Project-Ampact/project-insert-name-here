import React from 'react'
import './App.css';
import logo from './assets/logo.png'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button'
import { Nav, Navbar } from 'react-bootstrap';

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

function App() {
  return (
    <div className="App">
      <Navbar className="navbar-orange">
        <Navbar.Brand href="#home" className="mr-auto">
          <img 
            alt="alt text"
            src={logo}
            width="100"
            height="80"
            />{' '}
            Ampact
        </Navbar.Brand>
        <Nav className="d-flex align-items-end">
          <Nav.Link>Login</Nav.Link>
          <Nav.Link>Register</Nav.Link>
        </Nav>
      </Navbar>
      <LandingContent/>
    </div>
  );
}

export default App;
