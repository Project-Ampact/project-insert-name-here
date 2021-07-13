import "./Post.css";
import React, { useState, useEffect } from "react";
import APIAccess from "../../controller.js";
import {
  Row,
  Container,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import CommentSection from "../commentComponents/CommentSection";
function Post(props) {
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
      <div class="card-body rounded" id="post-body">
      <div class="flex-container">
      <img id="profile-picture" src={loadedUserData} alt="Profile picture"></img>
      <h3 class="card-title" id="post-user">{props.user}</h3>
      </div>
      <div class="grid-container">
      <h6 className="text-secondary" id="post-type">Type: {props.type}</h6>
       <h6 className="text-secondary" id="post-date">{props.date}</h6>
       </div>
       <p id="post-content">{props.content}</p>
       </div>
       <CommentSection pid={props.pid}></CommentSection>
    </div>
  </Container>
  );
}

export default Post;
