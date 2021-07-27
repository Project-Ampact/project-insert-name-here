import "./GroupProfileEdit.css";
/*jshint esversion: 10*/
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Container,
  CardColumns,
  Card,
  Button
} from "react-bootstrap";
import "../groupComponents/groupProfile/Group.css";
import UserProfileList from "../userProfile/UserProfileList.js";
import PageLayout from "./DefaultPage";
import GroupCard from "../messageComponents/GroupCard";
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
  const [groupData, setGroupData] = useState({})
  const username = document.cookie.split("user=")[1].split("%20")[0];

  useEffect(() => {
    setIsLoading(true);
    fetch('http://localhost:8000/group/member/' + username, {
      credentials: 'include'
    }).then((response) => {
      return response.json();
    }).then((data) => {
      console.log(data)
      setGroupData(data)
      setIsLoading(false);
    })
  }, [username])

  if (isLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }

  // const groupCard = (
  //   <Card key={groupData._id}>
  //     <Card.Body>
  //       <a className="links" style={{ cursor: "pointer" }} href={`http://localhost:3000/groupProfile/${groupData._id}`}>
  //         <Card.Img className="cus-img" src={groupData.picture}></Card.Img>
  //         <Card.Title className="cus-title">{groupData.name}</Card.Title>
  //         <Card.Text>{groupData.about}</Card.Text>
  //       </a>
  //       {/* TODO: implement group chat link here */}
  //       <Button className="mt-2">Message</Button>
  //     </Card.Body>
  //   </Card>
  // )

  return (console.log(groupData),
    <PageLayout>
      <Container className="profile container-fluid">
        <div>
          <h1 className="h1-cus">Messages</h1>
          <div className="recent-message-header">
            <h2>Recent Messages</h2>
            <Button href="/profile/search">New Message</Button>
          </div>
          {(userData.length !== 0) ? <UserProfileList profiles={userData}/> : "No recent messages"}
          <h2>Group</h2>
          <CardColumns>
            {(!groupData.message) ? <GroupCard groupData={groupData}/> : 'User is not part of a group'}
          </CardColumns>
        </div>
      </Container>
    </PageLayout>
  );
}

export default MessagePage;
