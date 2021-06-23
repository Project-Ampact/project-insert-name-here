import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Card, Button, Container } from "react-bootstrap";
import Image from 'react-bootstrap/Image'
import "./UserPage.css";

function UserPage(props) {
  // if first name and last name are not available, use username
  return (
    <Container className="profile container-fluid">
      <Row className="mt-5 row2 container-fluid">
        <Col>
          <Card className="mb-3 userProfile" style={{ color: "#000" }}>
            <Card.Img className="user-img" src={props.image} />
            <Card.Body>
            <Container>
            <Row>
              <Image src={props.image} className="user-icon" />

            <Col>
              <Card.Title className="user-title">{props.name}</Card.Title>
              <Card.Text>
                Team: {props.teamname}
              </Card.Text>
              <Button className="userpbutton" variant="primary">Edit Profile</Button>
            </Col>
            </Row></Container>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="container-fluid">
        <Col>
          <Card className="mb-3 userProfile" style={{ color: "#000" }}>
            <Card.Body>
              <Card.Title className="user-about">About Me</Card.Title>
              <Card.Text >{props.about}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default UserPage;
