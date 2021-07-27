import "./Dlbs.css";
/*jshint esversion: 10*/
import APIAccess from "../../controller.js";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import PageLayout from "../pages/DefaultPage";
import { Col, Row, Card, Form, Button, Container } from "react-bootstrap";
import { propTypes } from "react-bootstrap/esm/Image";


function Dlbs(props) {
  let backtoDlbs = "../deliverableFeed";  

  return (
    <Container className="profile container-fluid">
      <h1 className="h1-cus"> Assignment Detail</h1>
      <div className="mid-width"> 
        <Card><Card.Body>
          <Card.Title> <h2>{props.title}</h2> </Card.Title>
          <Card.Subtitle><h4>Instructor: {props.instructor}</h4></Card.Subtitle>
          <Card.Text>
          <Row>
            <Col>
            <p id="description">
            {props.description}
            </p>

          <h6 className="dead-line" controlId="dlbsddl">
            Assignment Deadline: {props.dueDate}</h6>
            </Col>
            <Col>Total Marks: {props.total}</Col>
          </Row>
          </Card.Text>
          </Card.Body></Card></div>
      <div className="mid-width"> 
          <Card><Card.Body>
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
              Upload </Button></Col> 
            </div>
          </Col>
        </Row>
        </Card.Body></Card>
        
      </div>
    </Container>
  );
}

export default Dlbs;
