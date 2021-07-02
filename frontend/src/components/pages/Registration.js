/*jshint esversion: 10*/
import React from "react";
import "./Registration.css";
import Logo from "../../assets/logo.png";
import APIAccess from "../../controller.js";
import { useHistory } from "react-router-dom";
import { AuthService } from "../../util/authService";

function Registration() {
  let history = useHistory();
  let auth = AuthService();
  console.log(auth);

  const register = async (e) => {
    e.preventDefault();
    try {
      let username = document.getElementById("username").value;
      let password = document.getElementById("password").value;
      let role = document.getElementById("role-dropdown").value;
      console.log(username, password, role);
      let user = await APIAccess.registerUser(username, password, role);
      console.log("Made it here");

      auth.set(user, () => {
        const username = document.cookie.split('user=')[1].split('%20')[0]
        console.log('user logged in', username)
        history.replace('/profile/' + username)
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div id="fullpage-wrapper">
    <div className="register">
      <form id="register-form">
        <fieldset>
          <header>
            <h1 className="register-title">Ampact</h1>
            <div className="wrapper">
              {" "}
              <img
                id="african-impact-logo"
                src={Logo}
                alt="african impact initiative logo"
              />
            </div>
          </header>
          <main>
            <h2 className="register-subtitle">Create Your Account</h2>
            <div className="wrapper-register">
              <label htmlFor="username">Username:</label>
              <input
                type="register"
                name="username"
                id="username"
                placeholder=""
              />
            </div>

            <div className="wrapper-register">
              <label htmlFor="password">Password:</label>
              <div>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder=""
                />
              </div>
            </div>
            <div className="wrapper-register">
              <label htmlFor="role">Role:</label>
              <select name="role" id="role-dropdown">
                <option value="entrepreneur">Entrepreneur</option>
                <option value="instructor">Instructor</option>
                <option value="partner">Partner</option>
                <option value="guest">Guest</option>
              </select>
              <div class="dropdown-role-content">
                <a></a>
              </div>
            </div>
            <div class="wrapper-register">
              <p id="error-message">Error please change your information*</p>
            </div>
            <button type="submit" onClick={register} className="submit-button">
              Register
            </button>
          </main>
        </fieldset>
      </form>
    </div>
    </div>
  );
}

export default Registration;
