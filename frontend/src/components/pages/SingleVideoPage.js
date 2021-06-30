import React, { useState, useEffect } from "react";
import "./SingleVideoPage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Logo from "../../assets/logo.png";
import APIAccess from "../../controller.js";
import { useHistory } from "react-router-dom";
import { AuthService } from "../../util/authService";
import { useParams } from "react-router-dom";

let mock_data = 
  [{
    title: "one",
    poster: "david",
    subject: "bootstrap",
    description: "Lorem ipsum",
    videoUrl: "https://www.youtube.com/embed/Ih2N_vPI9FY",
  }
];

let videoInfo;

function SingleVideoPage() {
  console.log(mock_data.title);
  let {vid} = useParams()
  const [isLoading, setIsLoading] = useState(true);
  const [loadedVideoData, setLoadedVideoData] = useState([]); 

  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:8000/video/?id=" + vid, {
    })
    
      .then((response) => {
       return response.json()
      })
      .then((data) => {
        mock_data = data;
        console.log(mock_data);
        setLoadedVideoData(data);
        setIsLoading(false);
       
     
      });
  }, [vid]); 

  {mock_data.map((video) => {
    videoInfo = video;
})}

  if (isLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }

  return (
    <div className="container-fluid">
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
          alllowfullscreen
        ></iframe>
      </div>
      <div className="container-fluid video-info rounded-bottom  pb-3 mb-3">
      <div class="d-flex flex-row flexs pb-4">
        <h1 className="mt-2 mr-2 flex-fill text-responsive" id="title">{videoInfo.title}</h1>
        <h3 className="mt-2 text-wrap text-break text-secondary " id="poster">Posted by: {videoInfo.poster}</h3>
        </div>
        <h3 className="text-secondary" id="subject">Subject: {videoInfo.subject}</h3>
        <p className="text-start pt-2" id="description">
          Description:
          <br></br>
        {videoInfo.description}
        </p>
      </div>
      </div>
    </div>
  );
}

export default SingleVideoPage;
