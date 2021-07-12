import "./CommentSection.css";
import React, { useState, useEffect, useContext } from "react";
import Comment from "./Comment";
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
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

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

function LoadComments() {
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
      <Comment 
        className="loaded-comment"
        user={mock_data_piece.user}
        type={mock_data_piece.type}
        date={date.getFullYear() + "/" + month + "/" + day}
        content={mock_data_piece.content}
      />
    );
  });
}

function CommentSection(props) {
  /*const [isLoading, setIsLoading] = useState(true);
  const [loadedUserData, setLoadedUserData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8000/post/")
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
  }*/
  return (
    <Accordion>
      <Card>
        <Card.Header>
          <Expand eventKey="0">Comments</Expand>
        </Card.Header>
        <Accordion.Collapse eventKey="0">
          <Container className="loaded-comments">
              {LoadComments()}
          </Container>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
}

export default CommentSection;
