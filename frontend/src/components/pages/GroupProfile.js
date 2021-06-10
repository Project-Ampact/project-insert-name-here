import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Card, Button, Container } from "react-bootstrap";
import Group from "../groupProfile/Group.js"
import GroupMemberList from "../group_members/GroupMemberList.js"
import "../groupProfile/Group.css";

/*function GroupProfileContent() {
    return (
     
    )
  }*/

const DUMMY_DATA1 = {
    name: 'AlphaTeam',
    image: 'https://picsum.photos/200/100',
    about: 'We are AlphaTeam'
}

const DUMMY_DATA2 = {
  name: 'BetaTeam',
  image: 'https://picsum.photos/200/100',
  about: 'We are BetaTeam'
}

const mock_data = [
  {
    _id: "0000000001",
    name: "test person",
    role: "Instructor"
  },
  {
    _id: "0020000301",
    name: "t2et person",
    role: "Student"
  },
  {
    _id: "0020000301",
    name: "t22t person",
    role: "Student"
  },
  {
    _id: "0020000301",
    name: "t2st person",
    role: "Student"
  },
  {
    _id: "0020000301",
    name: "t2st person",
    role: "Student"
  },
  {
    _id: "0020000301",
    name: "t2st person",
    role: "Student"
  },
  {
    _id: "0020000301",
    name: "t2st person",
    role: "Student"
  },
  {
    _id: "0020000301",
    name: "t2st person",
    role: "Student"
  },
]

function GroupProfile() {
  return (
    <Container className="mt-3 profile container-fluid">
    <Group {...DUMMY_DATA2}/>
    <GroupMemberList members = {mock_data} />
    </Container>
  );
}

export default GroupProfile;
