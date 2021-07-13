import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import APIAccess from "../../controller.js";
import { useParams, useHistory } from "react-router-dom";
import { Col, Row, Form, Button, Container } from "react-bootstrap";
import PageLayout from "../pages/DefaultPage";

function UserProfileEdit() {
  let history = useHistory();
  const { uid } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [loadedUserData, setLoadedUserData] = useState([]);
  const username = document.cookie.split('user=')[1].split('%20')[0]

  useEffect(() => {
    async function fetchData() {
      let data = await APIAccess.getUserProfile(uid);
      return data;
    }
    fetchData().then((x) => {
      setLoadedUserData(x);
      setIsLoading(false);
    });
  }, [uid]);

  const update = async (e) => {
    e.preventDefault();
    try {
      let fName = document.getElementById("fname").value;
      let lName = document.getElementById("lname").value;
      let profile = document.getElementById("picture").value;
      let bio = document.getElementById("about").value;
      await APIAccess.updateUserProfile(uid, fName, lName, profile, bio);
      console.log("after api call");
    } catch (err) {
      console.log(err);
    }
    toast.success("User info updated", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
    history.push("/profile/" + uid);
  };

  if (isLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }

  if (username !== uid) {
    history.goBack();
  }

  return (
    <PageLayout>
         <div className="body-cus">
        <div className="form-section">
          <h1 className="h1-cus"> Edit User Profile</h1>
          <Container fluid className="form-section-inner">
            <Row>
              <Col>
                <Form className="form-cus">
                  <Form.Group controlId="firstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="register"
                      name="firstName"
                      id="fname"
                      defaultValue={loadedUserData.firstName}
                    />
                  </Form.Group>
                  <Form.Group controlId="lastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="register"
                      name="lastName"
                      id="lname"
                      defaultValue={loadedUserData.lastName}
                    />
                  </Form.Group>
                  <Form.Group controlId="picture">
                    <Form.Label>Profile Picture</Form.Label>
                    <Form.Control
                      type="register"
                      name="picture"
                      id="picture"
                      defaultValue={loadedUserData.picture}
                    />
                  </Form.Group>
                  <Form.Group controlId="about">
                    <Form.Label>About</Form.Label>
                    <Form.Control type="register"
                    name="about"
                    id="about"
                    defaultValue={loadedUserData.bio} as="textarea" rows={3} />
                  </Form.Group>
                  <Button onClick={update} variant="primary" type="submit" className="submit-button">
                    Update
                  </Button>
                </Form>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </PageLayout>
  );
}

export default UserProfileEdit;
