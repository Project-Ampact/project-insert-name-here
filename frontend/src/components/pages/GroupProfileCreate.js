import "./GroupProfileEdit.css";
/*jshint esversion: 10*/
import APIAccess from "../../controller.js";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import "../groupProfile/Group.css";
import GroupsList from "../groups/GroupsList.js"
import NavigationBar from "../NavigationBar";


let mock_data;

function CreateGroupForm(props) {
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
            <button type="submit" onClick={props.update} className="submit-button">
              Create
            </button>
          </main>
        </fieldset>
      </form>
    </div>
  )
}

function GroupProfileCreate() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:8000/group/")
      .then((response) => {
        //console.log(response.json())
        return response.json();
      })
      .then((data) => {
       // console.log(data)
        mock_data = data;
        
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }

  const update = async (e) => {
    e.preventDefault();
    try {
      let groupName = document.getElementById("groupName").value;
      let about = document.getElementById("about").value;
      let picture = document.getElementById("picture").value;
      console.log(groupName, about, picture);
      window.location.reload()
      await APIAccess.createGroupProfile(groupName, about, picture);
      console.log("Made it here");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="logged-in">
      <NavigationBar/>
      <Container className="profile container-fluid">
        <CreateGroupForm update={update}/>
        <div>
          <h1>Groups</h1>
          <GroupsList groups={mock_data} />
        </div>
      </Container>
    </div>
  );
}

export default GroupProfileCreate;
