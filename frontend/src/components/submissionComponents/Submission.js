import "./Submission.css";
import React, { useState, useEffect, useContext } from "react";
import { Row, Container, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import APIAccess from "../../controller.js";
import {toast} from 'react-toastify';


function Submission(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedUserData, setLoadedUserData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      let data = await APIAccess.getUserProfile(props.user);
      return data;
    }
    fetchData().then((x) => {
      setLoadedUserData(x.picture);
      console.log("X: " + x.picture);
      setIsLoading(false);
    });
  }, [props.user]);

  

  if (isLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }
  let submissionLink = "http://localhost:3000/submission/" + props.id;
  return (
    <Container>
      <Row className="cus2-row">
        <Card className="comment-wrapper rounded">
        <a className="links" style={{ cursor: "pointer" }} href={submissionLink}>
          <Card.Body className="comment-body">
            <div className="title-and-date">
              <img id="profile-picture" src={loadedUserData} alt="Profile picture"></img>
              <h3 className="card-title2">{props.user}</h3>
              <div className="date-and-grade">
              <h6 className="text-date2 ">Submission date: {props.date}</h6>
                <p className="text-content2">Grade: {props.grade} / {props.total}</p>
               
              </div>
            </div>
          </Card.Body>
          </a>
        </Card>
      </Row>
    </Container>
  );
}

export default Submission;
