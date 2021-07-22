import "./GroupProfileEdit.css";
/*jshint esversion: 10*/
import APIAccess from "../../controller.js";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import PageLayout from "./DefaultPage";
import { Col, Row, Form, Button, Container } from "react-bootstrap";

function GroupProfileEdit() {
  let { gid } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [loadedGroupData, setLoadedGroupData] = useState([]);
  
  useEffect(() => {
    //setIsLoading(true);
    fetch("http://localhost:8000/group/" + gid, {
      credentials: 'include'
    })
      .then((response) => {
        // console.log( response.json())
        return response.json();
        //  setLoadedGroupData(response.json());
        //  setIsLoading(false)
      })
      .then((data) => {
        setLoadedGroupData(data);
        setIsLoading(false);
      });
  }, [gid]);

  const update = async (e) => {
    try {
      let groupName = document.getElementById("groupName").value;
      let about = document.getElementById("about").value;
      let picture = document.getElementById("picture").value;
      //console.log(group, groupName, about, picture);
      await APIAccess.updateGroupProfile(gid, groupName, about, picture);
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

  /*
     <div>
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
                <button
                  type="submit"
                  onClick={update}
                  className="submit-button"
                >
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
  */
  let createGroups = "http://localhost:3000/groupProfile/create";
  let goToGroupProfile = "http://localhost:3000/groupProfile/" + gid;

  return (
    <PageLayout>
      <div className="body-cus">
        <div className="form-section">
          <h1 className="h1-cus"> Edit Group Information</h1>
          <Container fluid className="form-section-inner">
            <Row>
              <Col>
                <Form className="form-cus">
                  <Form.Group controlId="groupName">
                    <Form.Label>Group Name</Form.Label>
                    <Form.Control
                      type="groupName"
                      defaultValue={loadedGroupData.name}
                    />
                    <Form.Text className="text-muted">
                      This is the name of your group or company.
                    </Form.Text>
                  </Form.Group>
                  <Form.Group controlId="picture">
                    <Form.Label>Group Picture</Form.Label>
                    <Form.Control
                      type="picture"
                      defaultValue={loadedGroupData.picture}
                    />
                  </Form.Group>
                  <Form.Group controlId="about">
                    <Form.Label>Group Description</Form.Label>
                    <Form.Control type="about" as="textarea" rows={3} defaultValue={loadedGroupData.about}/>
                  </Form.Group>
                  <Button onClick={update} href={goToGroupProfile} variant="primary" type="submit">
                    Update
                  </Button>
                </Form>
                <div className="register del-button">
                  <Button
                    type="submit"
                    onClick={deleteGroup}
                    className="gbutton"
                    variant="primary"
                    href={createGroups}
                    >
                    Delete Group
                  </Button>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </PageLayout>
  );
}

export default GroupProfileEdit;
