import "./Dlbs.css";
/*jshint esversion: 10*/
import APIAccess from "../../controller.js";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import PageLayout from "../pages/DefaultPage";
import { Col, Row, Card, Form, Button, Container } from "react-bootstrap";
import { propTypes } from "react-bootstrap/esm/Image";


function Dlbs(props) {
  let { dlbsid } = useParams();
  let backtoDlbs = "../deliverableFeed";  
/*
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [DlbsData, setDlbsData] = useState({});
  const [page, setPage] = useState(1);

  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:8000/assignment/", {
      credentials: 'include'
    })
      .then((response) => {
        //console.log(response.json())
        return response.json();
      })
      .then((data) => {
        // console.log(data)
        mock_data = data;
        setDlbsData(data);
        setIsLoading(false);
      });
  }, []);


  if (isLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }

  const newSubmission = async (e) => {
    e.preventDefault();
    try {
      let title = document.getElementById("title").value;
      let dueDate = document.getElementById("duedate").value;
      let description = document.getElementById("description").value;
      let totalMarks = document.getElementById("totalmark").value;
      window.location.reload();
      let result = await APIAccess.createNewDlbs(title, dueDate, totalMarks, description);
      console.log("Made it here");
    } catch (err) {
      console.log(err);
    }
  };
*/
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
            <Col>Total Marks: {props.totalMarks}</Col>
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
              <Form.Group controlId="note">
                <Form.Label>Submission Note:</Form.Label>
                <Form.Control type="note" id="note" as="textarea" rows={3} />
              </Form.Group>

          <Row className="container-fluid"><Col>
          <div className="register del-button"> 
              <Col sm={3}><Button type="reset" variant="secondary" href={backtoDlbs}>
              Cancel</Button></Col>
              <Col sm={3}><Button  type="submit" variant="primary"  href={backtoDlbs}>
              Upload </Button></Col> 
            </div>
          </Col>
        </Row>
        </Card.Body></Card>
        
      </div>
    </Container>
  );
}
//onClick={newSubmission}
export default Dlbs;
