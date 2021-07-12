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
  {"_id":"60e62079cfcf1323cc3bd6ab","date":"1625694170354","replies":[{"$oid":"60ecc10bc22df22bf4376e49"},{"$oid":"60ecc113c22df22bf4376e4b"},{"$oid":"60ecc116c22df22bf4376e4d"},{"$oid":"60ecc118c22df22bf4376e4f"}],"message":"Comment 2","poster":"Chris","__v":{"$numberInt":"0"}},
  {"_id":"60e6207ccfcf1323cc3bd6ac","date":"1625694170354","replies":[{"$oid":"60ecc14bc22df22bf4376e51"},{"$oid":"60ecc14dc22df22bf4376e53"},{"$oid":"60ecc14fc22df22bf4376e55"},{"$oid":"60ecc151c22df22bf4376e57"}],"message":"Comment 3","poster":"Chris","__v":{"$numberInt":"0"}},
  {"_id":"60ecc191c22df22bf4376e5c","date":"1626127173704","replies":[{"$oid":"60ecc1adc22df22bf4376e5d"},{"$oid":"60ecc1afc22df22bf4376e5f"},{"$oid":"60ecc1b1c22df22bf4376e61"},{"$oid":"60ecc1b3c22df22bf4376e63"}],"message":"A new comment of a very moderate length for testing purposes3.","poster":"Chris","__v":{"$numberInt":"0"}},
  {"_id":"60ecc18fc22df22bf4376e5b","date":"1626127173704","replies":[],"message":"A new comment of a very moderate length for testing purposes2.","poster":"Chris","__v":{"$numberInt":"0"}},
  {"_id":"60ecc18dc22df22bf4376e5a","date":"1626127173704","replies":[],"message":"A new comment of a very moderate length for testing purposes1.","poster":"Chris","__v":{"$numberInt":"0"}},
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
        user={mock_data_piece.poster}
        type={mock_data_piece.type}
        date={date.getFullYear() + "/" + month + "/" + day}
        content={mock_data_piece.message}
        cid={mock_data_piece._id}
      />
    );
  });
}

function CommentSection(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedUserData, setLoadedUserData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8000/post/" + props.pid + "/comments/")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        mock_data = data.comments;
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
