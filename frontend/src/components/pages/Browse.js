import React, { useState, useEffect } from "react";
import { Nav, CardDeck, Carousel, Row, Col, Card, Button, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import Group from "../groupComponents/groupProfile/Group.js";
import GroupMemberList from "../groupComponents/group_members/GroupMemberList.js";
import "../groupComponents/groupProfile/Group.css";
import {useParams} from "react-router-dom";
import NavigationBar from '../NavigationBar';
import VideoTagSection from "../videoComponents/VideoTagSection.js";
import "../videoComponents/VideoTagSection.css"
import APIAccess from "../../controller.js";
import NavBar from "../NavBar.js";
import '../NavigationBar.css';


let mock_data2 = [];

function Browse() {
  //let {gid} = useParams()
  const [isLoading, setIsLoading] = useState(true);
  const [loadedGroupData, setLoadedGroupData] = useState([]);
  
  //useEffect(() => {
   // setIsLoading(true);
    //console.log(APIAccess.getVideoSections())
    //mock_data2 = APIAccess.getVideoSections(); 
   // console.log(mock_data2)
  //  setLoadedGroupData(mock_data2);
   // setIsLoading(false);
  //});

 /* if (isLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }*/



  /*const loadVideoSectionData = async () => {
    //e.preventDefault();
    try {
      mock_data2 = await APIAccess.getVideoSections();
      //setIsLoading(false);
      console.log("mock_data2: ",mock_data2);
    } catch (err) {
      console.log(err);
    }
  };

  //const [count, setCount] = useState(0);

  useEffect(() => {
    loadVideoSectionData();
    console.log(mock_data2)
  });*/

 // loadVideoSectionData();

  /*if (isLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }*/
  useEffect(() => {
    //setIsLoading(true);
    fetch("http://localhost:8000/video/browse/")
      .then((response) => {
       // console.log( response.json())
       return response.json()
    //  setLoadedGroupData(response.json());
    //  setIsLoading(false)
      })
      .then( (data) => {
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
    <Container fluid>
      <Row>
        <Col xs={1} className="sidebar-wrapper">
          <NavBar/>
        </Col>
        <Col xs={11} className="page-content-wrapper">
          <div className="body-cus">
          <div className="vid-sec2">
            <Container>
            <h1 className="h1-cus"> Browse</h1>
            </Container>
            <Container  fluid className=" col2 profile container-fluid">
              <Row>
              {mock_data2.map((mock_data_piece) => {
                      return <VideoTagSection section = {mock_data_piece.commonTag}  videos = {mock_data_piece.videoSec}/> 
                  })}
              </Row>
            </Container>
          </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Browse;