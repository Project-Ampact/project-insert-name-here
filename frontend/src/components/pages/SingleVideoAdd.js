import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Form, Button, Container } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Dropdown from "react-bootstrap/Dropdown";
import "./Registration.css";
import PageLayout from "./DefaultPage";
import APIAccess from "../../controller.js";
import { useParams } from "react-router-dom";

/*
<div className="body-cus">
        <div className="form-section">
          <h1 className="h1-cus"> Create New Group</h1>
          <Container fluid className="form-section-inner">
            <Row>
              <Col>
                <Form className="form-cus">
                  <Form.Group controlId="groupName">
                    <Form.Label>Group Name</Form.Label>
                    <Form.Control
                      type="groupName"
                      placeholder="Enter group name"
                    />
                    <Form.Text className="text-muted">
                      This is the name of your group or company.
                    </Form.Text>
                  </Form.Group>
                  <Form.Group controlId="picture">
                    <Form.Label>Group Picture</Form.Label>
                    <Form.Control
                      type="picture"
                      placeholder="https://picsum.photos/200/100"
                    />
                  </Form.Group>
                  <Form.Group controlId="about">
                    <Form.Label>Group Description</Form.Label>
                    <Form.Control type="about" as="textarea" rows={3} />
                  </Form.Group>
                  <Button onClick={update} variant="primary" type="submit">
                    Submit
                  </Button>
                </Form>
              </Col>
            </Row>
          </Container>
        </div>
        <div className="form-section">
          <Container>
            <Row>
              <GroupsList groups={mock_data} />
            </Row>
          </Container>
        </div>
      </div>
*/

const update = async (e) => {

  try {
    let title = document.getElementById("title").value;
    let videoLink = document.getElementById("videoLink").value;
    let picture = document.getElementById("picture").value;
    let tag = document.getElementById("tag").value;
    let description = document.getElementById("description").value;
    let poster = document.cookie
      .split("; ")
      .find((row) => row.startsWith("username="))
      .split("=")[1];
    // console.log(groupName, about, picture);
    window.location.reload();
    await APIAccess.uploadNewVideo(
      title,
      videoLink,
      picture,
      tag,
      description,
      poster
    );
    console.log("Made it here");
  } catch (err) {
    console.log(err);
  }
};

function SingleVideoAdd(props) {
  return (
    <PageLayout>
      <div className="body-cus">
        <div className="form-section">
          <h1 className="h1-cus"> Upload New Video</h1>
          <Container fluid className="form-section-inner">
            <Row>
              <Col>
                <Form className="form-cus">
                  <Form.Group controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      type="title"
                      placeholder="Enter the title here"
                    />
                    <Form.Text className="text-muted">
                      This will be the display title.
                    </Form.Text>
                  </Form.Group>
                  <Form.Group controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="description" as="textarea" rows={3} />
                  </Form.Group>
                  <Form.Group controlId="picture">
                    <Form.Label>Video Thumbnail</Form.Label>
                    <Form.Control
                      type="picture"
                      placeholder="Enter Thumbnail link"
                    />
                  </Form.Group>
                  <Form.Group controlId="videoLink">
                    <Form.Label>Video Link</Form.Label>
                    <Form.Control
                      type="videoLink"
                      placeholder="Enter Youtube video link"
                    />
                    <Form.Text className="text-muted">
                      Should be a Youtube embed video link.
                    </Form.Text>
                  </Form.Group>
                  <Form.Group controlId="tag">
                    <Form.Label>Tag</Form.Label>
                    <Form.Control type="tag" placeholder="Enter video tag" />
                    <Form.Text className="text-muted">
                      Tags determine video section display.
                    </Form.Text>
                  </Form.Group>
                  <Button
                    onClick={update}
                    variant="primary"
                    type="submit"
                    href="http://localhost:3000/browse"
                  >
                    Upload
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

export default SingleVideoAdd;
