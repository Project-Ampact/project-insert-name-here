import "./SubmissionSection.css";
import "../videoComponents/VideoTagSection.css";
import APIAccess from "../../controller.js";
import { AuthService } from "../../util/authService";
import React, { useState, useEffect, useContext } from "react";
import Submission from "./Submission";
import {
  Row,
  Container,
  Accordion,
  AccordionCollapse,
  AccordionContext,
  AccordionToggle,
  useAccordionToggle,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

let mock_data = [
  {
    _id: "60e62079cfcf1323cc3bd6ab",
    grade: 50,
    feedback: "Good job on your assignment",
    submissionTime: "2021-07-24T21:01:41.834Z",
    user: "raymondma",
    assignment: "60fba065c7805260444f1ae19",
  },
  {
    _id: "60e62079cfcf1323cc33bd6ab",
    grade: 12,
    feedback: "nice try",
    submissionTime: "2021-07-25T21:01:41.834Z",
    user: "lawrencecai",
    assignment: "60fba065c7805603444f1ae19",
  },
  {
    _id: "60e62079cfcf1323c2c3bd6ab",
    grade: 45,
    feedback: "great work",
    submissionTime: "2021-07-20T21:01:41.834Z",
    user: "laragomez",
    assignment: "60fba065c7805602444f1ae19",
  },
  {
    _id: "60e62079cfcf1323cc3bd36ab",
    grade: 34,
    feedback: "good attempt",
    submissionTime: "2021-07-22T21:01:41.834Z",
    user: "davidtan",
    assignment: "60fba065c7805604444f1ae19",
  },
];

function Expand({ children, eventKey, callback }) {
  const currentEventKey = useContext(AccordionContext);

  const decoratedOnClick = useAccordionToggle(
    eventKey,
    () => callback && callback(eventKey)
  );

  const isCurrentEventKey = currentEventKey === eventKey;

  return (
    <Button
      type="button"
      //  style={{ backgroundColor: isCurrentEventKey ? "blue" : "grey" }}
      onClick={decoratedOnClick}
    >
      {children}
    </Button>
  );
}

function LoadSubmissions(id) {
  return mock_data.map((mock_data_piece) => {
    let date = new Date(mock_data_piece.submissionTime);
    let month = date.getMonth() + 1;
    let day = date.getDate();
    if (month < 10) {
      month = "0" + month;
    }
    if (day < 10) {
      day = "0" + day;
    }

    console.log(date.getFullYear() + "/" + month + "/" + day);
    return (
      <Submission
        className="loaded-comment"
        user={mock_data_piece.user}
        grade={mock_data_piece.grade}
        date={date.getFullYear() + "/" + month + "/" + day}
        sid={mock_data_piece._id}
        aid={mock_data_piece.assignment}
        
      />
    );
  });
}

function SubmissionSection(props) {
  let auth = AuthService();
  const username = document.cookie.split("user=")[1].split("%20")[0];
  const role = document.cookie.split('user=')[1].split('%20')[1];
  let formid = `message:${props.pid}`;
  const [loadedCommentData, setLoadedCommentData] = useState(mock_data)

  const update = async (e) => {
    e.preventDefault();
    try {
      var msg = document.getElementById(formid).value;
      
      window.location.reload();
      await APIAccess.createComment(username, msg, props.pid);
      
    } catch (err) {
      console.log(err);
    }
  };

  const [isLoading, setIsLoading] = useState(true);


  /*useEffect(() => {
    fetch("http://localhost:8000/post/" + props.pid + "/comments/", 
    {
      credentials: 'include'
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        mock_data = data;
        setLoadedCommentData(mock_data)
        setIsLoading(false);
      });
  }, [props.pid]);*/

  

  /*if (isLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }*/
  return (
    <Accordion>
      <Card>
        <Card.Header className="d-flex justify-content-between">
          <Expand eventKey="0">Submissions</Expand>
        </Card.Header>
        <Accordion.Collapse eventKey="0">
          <Container className="loaded-comments">
            <Container>
              <Row className="cus2-row">
                <Card className="comment-wrapper rounded">
                  <Card.Body className="comment-body">
                    <Form className="title-and-date">
                      <Form.Group className="card-title2" controlId={formid}>
                        <Form.Control
                          as="textarea"
                          rows={1}
                          type={formid}
                          placeholder="Write your comment here!"
                          className="txt-area"
                        />
                      </Form.Group>
                      <Button
                        className="sub-btn"
                        onClick={update}
                        variant="primary"
                        type="submit"
                      >
                        Submit
                      </Button>
                    </Form>
                  </Card.Body>
                </Card>
              </Row>
            </Container>
            {LoadSubmissions(props.id)}
          </Container>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
}

export default SubmissionSection;
