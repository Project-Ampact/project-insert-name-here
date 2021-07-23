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
    date: "1625694170354",
    replies: [
      { $oid: "60ecc10bc22df22bf4376e49" },
      { $oid: "60ecc113c22df22bf4376e4b" },
      { $oid: "60ecc116c22df22bf4376e4d" },
      { $oid: "60ecc118c22df22bf4376e4f" },
    ],
    message: "Comment 2",
    poster: "Chris",
    __v: { $numberInt: "0" },
  },
  {
    _id: "60e6207ccfcf1323cc3bd6ac",
    date: "1625694170354",
    replies: [
      { $oid: "60ecc14bc22df22bf4376e51" },
      { $oid: "60ecc14dc22df22bf4376e53" },
      { $oid: "60ecc14fc22df22bf4376e55" },
      { $oid: "60ecc151c22df22bf4376e57" },
    ],
    message: "Comment 3",
    poster: "Chris",
    __v: { $numberInt: "0" },
  },
  {
    _id: "60ecc191c22df22bf4376e5c",
    date: "1626127173704",
    replies: [
      { $oid: "60ecc1adc22df22bf4376e5d" },
      { $oid: "60ecc1afc22df22bf4376e5f" },
      { $oid: "60ecc1b1c22df22bf4376e61" },
      { $oid: "60ecc1b3c22df22bf4376e63" },
    ],
    message: "A new comment of a very moderate length for testing purposes3.",
    poster: "Chris",
    __v: { $numberInt: "0" },
  },
  {
    _id: "60ecc18fc22df22bf4376e5b",
    date: "1626127173704",
    replies: [],
    message: "A new comment of a very moderate length for testing purposes2.",
    poster: "Chris",
    __v: { $numberInt: "0" },
  },
  {
    _id: "60ecc18dc22df22bf4376e5a",
    date: "1626127173704",
    replies: [],
    message: "A new comment of a very moderate length for testing purposes1.",
    poster: "Chris",
    __v: { $numberInt: "0" },
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

function LoadComments(deleteFunc, pid) {
  return mock_data.map((mock_data_piece) => {
    let date = new Date(mock_data_piece.date);
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
        user={mock_data_piece.poster}
        type={mock_data_piece.type}
        date={date.getFullYear() + "/" + month + "/" + day}
        content={mock_data_piece.message}
        cid={mock_data_piece._id}
        pid={pid}
        delete={deleteFunc}
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

  const deletePostButton = (props.user === username || role === "instructor") ?
    (<Button variant="danger" onClick={() => {props.delete(props.pid)}}>Delete Post</Button>) : null;

  useEffect(() => {
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
  }, [props.pid]);

  const deleteLocalComment = (id) => {
    mock_data = mock_data.filter(comment => id !== comment._id)
    setLoadedCommentData(mock_data)
  }

  if (isLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }
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
            {LoadComments(deleteLocalComment, props.pid)}
          </Container>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
}

export default SubmissionSection;
