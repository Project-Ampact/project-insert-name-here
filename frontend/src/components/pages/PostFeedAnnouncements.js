import React, { useState, useEffect } from "react";
import {
  Row,
  Container, 
  Form,
  Button,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import { useParams } from "react-router-dom";
import VideoTagSection from "../videoComponents/VideoTagSection.js";
import "../videoComponents/VideoTagSection.css";
import APIAccess from "../../controller.js";
import PageLayout from "./DefaultPage";
import "./PostFeed.css";
import "react-pro-sidebar/dist/css/styles.css";
import Post from "../postComponents/Post.js";
import { AuthService } from "../../util/authService";
let mock_data = [
  {
    user: "David Tan",
    type: "QnA",
    content: "Lorem ipsum content is here cool",
    date: "today lol",
  },
];

function PostFeedAnnouncements() {
  let auth = AuthService();
  const username = document.cookie.split('user=')[1].split('%20')[0]
  const [isLoading, setIsLoading] = useState(true);
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

  useEffect(() => {
    async function fetchData() {
      let data = await APIAccess.getUserProfile(username);
      return data;
    }
    fetchData().then((x) => {
      setLoadedUserData(x._id);
      console.log("USER!: " + x._id);
      
    });
  }, [username]);

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
      let type = "announcement";
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
    <PageLayout>
      <div id="posts">
      <Container>
    <div class="card" id="post-wrapper"> 
      <div class="card-body rounded" id="post-body">
      <div class="flex-container">
      <h1 class="card-title">Create Post As:  {username}</h1>
      </div>
      <Form className="form-cus">
                  <Form.Group controlId="postCreate">
                    <Form.Control as="textarea" rows={4}
                      type="postCreate"
                      placeholder="Type your post here!"
                    />
                  </Form.Group>
                  <Button onClick={update} id="submit-button"  variant="primary" type="submit">
                    Submit
                  </Button>
                </Form>
       </div>
    </div>
  </Container>
        {mock_data.map((mock_data_piece) => {
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
          if (mock_data_piece.type == "announcement") {
            return (
              <Post
                user={mock_data_piece.user}
                type={mock_data_piece.type}
                date={date.getFullYear() + "/" + month + "/" + day}
                content={mock_data_piece.content}
                pid={mock_data_piece._id}
              />
            );
          }
        })}
      </div>
    </PageLayout>
  );
}

export default PostFeedAnnouncements;
