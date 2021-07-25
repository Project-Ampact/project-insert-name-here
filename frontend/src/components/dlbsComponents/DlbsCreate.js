import "./Dlbs.css";
/*jshint esversion: 10*/
import APIAccess from "../../controller.js";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import PageLayout from "../pages/DefaultPage";
import { Col, Row, Form, Button, Container } from "react-bootstrap";

function DlbsCreate() {
  let backtoDlbs = "http://localhost:3000/Dlbs";  


  return (
    <PageLayout>
      <div className="body-cus">
        <div className="form-section">
          <h1 className="h1-cus"> New Assignment</h1>
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


                  <Form.Group className="deadline" controlId="dlbsddl">
                    <Form.Label>Assignment Deadline: </Form.Label>
                    <Form.Control type="datetime-local" id="deadline" />
                    

                  </Form.Group>
                  <Form.Group controlId="inputfile">
                    <Form.Label>Select the file to upload:</Form.Label>
                    <Form.File id="inputfile" label="(optional)" />
                  </Form.Group>

                  <Form.Group controlId="details">
                  <Form.Label>Assignment Description:</Form.Label>
                    <Form.Control type="details" as="textarea" 
                    placeholder="Enter the submission requirements for the assignment..."
                    rows={2} />
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

export default DlbsCreate;
