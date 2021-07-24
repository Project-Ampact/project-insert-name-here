import React, { useState, useEffect } from "react";
import { Row, Container, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import { useParams } from "react-router-dom";
import APIAccess from "../../controller.js";
import PageLayout from "./DefaultPage";

import "react-pro-sidebar/dist/css/styles.css";
import Deliverable from "../submissionComponents/Deliverable.js";
import { AuthService } from "../../util/authService";
let mock_data = [
  {
    user: "David Tan",
    type: "QnA",
    content: "Lorem ipsum content is here cool",
    date: "today lol",
  },
];

// let postInfo = mock_data;

function DeliverableFeed() {
  let auth = AuthService();
  const username = document.cookie.split("user=")[1].split("%20")[0];
  const role = document.cookie.split("user=")[1].split("%20")[1];
  console.log("Username: " + username);
  console.log("Role: " + role);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedUserData, setLoadedUserData] = useState([]);
  const [loadedPostData, setLoadedPostData] = useState(mock_data);
  let emptyError = "";
  useEffect(() => {
    fetch("http://localhost:8000/assignment/", {
      credentials: "include",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        mock_data = data;
        setLoadedPostData(mock_data);
        setIsLoading(false);
      });
  }, []);

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
        let type = "QnA";
        let user;
        console.log(postDescription);
        user = loadedUserData;
        console.log("USER" + user);
        console.log("WORK");
        console.log("RRRROLE: " + role);
        let visibility = document.getElementById("visibility").value;
        window.location.reload();
        await APIAccess.createPost(user, type, postDescription, visibility);
        console.log("Made it here");
      } catch (err) {
        console.log(err);
      }
    } else {
      emptyError = "ERROR";
      console.log("ERROR");
    }
  };

  const deleteLocalPost = (postId) => {
    console.log("length is ", mock_data.length);
    const newData = mock_data.filter((post) => post._id !== postId);
    console.log("now length is ", mock_data.length);
    setLoadedPostData(newData);
  };

  return (
    <PageLayout>
      <div id="posts">
        {loadedPostData.map((mock_data_piece) => {
          
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

          <Deliverable
            user={mock_data_piece.instructor}
            currentUser={username}
            date={date.getFullYear() + "/" + month + "/" + day}
            dueDate={mock_data_piece.dueDate}
            title={mock_data_piece.title}
            id={mock_data_piece._id}
            deleteLocal={deleteLocalPost}
          />;
        })}
      </div>
    </PageLayout>
  );
}

export default DeliverableFeed;
