import "./Dlbs.css";
/*jshint esversion: 10*/
import APIAccess from "../../controller.js";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import PageLayout from "../pages/DefaultPage";
import { Col, Row, Form, Button, Container } from "react-bootstrap";

function DlbsSubmit() {
  let { gid } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [loadedGroupData, setLoadedGroupData] = useState([]);
  
  useEffect(() => {
    //setIsLoading(true);
    fetch("http://localhost:8000/group/" + gid)
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
      let about = document.getElementById("about").value;

      //console.log("Made it here");
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


  let createGroups = "http://localhost:3000/groupProfile/create";
  let goToGroupProfile = "http://localhost:3000/groupProfile/" + gid;

  return (
    <PageLayout>
      <div className="body-cus">
        <div className="form-section">
          <h1 className="h1-cus"> Submission Detail</h1>
          <Container fluid className="form-section-inner">
            <Row>
              <Col>
                <Form className="form-cus">
                  <Form.Group controlId="dlbsname">
                    <Form.Label>Assignment Title: </Form.Label>
                    <Form.Control
                      type="title"
                      defaultValue="Sample Assignment #1" readOnly />
                    <Form.Text className="text-muted">
                      This is the name of your assignment you are currently submiting.
                    </Form.Text>
                    <Button onClick={update} href={goToGroupProfile} variant="primary" type="submit">
                    change
                  </Button>
                  </Form.Group>
                  <Form.Group controlId="dlbsddl">
                    <Form.Label>Assignment Deadline: </Form.Label>
                    <Form.Control
                      type="deadline"
                      defaultValue="07/11/2021" readOnly />
                  </Form.Group>
                  <Form.Group controlId="inputfile">
                    <Form.Label>Select the file to upload:</Form.Label>
                    <Form.File id="inputfile" label="Please upload your own work." />
                  </Form.Group>
                  <Form.Group controlId="about">
                    <Form.Label>Submission Description</Form.Label>
                    <Form.Control type="about" as="textarea" rows={3} />
                  </Form.Group>

                </Form>
                <div className="register del-button">
                  <Button
                    type="submit"
                    onClick={update}
                    className="submitbutton"
                    variant="primary"
                    href={goToGroupProfile}
                    >
                    Submit
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

export default DlbsSubmit;
