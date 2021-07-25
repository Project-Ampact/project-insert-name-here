import "./Dlbs.css";
/*jshint esversion: 10*/
import APIAccess from "../../controller.js";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import PageLayout from "../pages/DefaultPage";
import { Col, Row, Form, Button, Container } from "react-bootstrap";

function DlbsPage() {
  let backtoDlbs = "http://localhost:3000/Dlbs";  
  let submitDlbs = "http://localhost:3000/Dlbs/submit";  


  return (
    <PageLayout>
      <h1 className="h1-cus"> Assignment Detail</h1>
      <div className="body-cus">
        <div className="form-section">   
          <Container fluid className="form-section-inner">
            <Row>
              <Col>
                <h2 className="h2-cus">Sample Assignment #1</h2>
                <h4 className="h4-cus">Instructor: abc</h4>
                </Col></Row>
                <Row><Col>
                <p id="details">
                This is the first sample assignment. You will respected to ... 
                etc...
                </p>

              <h4 className="deadline" controlId="dlbsddl">
                Assignment Deadline: 07/11/2021</h4>

              </Col></Row>
              <Row><Col>
              <div className="register del-button">
                <Button
                  type="submit"
                  className="submitbutton"
                  variant="primary"
                  href={submitDlbs}
                  >
                  Upload work to this Assignment
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

export default DlbsPage;
