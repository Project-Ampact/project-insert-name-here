import React from 'react';
import './NavigationBar.css'
import logo from '../assets/logo.png'
import { Link } from 'react-router-dom';
import { AuthService } from '../util/authService'

function NavigationBar() {
  let auth = AuthService();
  const username = document.cookie
    .split('; ')
    .find(row => row.startsWith('username='))
    .split('=')[1]
  // const username = auth.user
  // console.log(auth)

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
          <li className="nav-l"><Link to={"/profile/" + username}>My Profile</Link></li>
        </div>
        <div className="sign-out">
          <li className="nav-l"><Link to="/" onClick={auth.signout}>Sign Out</Link></li>
        </div>
      </ul>
    </div>
  )
}

export default NavigationBar;