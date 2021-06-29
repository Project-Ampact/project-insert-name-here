import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import APIAccess from "../../controller.js";
import { useParams } from "react-router-dom";
import NavigationBar from "../NavigationBar";

function UserProfileEdit(props) {
  const {uid} = useParams()

  return (
    <div className="logged-in">
    <NavigationBar/>
    <div className="register">
      <form id="register-form">
        <fieldset>
          <header>
            <h1 className="register-title">{uid}</h1>
          </header>
          <main>
          <h2 className="register-subtitle">Edit Profile</h2>
          <div class="wrapper-register">
              <label for="firstName">First Name:</label>
                <input
                  type="register"
                  name="firstName"
                  id="fname"
                  placeholder=""
                  defaultValue={props.firstName}
                />
              <label for="lastName">Last Name:</label>
                <input
                  type="register"
                  name="lastName"
                  id="lname"
                  placeholder=""
                  defaultValue={props.lastName}
                />

              <label for="picture">Profile Picture:</label>
              <input
                type="register"
                name="picture"
                id="picture"
                placeholder=""
              />

              <label for="about">About:</label><br></br>
              <div>
                <textarea
                  type="register"
                  name="about"
                  id="about"
                  placeholder={props.bio}
                />
              </div>
            </div>
           
            <button type="submit" /*onClick={update}*/ className="submit-button">
              Update
            </button>
          </main>
        </fieldset>
      </form>
    </div>

  </div>

    
  );
}

export default UserProfileEdit;
