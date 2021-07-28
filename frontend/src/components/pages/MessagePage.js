import "./GroupProfileEdit.css";
/*jshint esversion: 10*/
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Container,
  Button
} from "react-bootstrap";
import "../groupComponents/groupProfile/Group.css";
import UserProfileList from "../userProfile/UserProfileList.js";
import PageLayout from "./DefaultPage";
import './MessagePage.css'

let mock_data = [
  {
    _id: 'abc',
    firstName: 'Emily',
    lastName: 'Gilbert'
  },
  {
    _id: 'ddd',
    firstName: 'Jennifer',
    lastName: 'Blodgett'
  },
  {
    _id: 'user123',
    firstName: 'John',
    lastName: 'Doe'
  }
]

function MessagePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState(mock_data);
  const username = document.cookie.split("user=")[1].split("%20")[0];

  // TODO: add API call to get recent messages (message logs)

  if (isLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }

  return (
    <PageLayout>
      <Container className="profile container-fluid">
        <div>
          <h1 className="h1-cus">Messages</h1>
          <div className="recent-message-header">
            <h2>Recent Messages</h2>
            <Button href="/profile/search">New Message</Button>
          </div>
          {(userData.length !== 0) ? <UserProfileList profiles={userData}/> : "No recent messages"}
        </div>
      </Container>
    </PageLayout>
  );
}

export default MessagePage;
