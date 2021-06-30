import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import UserPage from "../userProfile/UserPage.js"
import "../userProfile/UserPage.css";
import "./LoggedIn.css"
import NavigationBar from "../NavigationBar.js";
import {useParams} from "react-router-dom";
import APIAccess from "../../controller.js";
import 'react-toastify/dist/ReactToastify.css';

function UserProfile() {
  let {uid} = useParams()
  const [isLoading, setIsLoading] = useState(true);
  const [loadedUserData, setLoadedUserData] = useState([]);
  const username = document.cookie
    .split('; ')
    .find(row => row.startsWith('username='))
    .split('=')[1]

  useEffect(() => {
    async function fetchData() {
      let data = await APIAccess.getUserProfile(uid)
      return data
    }
    fetchData()
      .then((x) => {
        setLoadedUserData(x)
        setIsLoading(false)
      })
  }, [uid]);

    if (isLoading) {
      return (
        <section>
          <p>Loading...</p>
        </section>
      );
    }

    return (
      <div className="logged-in">
        <NavigationBar/>
        <UserPage {...loadedUserData} canEdit={username === uid}/>
      </div>
    );
  }
  

export default UserProfile;
