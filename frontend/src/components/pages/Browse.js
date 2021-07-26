/*jshint esversion: 10*/

import React, { useState, useEffect } from "react";
import {Row, Container,} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import { useParams } from "react-router-dom";
import VideoTagSection from "../videoComponents/VideoTagSection.js";
import "../videoComponents/VideoTagSection.css";
import APIAccess from "../../controller.js";
import PageLayout from "./DefaultPage";

import "react-pro-sidebar/dist/css/styles.css";

let mock_data2 = [""];

function Browse() {
  const username = document.cookie.split("user=")[1].split("%20")[0];
  const [isLoading, setIsLoading] = useState(true);
  const [loadedRecommendedVideos, setRecommendedVideos] = useState([""]);
  const [loadedVideoSections, setloadedVideoSections] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/video/browse/", 
    {
      credentials: 'include'
    })
      .then((response) => {
        
        return response.json();
        
      })
      .then((data) => {
       
        setloadedVideoSections(data);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    
    fetch(`http://localhost:8000/interests/user/${username}/recommendedVideos`, 
    {
      credentials: 'include'
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setRecommendedVideos(data);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }

  return (
    <PageLayout>
      <div className="body-cus">
        <div className="vid-sec2">
          <Container>
            <h1 className="h1-cus"> Browse</h1>
          </Container>
          <Container fluid className=" col2 profile container-fluid">
            <Row className="adjust-row">
              <VideoTagSection 
                section={"Recommended"}
                videos={loadedRecommendedVideos}
              />
              {loadedVideoSections.map((mock_data_piece) => {
                return (
                  <VideoTagSection
                    section={mock_data_piece.commonTag}
                    videos={mock_data_piece.videoSec}
                  />
                );
              })}
            </Row>
          </Container>
        </div>
      </div>
    </PageLayout>
  );
}

export default Browse;
