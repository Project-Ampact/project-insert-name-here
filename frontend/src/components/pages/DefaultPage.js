import React from "react";
import NavBar from "../NavBar.js";

import "react-pro-sidebar/dist/css/styles.css";
import { Row, Col, Container } from "react-bootstrap";

export default function PageLayout({ children }) {
  return (
    <Container fluid className="body-cus">
      <Row>
        <Col xs={1} className="sidebar-wrapper">
          <NavBar />
        </Col>
        <Col xs={11} className="page-content-wrapper">
          {children}
        </Col>
      </Row>
    </Container>
  );
}
