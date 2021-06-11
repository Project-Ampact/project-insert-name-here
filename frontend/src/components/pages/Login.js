import React from 'react'
import './Login.css'
import Logo from '../../assets/logo.png'
import { Link } from "react-router-dom"
import APIAccess from '../../controller.js';

function Login() {
  const signIn = (e) => {
    try{
      e.preventDefault();
      let username = document.getElementById("username").value;
      let password = document.getElementById("password").value;
      APIAccess.signInUser(username, password);
    } catch(err) {
      console.log("Error");
    }
  };

	return (
    <div className="login">
      <form className="login-form">
        <fieldset>
          <header>
            <h1 className="login-title">Ampact Login</h1>
            <div class="wrapper"> <img id= "african-impact-logo" src={Logo} alt="african impact initiative logo"/></div>
          </header>
          <main>
            <label for="username">Username</label>
            <input type="login" name="username" id="username" placeholder="Type Username"/>
            <label for="password">Password</label>
            <div>
              <input type="password" name="password" id="password" placeholder="Type Password"/>
            </div>
              <button type="submit" class="submit-button" onClick={signIn}>Login</button>
          </main>
          <footer>
            <p id="account-creation-text">Don't Have an Account?</p>
            <div class="wrapper"><Link id="create-account" to="/register">Create Your Account</Link></div>
          </footer>
        </fieldset>
      </form>			
    </div>
	)
}

export default Login;