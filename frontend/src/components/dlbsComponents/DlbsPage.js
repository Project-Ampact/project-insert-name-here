import "./Dlbs.css";
/*jshint esversion: 10*/
import APIAccess from "../../controller.js";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import PageLayout from "../pages/DefaultPage";
import { Col, Row, Card, Form, Button, Container } from "react-bootstrap";
import { propTypes } from "react-bootstrap/esm/Image";


function DlbsPage(props) {
  let { dlbsid } = useParams();

  let backtoDlbs = "../deliverableFeed";  

  let mock_data = [
    {
      description: "mock data of the assignment. requirements: 12345..",
      fileTypes: [],
      dueDate: "2021-07-30T21:01:41.834Z",
      date: "2021-07-22T21:01:41.834Z",
      _id: "60fdbca2d718ac465cf2b56a",
      title: "CS Assignment1",
      instructor: "christophersuh",
      __v: 0,
    },
  ];


  return (
    <PageLayout>
      <h1 className="h1-cus"> Assignment Detail</h1>
      <div className="body-cus"> 
      <Container className="profile container-fluid">
            <Card className="mid-width"><Card.Body>
              <Card.Title> <h2>Sample A#1 {mock_data.title}</h2> </Card.Title>
              <Card.Subtitle><h4>Instructor: {mock_data.instructor}</h4></Card.Subtitle>
              <Card.Text>
              
              <Row>
                <Col>
                  
                </Col>
              </Row>
              <Row>
                <Col>
                <p id="description">
                {props.description}
                </p>

              <h6 className="dead-line" controlId="dlbsddl">
                Assignment Deadline: {mock_data.dueDate}</h6>
                </Col>
              </Row>
              </Card.Text>
              </Card.Body></Card>

              <Card className="mid-width"><Card.Body>
              <Card.Title>Submit your work:</Card.Title>
              <Form.Group controlId="inputfile">
                    <Form.Label>Select the file to upload:</Form.Label>
                    <Form.File id="inputfile" label="Only pdf files are accepted." />
                  </Form.Group>
                  <Form.Group controlId="about">
                    <Form.Label>Submission Note:</Form.Label>
                    <Form.Control type="about" as="textarea" rows={3} />
                  </Form.Group>

              <Row className="container-fluid"><Col>
              <div className="register del-button"> 
                  <Col sm={3}><Button type="submit" variant="secondary" href={backtoDlbs}>
                  Cancel</Button></Col>
                  <Col sm={3}><Button type="submit" variant="primary"  href={backtoDlbs}>
                  Submit </Button></Col> 
                </div>
              </Col>
            </Row>
        </Card.Body></Card>
        </Container>
      </div>
    </PageLayout>
  );
}

export default DlbsPage;
