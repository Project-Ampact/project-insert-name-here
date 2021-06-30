import React, { useState, useEffect } from "react";
import {
  Row,
  Container,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../groupComponents/groupProfile/Group.css";
import { useParams } from "react-router-dom";
import VideoTagSection from "../videoComponents/VideoTagSection.js";
import "../videoComponents/VideoTagSection.css";
import APIAccess from "../../controller.js";
import PageLayout from "./DefaultPage";
import "../NavigationBar.css";
import "react-pro-sidebar/dist/css/styles.css";

let mock_data2 = [];

function Browse() {
  //let {gid} = useParams()
  const [isLoading, setIsLoading] = useState(true);
  const [loadedGroupData, setLoadedGroupData] = useState([]);

  useEffect(() => {
    //setIsLoading(true);
    fetch("http://localhost:8000/video/browse/")
      .then((response) => {
        // console.log( response.json())
        return response.json();
        //  setLoadedGroupData(response.json());
        //  setIsLoading(false)
      })
      .then((data) => {
        mock_data2 = data;
        setLoadedGroupData(data);
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
      <div className="body-cus">
        <div className="vid-sec2">
          <Container>
            <h1 className="h1-cus"> Browse</h1>
          </Container>
          <Container fluid className=" col2 profile container-fluid">
            <Row>
              {mock_data2.map((mock_data_piece) => {
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
