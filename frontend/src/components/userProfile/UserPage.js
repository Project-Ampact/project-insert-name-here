import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Card, Button, Container } from "react-bootstrap";
import Image from 'react-bootstrap/Image'
import "./UserPage.css";

function CanEditProfile(props) {

  if (props.canEdit) {
    return (
      <Button className="userpbutton" variant="primary" href={`/profile/${props.username}/edit`}>Edit Profile</Button>
    )
  } else {
    return null
  }
}

function UserPage(props) {
  const banner = "https://images.pexels.com/photos/1631677/pexels-photo-1631677.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
  const username = document.cookie.split("user=")[1].split("%20")[0];

  let name
  if (props.lastName === "" && props.firstName === "") {
    name = props._id;
  } else {
    name = `${props.firstName} ${props.lastName}`
  }

  return (
    <Container className="profile container-fluid">
      <Row className="mt-5 row2 container-fluid">
        <Col>
          <Card className="mb-3 userProfile" style={{ color: "#000" }}>
            <Card.Img className="user-img" src={banner} />
            <Card.Body>
            <Container>
            <Row>
              <Image src={props.picture} className="user-icon" />

            <Col>
              <Card.Title className="user-title">{name}</Card.Title>
              <Card.Text>
                {props.role}
              </Card.Text>
              {username !== props._id && <Button href={`/message/${props._id}`}>Message</Button>}
              <CanEditProfile canEdit={props.canEdit} username={props._id}/>
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
              <Card.Text >{props.bio || "No bio set"}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default UserPage;
