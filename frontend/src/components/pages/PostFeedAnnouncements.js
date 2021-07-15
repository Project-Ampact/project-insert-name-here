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
  const username = document.cookie.split("user=")[1].split("%20")[0];
  const role = document.cookie.split('user=')[1].split('%20')[1];
  console.log("Username: " + username);
  console.log("Role: " + role);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedUserData, setLoadedUserData] = useState([]);
  let emptyError = "";
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
    let postDescription = document.getElementById("postCreate").value;
    if (postDescription != "") {
    try {
     
      let type = "announcement";
      let user;
      console.log(postDescription);
      user = loadedUserData;
      console.log("USER" + user);
      console.log("WORK" );
      console.log("RRRROLE: " + role);
      let visibility = document.getElementById("visibility").value;
      window.location.reload();
      await APIAccess.createPost(user, type, postDescription, visibility);
      console.log("Made it here");
    } catch (err) {
      console.log(err);
    }
  }
  else {
    emptyError = "ERROR";
    console.log("ERROR");
  }
  };

  return (
    <PageLayout>
      <div id="posts">
        <Container>
          <div class="card" id="post-wrapper">
            <div class="card-body rounded" id="post-body">
              <div class="flex-container">
                <h1 class="card-title">Create Post As: {username}</h1>
              </div>
              <Form className="form-cus">
                <Form.Group controlId="postCreate">
                  <Form.Control
                    as="textarea"
                    rows={4}
                    type="postCreate"
                    placeholder="Type your post here!"
                  />
                </Form.Group>

                <label for="visibility">Set visibility:</label>
                <select class="form-control" id="visibility" aria-label=".form-select-lg">
                  <option value="all">All</option>
                  <option style={{display: role == "instructor" || role == "partner" ? 'block': 'none'}} value="entrepreneur">Entrepreneur</option>
                  <option  value="partner">Partner</option>
                  <option style={{display: role == "entrepreneur" ? 'block': 'none'}} value="instructor">Instructor</option>
                </select>

                <Button
                  onClick={update}
                  id="submit-button"
                  variant="primary"
                  type="submit"
                >
                  Submit
                </Button>
                  <p>{emptyError}</p>
              </Form>
            </div>
          </div>
        </Container>
        {mock_data.map((mock_data_piece) => {
          let profilePic;

          /*async function fetchData() {
          let data = await APIAccess.getUserProfile(mock_data_piece.user);
          return data;
        }
        fetchData().then((x) => {
          console.log("X: " + x.picture);
        profilePic = x.picture;
        console.log("inside" + profilePic);
        })
        
        console.log("OUTSIDE" + profilePic); */

          // fetchData();

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
          if ((mock_data_piece.type == "announcement") && (role == mock_data_piece.visibility || mock_data_piece.visibility == "all" || mock_data_piece.user == username)) {
            return (
              <Post 
                user={mock_data_piece.user}
                type={mock_data_piece.type}
                visibility={mock_data_piece.visibility}
                currentUser={username}
                date={date.getFullYear() + "/" + month + "/" + day}
                content={mock_data_piece.content}
              />
            );
          }
        })}
        
      </div>
    </PageLayout>
  );
}

export default PostFeedAnnouncements;
