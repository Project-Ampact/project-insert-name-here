import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import UserPage from "../userProfile/UserPage.js"
import "../userProfile/UserPage.css";
import "./LoggedIn.css"
import NavigationBar from "../NavigationBar.js";
import {useParams} from "react-router-dom";

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
  let {uid} = useParams()
  const [isLoading, setIsLoading] = useState(true);
  const [loadedUserData, setLoadedUserData] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:8000/profile/" + uid)
      .then(response => {
        return response.json()
      })
      .then(data => {
        setLoadedUserData(data);
        setIsLoading(false);
        console.log("got user data")
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
        <UserPage {...loadedUserData} username={uid}/>
      </div>
    );
  }
  

export default UserProfile;
