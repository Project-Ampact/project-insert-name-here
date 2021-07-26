import "./Dlbs.css";
/*jshint esversion: 10*/
import APIAccess from "../../controller.js";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import PageLayout from "../pages/DefaultPage";
import { Col, Row, Form, Button, Container } from "react-bootstrap";
import { propTypes } from "react-bootstrap/esm/Image";


function DlbsPage(props) {
  let { dlbsid } = useParams();

  let backtoDlbs = "../deliverableFeed";  
  let submitDlbs = "../Dlbs/"+ props.id +"/submit";  


  return (
    <PageLayout>
      <h1 className="h1-cus"> Assignment Detail</h1>
      <div className="body-cus">
        <div className="form-section">   
          <Container fluid className="form-section-inner">
            <Row>
              <Col>
                <h2 className="h2-cus"> {props.title} </h2>
                <h4 className="h4-cus">Instructor: {props.instructor}</h4>
                </Col></Row>
                <Row><Col>
                <p id="details">
                {props.description}
                </p>

              <h4 className="deadline" controlId="dlbsddl">
                Assignment Deadline: {props.dueDate}</h4>

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
