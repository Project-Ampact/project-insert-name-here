import "./Reply.css";
import React, { useState, useEffect, useContext } from "react";
import { Row, Container, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import APIAccess from "../../controller.js";

function Reply(props) {
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

  return (
    <Container>
      <Row className="cus2-row">
        <Card className="comment-wrapper rounded">
          <Card.Body className="comment-body">
            <div className="title-and-date">
              <img id="profile-picture" src={loadedUserData} alt="Profile picture"></img>
              <h3 className="card-title2">{props.user}</h3>
              <h6 className="text-date comment-date">{props.date}</h6>
            </div>
            <p className="text-content2">{props.content}</p>
          </Card.Body>
        </Card>
      </Row>
    </Container>
  );
}

export default Reply;
