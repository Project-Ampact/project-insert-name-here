import React from 'react'
import './Login.css'
import Logo from '../../assets/logo.png'
import { Link, useHistory } from "react-router-dom"
import APIAccess from '../../controller.js';
import { AuthService } from '../../util/authService';

function Login() {
  let history = useHistory();
  let auth = AuthService();
  console.log(auth)

  const signIn = async (e) => {
    try{
      e.preventDefault();
      let username = document.getElementById("username").value;
      let password = document.getElementById("password").value;
      let user = await APIAccess.signInUser(username, password);

      auth.set(user, () => {
        const username = document.cookie
        .split('; ')
        .find(row => row.startsWith('username='))
        .split('=')[1]
        console.log('user logged in', username)
        history.replace('/profile/' + username)
      });
    } catch(err) {
      console.log("Error");
    }
  };

	return (
    <div id="fullpage-wrapper">
    <div className="login" id="log">
      <form className="login-form">
        <fieldset>
          <header>
            <h1 className="login-title">Ampact Login</h1>
            <div className="wrapper"> <img id= "african-impact-logo" src={Logo} alt="african impact initiative logo"/></div>
          </header>
          <main>
            <label htmlFor="username">Username</label>
            <input type="login" name="username" id="username" placeholder="Type Username"/>
            <label htmlFor="password">Password</label>
            <div>
              <input type="password" name="password" id="password" placeholder="Type Password"/>
            </div>
              <button type="submit" className="submit-button" onClick={signIn}>Login</button>
              <div className="wrapper-register"><p id="error-message">Error please change your information*</p></div>
          </main>
          <footer>
            <p id="account-creation-text">Don't Have an Account?</p>
            <div className="wrapper"><Link id="create-account" to="/register">Create Your Account</Link></div>
          </footer>
        </fieldset>
      </form>			
    </div>
    </div>
	)
}

export default Login;