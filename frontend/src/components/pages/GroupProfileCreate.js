import React from "react";
import "./GroupProfileEdit.css";
/*jshint esversion: 10*/
import APIAccess from "../../controller.js";

function GroupProfileCreate() {
  const update = async (e) => {
    e.preventDefault();
    try {
      let groupName = document.getElementById("groupName").value;
      let about = document.getElementById("about").value;
      let picture = document.getElementById("picture").value;
      console.log(groupName, about, picture);
      let user = await APIAccess.createGroupProfile(groupName, about, picture);
      console.log("Made it here");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="register">
      <form id="register-form">
        <fieldset>
          <header>
            <h1 className="register-title">Ampact</h1>
          </header>
          <main>
            <h2 className="register-subtitle">Create Group</h2>
            <div class="wrapper-register">
              <label for="picture">GroupPicture:</label>
              <input
                type="register"
                name="picture"
                id="picture"
                placeholder=""
              />
            </div>

            <div class="wrapper-register">
              <label for="about">About:</label>
              <div>
                <input type="register" name="about" id="about" placeholder="" />
              </div>
            </div>
            <div class="wrapper-register">
              <label for="groupName">GroupName:</label>
              <div>
                <input
                  type="register"
                  name="groupName"
                  id="groupName"
                  placeholder=""
                />
              </div>
            </div>
            <button type="submit" onClick={update} className="submit-button">Create</button>
          </main>
        </fieldset>
      </form>
    </div>
  );
}

export default GroupProfileCreate;
