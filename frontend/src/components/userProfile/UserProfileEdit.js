import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import APIAccess from "../../controller.js";
import { useParams, useHistory } from "react-router-dom";
import NavigationBar from "../NavigationBar";

function UserProfileEdit() {
  let history = useHistory()
  const {uid} = useParams()
  const [isLoading, setIsLoading] = useState(true);
  const [loadedUserData, setLoadedUserData] = useState([])
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
  }, [uid])

  const update = async (e) => {
    e.preventDefault();
    try {
      let fName = document.getElementById("fname").value;
      let lName = document.getElementById("lname").value;
      let profile = document.getElementById("picture").value;
      let bio = document.getElementById("about").value;
      await APIAccess.updateUserProfile(uid, fName, lName, profile, bio)
      console.log('after api call')
    } catch (err) {
      console.log(err)
    }
    toast.success('User info updated', {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      });
    history.push('/profile/' + uid)
  }

  if (isLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    )
  }

  if (username !== uid) {
    history.goBack()
  }

  return (
    <div className="logged-in">
    <NavigationBar/>
    <div className="register">
      <form id="register-form">
        <fieldset>
          <header>
            <h1 className="register-title">{uid}</h1>
          </header>
          <main>
          <h2 className="register-subtitle">Edit Profile</h2>
          <div className="wrapper-register">
              <label htmlFor="firstName">First Name:</label>
                <input
                  type="register"
                  name="firstName"
                  id="fname"
                  defaultValue={loadedUserData.firstName}
                />
              <label htmlFor="lastName">Last Name:</label>
                <input
                  type="register"
                  name="lastName"
                  id="lname"
                  defaultValue={loadedUserData.lastName}
                />

              <label htmlFor="picture">Profile Picture:</label>
              <input
                type="register"
                name="picture"
                id="picture"
                defaultValue={loadedUserData.picture}
              />

              <label htmlFor="about">About:</label><br></br>
              <div>
                <textarea
                  type="register"
                  name="about"
                  id="about"
                  defaultValue={loadedUserData.bio}
                />
              </div>
            </div>
           
            <button type="submit" onClick={update} className="submit-button">
              Update
            </button>
          </main>
        </fieldset>
      </form>
    </div>

  </div>

    
  );
}

export default UserProfileEdit;
