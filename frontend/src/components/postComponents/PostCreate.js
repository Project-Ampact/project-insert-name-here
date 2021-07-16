/*import "./Post.css";
import React, { useState, useEffect } from "react";
import APIAccess from "../../controller.js";
import {
  Row,
  Container, 
  Form,
  Button,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
function PostCreate(props) {
  //let postLink = "http://localhost:3000/postFeed/" + props.gid;
  const [isLoading, setIsLoading] = useState(true);
  const [loadedUserData, setLoadedUserData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      let data = await APIAccess.getUserProfile(props.user);
      return data;
    }
    fetchData().then((x) => {
      setLoadedUserData(x._id);
      console.log("USER!: " + x._id);
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

  const update = async (e) => {
    e.preventDefault();
    try {
      let postDescription = document.getElementById("postCreate").value;
      let type = "QnA";
      let user;
      console.log(postDescription);
      user = loadedUserData;
      console.log("USER" + user);
      window.location.reload();
      await APIAccess.createPost(user, type, postDescription);
      console.log("Made it here");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
    <div class="card" id="post-wrapper"> 
      <div class="card-body rounded" id="post-body">
      <div class="flex-container">
      <h1 class="card-title">Create Post</h1>
      <h3 class="card-title" id="post-user">{props.user}</h3>
      </div>
      <Form className="form-cus">
                  <Form.Group controlId="postCreate">
                    <Form.Control
                      type="postCreate"
                      placeholder="Type your post here!"
                    />
                  </Form.Group>
                  <Button onClick={update} variant="primary" type="submit">
                    Submit
                  </Button>
                </Form>
       </div>
    </div>
  </Container>
  );
}

export default PostCreate;*/
