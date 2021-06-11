import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import Group from "../groupProfile/Group.js";
import GroupMemberList from "../group_members/GroupMemberList.js";
import "../groupProfile/Group.css";
import APIAccess from "../../controller.js";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
} from "react-router-dom";


let mock_data = [
  {
    _id: "0000000001",
    name: "test person",
    role: "Instructor",
  },
  {
    _id: "0020000301",
    name: "t2et person",
    role: "Student",
  },
  {
    _id: "0020000301",
    name: "t22t person",
    role: "Student",
  },
  {
    _id: "0020000301",
    name: "t2st person",
    role: "Student",
  },
  {
    _id: "0020000301",
    name: "t2st person",
    role: "Student",
  },
  {
    _id: "0020000301",
    name: "t2st person",
    role: "Student",
  },
  {
    _id: "0020000301",
    name: "t2st person",
    role: "Student",
  },
  {
    _id: "0020000301",
    name: "t2st person",
    role: "Student",
  },
];
let memData;
function GroupProfile() {
  let {gid} = useParams()
  const [isLoading, setIsLoading] = useState(true);
  const [loadedGroupData, setLoadedGroupData] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:8000/group/" + gid)
      .then((response) => {
       // console.log( response.json())
       return response.json()
    //  setLoadedGroupData(response.json());
    //  setIsLoading(false)
      })
      .then((data) => {
        mock_data = data.members
        setLoadedGroupData(data);
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
    <Container className="mt-3 profile container-fluid">
      <Group gid = {gid} groupData={loadedGroupData} />
      <GroupMemberList members={mock_data} /> 
    </Container>
  );
}

export default GroupProfile;