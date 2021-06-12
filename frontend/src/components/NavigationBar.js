import React from 'react';
import './NavigationBar.css'
import logo from '../assets/logo.png'
import { Link } from 'react-router-dom';
import { AuthService } from '../util/authService'

function NavigationBar() {
  let auth = AuthService();

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
          <li className="nav-l"><Link to="/groupProfile/create">Groups</Link></li>
          <li className="nav-l"><Link to="/groupProfile/edit/60c148ae4df89114682f519e">Test</Link></li>
        </div>
        <div className="sign-out">
          <li className="nav-l"><Link to="/" onClick={auth.signout}>Sign Out</Link></li>
        </div>
      </ul>
    </div>
  )
}

export default NavigationBar;