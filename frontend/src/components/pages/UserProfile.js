import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import UserPage from "../userProfile/UserPage.js";
import "../userProfile/UserPage.css";
import "./LoggedIn.css";
import { useParams } from "react-router-dom";
import APIAccess from "../../controller.js";
import PageLayout from "./DefaultPage";
import "react-toastify/dist/ReactToastify.css";
import { Container } from "react-bootstrap";

function UserProfile() {
  let { uid } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [loadedUserData, setLoadedUserData] = useState([]);
  const username = document.cookie.split('user=')[1].split('%20')[0]

  useEffect(() => {
    async function fetchData() {
      let data = await APIAccess.getUserProfile(uid);
      return data;
    }
    fetchData().then((x) => {
      setLoadedUserData(x);
      setIsLoading(false);
    });
  }, [uid]);

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
        <UserPage {...loadedUserData} canEdit={username === uid} />
      </Container>
    </PageLayout>
  );
}

export default UserProfile;
