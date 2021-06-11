import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import Group from "../groupProfile/Group.js";
import GroupMemberList from "../group_members/GroupMemberList.js";
import "../groupProfile/Group.css";
import APIAccess from "../../controller.js";


const mock_data = [
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
let groupData;
function GroupProfile() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedGroupData, setLoadedGroupData] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:8000/group/60c13863b069455054d4b224")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setIsLoading(false);
        setLoadedGroupData(data);
      });
  }, []);

  if (isLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }
  //  <GroupMemberList members={loadedGroupData.members} /> This is when you fix members
  return (
    <Container className="mt-3 profile container-fluid">
      <Group groupData={loadedGroupData} />
      <GroupMemberList members={mock_data} />
    </Container>
  );
}

export default GroupProfile;