import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
//import { Row, Col, Card, Button, Container } from "react-bootstrap";
import Group from "../groupProfile/Group.js"

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

function GroupProfile() {
  return (
    <Group {...DUMMY_DATA2}/>
    //Group members component goes here
  );
}

export default GroupProfile;
