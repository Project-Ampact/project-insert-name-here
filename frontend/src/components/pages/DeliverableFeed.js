import React, { useState, useEffect } from "react";
import { Row, Container, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import { useParams } from "react-router-dom";
import APIAccess from "../../controller.js";
import PageLayout from "./DefaultPage";

import "react-pro-sidebar/dist/css/styles.css";
import Deliverable from "../submissionComponents/Deliverable.js";
import { AuthService } from "../../util/authService";
let mock_data = [
  {
    description: "Christopher app",
    fileTypes: [],
    dueDate: "2021-07-30T21:01:41.834Z",
    date: "2021-07-22T21:01:41.834Z",
    _id: "60f9dcd72d85f44b40225074",
    title: "CS Assignment1",
    instructor: "christophersuh",
    __v: 0,
  },
  {
    description: "Christopher app",
    fileTypes: [],
    dueDate: "2021-07-29T21:01:41.834Z",
    date: "2021-07-22T21:13:38.251Z",
    _id: "60f9df9dbc18575198d11f8b",
    title: "CS Assignment2",
    instructor: "christophersuh",
    __v: 0,
  },
  {
    description: "Christopher app",
    fileTypes: ["pdf", "txt"],
    dueDate: "2021-08-05T21:01:41.834Z",
    date: "2021-07-24T05:08:43.620Z",
    _id: "60fba065c780560444f1ae19",
    title: "CS Assignment3",
    instructor: "christophersuh",
    __v: 0,
  },
];

// let postInfo = mock_data;

function DeliverableFeed() {
  /*let auth = AuthService();
  const username = document.cookie.split("user=")[1].split("%20")[0];
  const role = document.cookie.split("user=")[1].split("%20")[1];
  console.log("Username: " + username);
  console.log("Role: " + role);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedUserData, setLoadedUserData] = useState([]);
  const [loadedPostData, setLoadedPostData] = useState(mock_data);*/
  let emptyError = "";
  /*useEffect(() => {
    fetch("http://localhost:8000/assignment/", {
      credentials: "include",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        mock_data = data;
        setLoadedPostData(mock_data);
        setIsLoading(false);
      });
  }, []);*/

  /*useEffect(() => {
    async function fetchData() {
      let data = await APIAccess.getUserProfile(username);
      return data;
    }
    fetchData().then((x) => {
      setLoadedUserData(x._id);
      console.log("USER!: " + x._id);
    });
  }, [username]);*/

  /*if (isLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }*/

  /*const deleteLocalPost = (postId) => {
    console.log("length is ", mock_data.length);
    const newData = mock_data.filter((post) => post._id !== postId);
    console.log("now length is ", mock_data.length);
    setLoadedPostData(newData);
  };*/

  return (
    <PageLayout>
      <h1 className="h1-cus">Assignments</h1>
      {mock_data.map((mock_data_piece) => {
        //remember to change mock_data to loadedDeliverableData once connected to backend

        let date = new Date(mock_data_piece.date);
        let month = date.getMonth() + 1;
        let day = date.getDate();
        if (month < 10) {
          month = "0" + month;
        }
        if (day < 10) {
          day = "0" + day;
        }

        let dueDate = new Date(mock_data_piece.dueDate);
        let month2 = dueDate.getMonth() + 1;
        let day2 = dueDate.getDate();
        if (month2 < 10) {
          month2 = "0" + month2;
        }
        if (day2 < 10) {
          day2 = "0" + day2;
        }

        console.log(date.getFullYear() + "/" + month + "/" + day);
        return (
          <Deliverable
            user={mock_data_piece.instructor}
            date={date.getFullYear() + "/" + month + "/" + day}
            dueDate={dueDate.getFullYear() + "/" + month2 + "/" + day2}
            title={mock_data_piece.title}
            id={mock_data_piece._id}
          />
        );
      })}
      ;
    </PageLayout>
  );
}

export default DeliverableFeed;
