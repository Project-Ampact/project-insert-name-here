import React from 'react';
import './NavigationBar.css'
import logo from '../assets/logo.png'

function NavigationBar() {
  return (
    <div className="vertical-nav">
      <ul>
        <div>
          <li>
              <img 
                  alt="alt text"
                  src={logo}
                  width="100"
                  height="80"
                  />
              Ampact
          </li>
        </div>
        <div className="nav-links">
          <li>Stuff 1</li>
          <li>Stuff 2</li>
          <li>Stuff 3</li>
          <li>Stuff 4</li>
        </div>
        <div className="sign-out">
          <li>Sign Out</li>
        </div>
      </ul>
    </div>
  )
}

export default NavigationBar;