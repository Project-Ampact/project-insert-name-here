import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Card, Button, Container } from "react-bootstrap";
import "./Group.css";

/*function GroupProfileContent() {
    return (
     
    )
  }*/

function Group(props) {
  return (
    <Container className="mt-3 profile container-fluid">
      <Row className="row2 container-fluid">
        <Col>
          <Card className="mb-3 groupProfile" style={{ color: "#000" }}>
            <Card.Img className="group-img" src={props.image} />
            <Card.Body>
              <Card.Title className="group-title">{props.name}</Card.Title>
              <Button className="gbutton" variant="primary">Add member</Button>
              <Button className="gbutton" variant="primary">Remove Member</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="container-fluid">
        <Col>
          <Card className="mb-3 groupProfile" style={{ color: "#000" }}>
            <Card.Body>
              <Card.Title className="group-about">About</Card.Title>
              <Card.Text >{props.about}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Group;
