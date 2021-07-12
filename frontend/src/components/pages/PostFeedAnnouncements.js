import React, { useState, useEffect } from "react";
import { Row, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import { useParams } from "react-router-dom";
import VideoTagSection from "../videoComponents/VideoTagSection.js";
import "../videoComponents/VideoTagSection.css";
import APIAccess from "../../controller.js";
import PageLayout from "./DefaultPage";
import "./PostFeed.css";
import "react-pro-sidebar/dist/css/styles.css";
import Post from "../postComponents/Post.js";

let mock_data = [
  {
    user: "David Tan",
    type: "QnA",
    content: "Lorem ipsum content is here cool",
    date: "today lol",
  },
];

function PostFeedAnnouncements() {
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

  if (isLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }

  return (
    <PageLayout>
      <div id="posts">
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
              />
            );
          }
        })}
      </div>
    </PageLayout>
  );
}

export default PostFeedAnnouncements;
