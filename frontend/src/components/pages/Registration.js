import React from 'react';
import './Registration.css';
import Logo from '../../assets/logo.png';

function Registration() {
  return (
    <div className="register">
      <form  id="register-form">
        <fieldset>
          <header>
              <h1 className="register-title">Ampact</h1>
              <div class="wrapper"> <img id= "african-impact-logo" src={Logo} alt="african impact initiative logo"/></div>
          </header>
          <main>
            <h2 className="register-subtitle">Create Your Account</h2>
            <div class="wrapper-register">
                <label for="username">Username:</label>
                <input type="register" name="username" id="username" placeholder=""/>
            </div>

            <div class="wrapper-register">
                <label for="password">Password:</label>
                <div>
                    <input type="password" name="password" id="password" placeholder=""/>
                </div>
            </div>
            <div  class="wrapper-register">
                <label for="role">Role:</label>
                <div>
                    <input type="register" name="role" id="role" placeholder=""/>
                </div>
            </div>
            <button type="submit" class="submit-button">Register</button>
          </main>
        </fieldset>
      </form>
    </div>
  )
}

export default Registration;