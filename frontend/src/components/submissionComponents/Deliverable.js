import "./Deliverable.css";
import React, { useState, useEffect } from "react";
import APIAccess from "../../controller.js";
import {
  Row,
  Container,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import SubmissionSection from "./SubmissionSection";
import {toast} from "react-toastify";

function Deliverable(props) {
  //let postLink = "http://localhost:3000/postFeed/" + props.gid;
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

  const deletePost = async (id) => {
    console.log('delete post', id)
    const result = await APIAccess.deletePost(id)
    if (result.content) {
      props.deleteLocal(id)
      toast.success('Post has been deleted')
    } else {
      toast.error(result.message)
    }
  }

  if (isLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }

  return (
    <Container>
    <div class="card" id="post-wrapper"> 
      <div class="card-body rounded" id="post-body" style={{border: props.user === props.currentUser ?  "1.5px solid #1290ff": "1.5px solid #e0e0e0"}}>
        <div class="flex-container">
          <h3 class="card-title" id="post-user">{props.user}</h3>
          <h6 className="deliverable-date"> Date Created: {props.date}</h6>
        </div>
        <div class="flex-container">
          <h6 className="due-date"> Due: {props.date}</h6>
        </div>
      </div>
      <SubmissionSection pid={props.pid} delete={deletePost} user={props.user}></SubmissionSection>
    </div>
  </Container>
  );
}

export default Deliverable;
