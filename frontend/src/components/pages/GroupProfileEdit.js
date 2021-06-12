import React from "react";
import { Button } from "react-bootstrap";
import "./GroupProfileEdit.css";
/*jshint esversion: 10*/
import APIAccess from "../../controller.js";
import { useParams } from "react-router-dom";
import NavigationBar from "../NavigationBar";

function GroupProfileEdit() {
  let { gid } = useParams();
  const update = async (e) => {
    try {
      let groupName = document.getElementById("groupName").value;
      let about = document.getElementById("about").value;
      let picture = document.getElementById("picture").value;
      //console.log(group, groupName, about, picture);
      await APIAccess.updateGroupProfile(
        gid,
        groupName,
        about,
        picture
      );
      console.log("Made it here");
    } catch (err) {
      console.log(err);
    }
  };

  const deleteGroup = async (e) => {
    e.preventDefault();
    try {
      await APIAccess.deleteGroup(gid);
      console.log("Made it here");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <NavigationBar/>
      <div className="register">
        <form id="register-form">
          <fieldset>
            <header>
              <h1 className="register-title">Ampact</h1>
            </header>
            <main>
              <h2 className="register-subtitle">Edit Group Information</h2>
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
                  <input
                    type="register"
                    name="about"
                    id="about"
                    placeholder=""
                  />
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
              <button type="submit" onClick={update} className="submit-button">
                Update
              </button>
              <div className="register del-button">
                <Button
                  type="submit"
                  onClick={deleteGroup}
                  className="gbutton"
                  variant="primary"
                >
                  Delete Group
                </Button>
              </div>
            </main>
          </fieldset>
        </form>
      </div>
    </div>
  );
}

export default GroupProfileEdit;
