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
  InputGroup,
  FormControl,
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



function SubmissionSection(props) {
  let auth = AuthService();
  const username = document.cookie.split("user=")[1].split("%20")[0];
  const role = document.cookie.split("user=")[1].split("%20")[1];
  let formid = `message:${props.pid}`;
  const [loadedSubmissionData, setLoadedSubmissionData] = useState(mock_data);
  const [query, setQuery] = useState("");

  function LoadSubmissions(total2) {
    return loadedSubmissionData.map((mock_data_piece) => {
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
          date={date.toLocaleDateString() + ' ' + date.toLocaleTimeString()}
          id={mock_data_piece._id}
          aid={mock_data_piece.assignment}
          total={total2}
          link={"http://localhost:3000/user/submission/" + mock_data_piece._id}
        />
      );
    });
  }

  
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(
      "http://localhost:8000/assignment/submission/metadata?assignment=" +
        props.id + "&user=" + username,
      {
        credentials: "include",
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        mock_data = data;
        setLoadedSubmissionData(mock_data);
        setIsLoading(false);
      });
  }, [props.id]);

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
          <Button href={`http://localhost:3000/deliverable/${props.id}`}>Details</Button>
        </Card.Header>
        <Accordion.Collapse eventKey="0">
          <Container className="loaded-comments">
            {LoadSubmissions(props.total)}
          </Container>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
}

export default SubmissionSection;
