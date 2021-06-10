import React from 'react'
import './Login.css'
import Logo from '../../assets/logo.png'

function Login() {
	return (
    <div className="login">
      <form>
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
              <button type="submit" class="submit-button">Login</button>
          </main>
          <footer>
            <p id="account-creation-text">Don't Have an Account?</p>
            <div class="wrapper"><a id="create-account" href="registration.html">Create Your Account</a></div>
          </footer>
        </fieldset>
      </form>			
    </div>
	)
}

export default Login;