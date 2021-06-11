import "./GroupProfileEdit.css";
/*jshint esversion: 10*/
import APIAccess from "../../controller.js";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import "../groupProfile/Group.css";
import GroupsList from "../groups/GroupsList.js"


let mock_data = [
  {
    members: [
      {
        _id: "651651",
        role: "partner",
      },
      {
        _id: "651651",
        role: "partner",
      },
      {
        _id: "651651",
        role: "partner",
      },
    ],
    about: "We are now team omega",
    picture: "https://picsum.photos https://picsum.photos/200/100",
    _id: "60c13863b069455054d4b224",
    name: "TeamOmega",
    __v: 4,
  },
  {
    members: [
      {
        _id: "651651",
        role: "partner",
      },
      {
        _id: "aa",
        role: "partner",
      },
    ],
    about: "About me",
    picture: "Default",
    _id: "60c14851b1c530483cc32685",
    name: "AlphaTeam2",
    __v: 2,
  },
  {
    members: [],
    about: "We are the alpha team3",
    picture: "Default",
    _id: "60c148ae4df89114682f519e",
    name: "AlphaTeam3",
    __v: 0,
  },
  {
    members: [],
    about: "We are the BetaTeam",
    picture: "www.testpics.com/pic1",
    _id: "60c148db4df89114682f519f",
    name: "BetaTeam",
    __v: 0,
  },
  {
    members: [],
    about: "We are the alpha team5",
    picture: "www.web-dev.com/test-picture5",
    _id: "60c1495a75a7d45288be4a58",
    name: "AlphaTeam5",
    __v: 0,
  },
  {
    members: [],
    about: "We are the test team1",
    picture: "www.web-dev.com/test-picture6",
    _id: "60c1506f8dc1b73da49490b8",
    name: "Test team1",
    __v: 0,
  },
  {
    members: [],
    about: "We are the BetaTeam2",
    picture: "www.testpics.com/pic2",
    _id: "60c15a2816225047d8fa53f9",
    name: "BetaTeam2",
    __v: 0,
  },
  {
    members: [],
    about: "We are TeamB",
    picture: "Default",
    _id: "60c16158088f47413c700c0c",
    name: "TeamB",
    __v: 0,
  },
  {
    members: [],
    about: "About me",
    picture: "Default",
    _id: "60c217454371020fbf7b56d9",
    name: "testGroup",
    __v: 1,
  },
  {
    members: [],
    about:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    picture: "https://picsum.photos/200/100",
    _id: "60c2cd77fe2ec82cb0c5b544",
    name: "LoremIpsom Team",
    __v: 0,
  },
  {
    members: [],
    about: "We are the sdfdsdskj team",
    picture: "https://picsum.photos/200/100",
    _id: "60c3531ce8e94218ac35d483",
    name: "Tester Team 1",
    __v: 0,
  },
];

function GroupProfileCreate() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedGroupData, setLoadedGroupData] = useState([]);

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
        
        setLoadedGroupData(data);
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
      let user = await APIAccess.createGroupProfile(groupName, about, picture);
      console.log("Made it here");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container className="mt-3 profile container-fluid">
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
              <button type="submit" onClick={update} className="submit-button">
                Create
              </button>
            </main>
          </fieldset>
        </form>
      </div>
      <GroupsList groups={mock_data} />
    </Container>
  );
}

export default GroupProfileCreate;
