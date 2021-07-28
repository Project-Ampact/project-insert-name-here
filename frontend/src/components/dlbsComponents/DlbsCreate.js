import "./Dlbs.css";
/*jshint esversion: 10*/
import APIAccess from "../../controller.js";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import PageLayout from "../pages/DefaultPage";
import { Col, Row, Form, Button, Container } from "react-bootstrap";

let mock_data;

function DlbsCreate() {
  let backtoDlbs = "../../deliverableFeed";  

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

  const addDlbs = async (e) => {
    e.preventDefault();
    try {
      let title = document.getElementById("title").value;
      let dueDate = document.getElementById("deadline").value;
      let description = document.getElementById("details").value;
      let total = document.getElementById("total").value;
      window.location.reload();
      let result = await APIAccess.createNewDlbs(title, dueDate, total, description);
      console.log("Made it here");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <PageLayout>
      <div className="body-cus">
        <div className="form-section">
          <h1 className="h1-cus"> Create Assignment</h1>
          <Container fluid className="form-section-inner">
            <Row>
              <Col>
                <Form className="form-cus">
                  <Form.Group controlId="dlbsname">
                    <Form.Label>Assignment Title: </Form.Label>
                    <Form.Control
                      type="title"
                      defaultValue="" />
                    <Form.Text className="text-muted">
                      This is the name of the new assignment you are going to create.
                    </Form.Text>
                  </Form.Group>

                  <Form.Group controlId="totalmark">
                    <Form.Label>Total Mark: </Form.Label>
                    <Form.Control
                      type="total"
                      defaultValue="" />
                    <Form.Text className="text-muted">
                      This is the maximum possible mark that could be obtained.
                    </Form.Text>
                  </Form.Group>

                  <Form.Group className="duedate" controlId="dlbsddl">
                    <Form.Label>Assignment Deadline: </Form.Label>
                    <Form.Control type="datetime-local" id="deadline" />
                  </Form.Group>

                  <Form.Group controlId="details">
                  <Form.Label>Assignment Description:</Form.Label>
                    <Form.Control type="details" as="textarea" 
                    placeholder="Enter the submission requirements for the assignment..."
                    rows={2} />
                  </Form.Group>

                </Form>
                <div className="register del-button"> 
                  <Col sm={3}><Button type="reset" variant="secondary" href={backtoDlbs}>
                  Cancel</Button></Col>
                  <Col sm={3}><Button onClick={addDlbs} type="submit" variant="primary"  href={backtoDlbs}>
                  Submit </Button></Col> 
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </PageLayout>
  );
}

export default DlbsCreate;
