/*jshint esversion: 10*/
import React from 'react';
import './Registration.css';
import Logo from '../../assets/logo.png';
import APIAccess from '../../controller.js';

function Registration() {
  const register = (e) => {
    e.preventDefault();
    try{
      let username = document.getElementById("username").value;
      let password = document.getElementById("password").value;
      let role = document.getElementById("role").value;
      APIAccess.registerUser(username, password, role);
    } catch(err) {
      console.log(err);
    }
  };

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
            <button type="submit" onClick={register} class="submit-button">Register</button>
          </main>
        </fieldset>
      </form>
    </div>
  )
}

export default Registration;