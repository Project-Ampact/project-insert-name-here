import "./CommentSection.css";
import React, { useState, useEffect, useContext } from "react";
import APIAccess from "../../controller.js";
import { AuthService } from "../../util/authService";
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
import Reply from "./Reply";

let mock_data = [
  {
    user: "David Tan",
    type: "general",
    content: "Lorem ipsum content is here cool",
    date: "today lol",
  },
  {
    user: "Christopher Suh",
    type: "general",
    content: "Lorem ipsum content is here cool2",
    date: "today lol2",
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

function LoadReplies(cid) {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedUserData, setLoadedUserData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8000/comment/" + cid)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        mock_data = data;
        setIsLoading(false);
      });
  });

  if (isLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }

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
      <Reply
        className="loaded-comment"
        user={mock_data_piece.poster}
        type={mock_data_piece.type}
        date={date.getFullYear() + "/" + month + "/" + day}
        content={mock_data_piece.message}
      />
    );
  });
}

function ReplySection(props) {
  let auth = AuthService();
  const username = document.cookie.split("user=")[1].split("%20")[0];
  let formid = `rmessage:${props.cid}`;
  const update = async (e) => {
    e.preventDefault();
    try {
      await APIAccess.createReply(username, document.getElementById(formid).value, props.cid);
      //window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Accordion>
      <Card>
        <Card.Header>
          <Expand eventKey="0">Replies</Expand>
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
                          placeholder="Write your reply here!"
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
            {LoadReplies(props.cid)}
          </Container>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
}

export default ReplySection;
