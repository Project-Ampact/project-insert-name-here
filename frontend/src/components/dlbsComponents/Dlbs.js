import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Card, Button, Container } from "react-bootstrap";
import "./Dlbs.css";
import PageLayout from "../pages/DefaultPage";
import APIAccess from "../../controller.js";



function Dlbs(props) {


  let submitDlbs = "http://localhost:3000/Dlbs/submit/"; //+ props.id;

  return (
    <PageLayout>
       <h1 className="h1-cus"> Assignemnts Available</h1>
    <Container className="mt-3 profile container-fluid">
      <Row className="row2 container-fluid">
        <Col>
          <Card className="mb-3 groupProfile">
            <Card.Body>
              <Card.Title className="cus-title">
              Sample Assignment#1
              </Card.Title>
              <Card.Text>
              <div className="deadline"> Deadlines: 2021/07/11 </div> </Card.Text>
              <Button className="floatRight" href={submitDlbs} variant="primary" type="submit">
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
              <Button className="floatRight" href={submitDlbs} variant="primary" type="submit">
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
              <Button className="floatRight" href={submitDlbs} variant="primary" type="submit">
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
