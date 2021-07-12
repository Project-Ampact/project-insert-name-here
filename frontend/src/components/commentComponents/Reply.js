import "./Comment.css";
import React, { useState, useEffect, useContext } from "react";
import { Row, Container, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function Reply(props) {
  return (
    <Container>
      <Row className="cus2-row">
        <Card className="comment-wrapper rounded">
          <Card.Body className="comment-body">
            <div className="title-and-date">
              <h3 className="card-title2">{props.user}</h3>
              <h6 className="text-date comment-date">{props.date}</h6>
            </div>
            <p className="text-content">{props.content}</p>
          </Card.Body>
        </Card>
      </Row>
    </Container>
  );
}

export default Reply;
