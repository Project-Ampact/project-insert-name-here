import "./Post.css";
import React, { useState, useEffect } from "react";
import APIAccess from "../../controller.js";
import {
  Row,
  Container,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
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
      <div class="card-body rounded" id="post-body" style={{border: props.user == props.currentUser ?  "1.5px solid #1290ff": "1.5px solid #e0e0e0"}}>
      <div class="flex-container">
      <img id="profile-picture" src={loadedUserData} alt="Profile picture"></img>
      <h3 class="card-title" id="post-user">{props.user}</h3>
      </div>
      <div class="grid-container">
      <h6 className="text-secondary" id="post-type">Type: {props.type}</h6>
       <h6 className="text-secondary" id="post-date">{props.date}</h6>
       </div>
       <h6 className="text-secondary text-right" id="post-type">Visible to: {props.visibility}</h6>
       <p id="post-content">{props.content}</p>
       </div>
    </div>
  </Container>
  );
}

export default Post;
