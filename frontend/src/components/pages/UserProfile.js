import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Card, Button, Container } from "react-bootstrap";
import UserPage from "../userProfile/UserPage.js"
import "../userProfile/UserPage.css";
import "./LoggedIn.css"
import NavigationBar from "../NavigationBar.js";

const DUMMY_DATA1 = {
    name: 'John Doe',
    teamname:'AlphaTeam',
    image: 'https://picsum.photos/200/100',
    about: 'A person of dsfkhlasoh...'
}

const DUMMY_DATA2 = {
  name: 'Lily Abc',
  teamname:'BetaTeam',
  image: 'https://picsum.photos/200/100',
  about: 'She is a sdlifhsdkjfh person...'
}



function UserProfile() {
    return (
      <div className="logged-in">
        <NavigationBar/>
        <UserPage {...DUMMY_DATA2}/>
      </div>
    );
  }
  

export default UserProfile;
