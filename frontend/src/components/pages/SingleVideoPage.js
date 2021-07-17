import React, { useState, useEffect } from "react";
import "./SingleVideoPage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Logo from "../../assets/logo.png";
import APIAccess from "../../controller.js";
import { useHistory } from "react-router-dom";
import { AuthService } from "../../util/authService";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import PageLayout from "./DefaultPage";

let mock_data = [
  {
    title: "one",
    poster: "david",
    subject: "bootstrap",
    description: "Lorem ipsum",
    videoUrl: "https://www.youtube.com/embed/Ih2N_vPI9FY",
  },
];

let videoInfo;

function SingleVideoPage() {
  console.log(mock_data.title);
  let { vid } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [loadedVideoData, setLoadedVideoData] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:8000/video/?id=" + vid, {
      credentials: 'include'
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        mock_data = data;
        console.log(mock_data);
        setLoadedVideoData(data);
        setIsLoading(false);
      });
  }, [vid]);

  {
    mock_data.map((video) => {
      videoInfo = video;
    });
  }

  if (isLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }

  return (
    <PageLayout>
      <div>
        <Container>
          <div className="container-fluid mb-5">
            <div className="wrapper">
              {" "}
              <img
                id="african-impact-logo"
                src={Logo}
                alt="african impact initiative logo"
              />
            </div>
            <div className="container-xl">
              <div className="embed-responsive embed-responsive-16by9">
                <iframe
                  class="embed-responsive-item"
                  src={videoInfo.videoUrl}
                  id="video"
                  allowfullscreen="true"
                ></iframe>
              </div>
              <div className="container-fluid video-info ">
                <div class="d-flex flex-row">
                  <h1 className="mt-2 flex-fill" id="title">
                    {videoInfo.title}
                  </h1>
                  <h2 className="mt-2" id="poster">
                    Posted by: {videoInfo.poster}
                  </h2>
                </div>
                <h3 className="text-secondary" id="subject">
                  Subject: {videoInfo.subject}
                </h3>
                <p className="text-start" id="description">
                  {videoInfo.description}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </PageLayout>
  );
}

export default SingleVideoPage;
