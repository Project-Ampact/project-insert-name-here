import "./Dlbs.css";
/*jshint esversion: 10*/
import APIAccess from "../../controller.js";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import PageLayout from "../pages/DefaultPage";
import { Col, Row, Form, Button, Container } from "react-bootstrap";

function DlbsSubmit() {
  let backtoDlbs = "http://localhost:3000/Dlbs";  


  return (
    <PageLayout>
      <div className="body-cus">
        <div className="form-section">
          <h1 className="h1-cus"> Submission Detail</h1>
          <Container fluid className="form-section-inner">
            <Row>
              <Col>
                <Form className="form-cus">
                  <Form.Group controlId="dlbsname">
                    <Form.Label>Assignment Title: </Form.Label>
                    <Form.Control
                      type="title"
                      defaultValue="Sample Assignment #1" readOnly />
                    <Form.Text className="text-muted">
                      This is the name of your assignment you are currently submiting.
                    </Form.Text>
                    <Button href={backtoDlbs} variant="primary" type="submit">
                    change
                  </Button>
                  </Form.Group>

                  <Form.Group controlId="details">
                    <Form.Control type="details" as="textarea" 
                    defaultValue="This is the first sample assignment. You will respected to ...
                    etc..."
                    rows={2} plaintext readOnly />
                  </Form.Group>

                  <Form.Group className="deadline" controlId="dlbsddl">
                    <Form.Label>Assignment Deadline: </Form.Label>
                    <Form.Control
                      type="deadline"
                      defaultValue="07/11/2021" readOnly />
                  </Form.Group>
                  <Form.Group controlId="inputfile">
                    <Form.Label>Select the file to upload:</Form.Label>
                    <Form.File id="inputfile" label="Please upload your own work." />
                  </Form.Group>
                  <Form.Group controlId="about">
                    <Form.Label>Submission Note:</Form.Label>
                    <Form.Control type="about" as="textarea" rows={3} />
                  </Form.Group>

                </Form>
                <div className="register del-button">
                  <Button
                    type="submit"
                    //onClick={}
                    className="submitbutton"
                    variant="primary"
                    href={backtoDlbs}
                    >
                    Submit
                  </Button>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </PageLayout>
  );
}

export default DlbsSubmit;
