import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import Group from "../groupComponents/groupProfile/Group.js";
import GroupMemberList from "../groupComponents/group_members/GroupMemberList.js";
import "../groupComponents/groupProfile/Group.css";
import {useParams} from "react-router-dom";
import NavigationBar from '../NavigationBar';
import VideoTagSection from "../videoComponents/VideoTagSection.js";
import "../videoComponents/VideoTagSection.css"
import APIAccess from "../../controller.js";

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
    <div>
      <NavigationBar/>
      <Container className=" profile container-fluid">
            {mock_data2.map((mock_data_piece) => {
                return <VideoTagSection section = {mock_data_piece.commonTag}  videos = {mock_data_piece.videoSec}/> 
            })}
      </Container>
    </div>
  );
}

export default Browse;