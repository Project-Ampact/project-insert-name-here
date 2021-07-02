import React, { useState }  from 'react';
import  { Link } from "react-router-dom";
import logo from '../../assets/logo.png'
import browse from '../../assets/browse.png'
import group from '../../assets/group.jpg'
import home from '../../assets/home.jpg'
import { Nav, Navbar, Carousel} from 'react-bootstrap'
import './Landing.css'


function ControlledCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect} id="landing-page">
      <Carousel.Item interval={8000}>
      <img
          className="d-block w-100 landing-blur"
          src={home}
          alt="Second slide"
        />
         <Carousel.Caption id="slide-1"> 
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
      </div></Carousel.Caption>

      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 landing-blur"
          src={browse}
          alt="Second slide"
        />

        <Carousel.Caption>
          <div className="caption">
          <h3>Browse Videos</h3>
          <p>Explore our large catalogue of educational videos ensured to help you become the best entrepreneur</p>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img 
          className="d-block w-100 landing-blur"
          src={group}
          alt="Third slide"
        />

        <Carousel.Caption>
        <div className="caption">
          <h3>Create Groups</h3>
          <p>
            Create groups and work together easily to create meaningful projects
          </p>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

function LandingContent() {

    return (
      <div id="carousel-wrapper">
          <ControlledCarousel />
      </div>
    )
  }

function Landing() {
return (
    <div id="all-wrapper">
      <Navbar className="navbar">
        <Navbar.Brand href="https://www.africanimpact.ca/the-african-impact-challenge" className="mr-auto route-link">
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