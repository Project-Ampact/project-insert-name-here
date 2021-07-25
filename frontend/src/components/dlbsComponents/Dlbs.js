import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Card, Button, Container } from "react-bootstrap";
import "./Dlbs.css";
import PageLayout from "../pages/DefaultPage";
import APIAccess from "../../controller.js";



function Dlbs(props) {

  let toDlbsPage = "http://localhost:3000/Dlbs/detail/"; //+ props.id;
  let DlbsCreate = "http://localhost:3000/Dlbs/create/"; 

  return (
    <PageLayout>
       <h1 className="h1-cus"> Assignemnts Available</h1>
    <Container className="mt-3 profile container-fluid">
      <Row><Col>
      <div className="register del-button">
      <Button
        type="submit"
        className="submitbutton"
        variant="primary"
        href={DlbsCreate}
        >
        Create New Assignment
      </Button>
    </div>
      </Col></Row>
      <Row className="row2 container-fluid">
        <Col>
          <Card className="mb-3 groupProfile">
            <Card.Body>
              <Card.Title className="cus-title">
              Sample Assignment#1
              </Card.Title>
              <Card.Text>
              <div className="deadline"> Deadlines: 2021/07/11 </div> </Card.Text>
              <Button className="floatRight" href={toDlbsPage} variant="primary" type="submit">
              Details
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="row2 container-fluid">
        <Col>
          <Card className="mb-3 groupProfile">
            <Card.Body>
              <Card.Title className="cus-title">
              Sample Assignment#2
              </Card.Title>
              <Card.Text>
              <div className="deadline"> Deadlines: 2021/07/18 </div> </Card.Text>
              <Button className="floatRight" href={toDlbsPage} variant="primary" type="submit">
              Details
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="row2 container-fluid">
        <Col>
          <Card className="mb-3 groupProfile">
            <Card.Body>
              <Card.Title className="cus-title">
              Sample Assignment#3
              </Card.Title>
              <Card.Text>
              <div className="deadline"> Deadlines: 2021/07/28 </div> </Card.Text>
              <Button className="floatRight" href={toDlbsPage} variant="primary" type="submit">
              Details
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    </PageLayout>
  );
}

export default Dlbs;