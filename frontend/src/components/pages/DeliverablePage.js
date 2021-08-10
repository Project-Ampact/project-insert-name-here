import "../deliverableComponents/Deliverable.css";
/*jshint esversion: 10*/
import APIAccess from "../../controller.js";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import PageLayout from "../pages/DefaultPage";
import { Col, Row, Card, Form, Button, Container } from "react-bootstrap";
import { propTypes } from "react-bootstrap/esm/Image";

import Deliverable from "../deliverableComponents/Deliverable.js";

let mock_data = [
  {
    description: "mock data of the assignment. requirements: 12345..",
    fileTypes: [],
    dueDate: "2021-07-30T21:01:41.834Z",
    date: "2021-07-22T21:01:41.834Z",
    _id: "60fdbca2d718ac465cf2b56a",
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

function DeliverablePage(props) {
  let { did } = useParams();
  
  
  // initializes the state for loading the data.
  const [isLoading, setIsLoading] = useState(true);

  // initalizes the state for the deliverable data. Initial state is the mock data
  const [loadedDeliverableData, setLoadedDeliverableData] = useState(mock_data);

  // This is only used once when the page begins to load
  useEffect(() => {
    setIsLoading(true);

    // api call to get deliverables
    fetch("http://localhost:8000/assignment/", {
      credentials: 'include' // <- this is required for all API calls
    })
      .then((response) => {
        // after the call you have the response. This will return the reponse in json form.
        return response.json();
      })
      .then((data) => {
        mock_data = data
        // set the deliverable data to what we got from the API call
        setLoadedDeliverableData(data);
        // we are done loading the data, so set it to false
        setIsLoading(false);
      });
  }, []);

  // if the page is loading it will render text to say 'Loading...'. Otherwise, it will show the full page.
  if (isLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }


  let backtoDeliverable = "../deliverableFeed";  

  //needs to change "mock_data[1]" and link it to the _id of the url?
  let mock_data_single = mock_data.filter(item => item._id === did)[0];

  if (mock_data_single == null) {
    return (
      <section>
        <p>This deliverable do not exist! </p>
        <Button href={`../deliverableFeed`}>Back</Button>
      </section>
    );
  } else {


  return (
    <PageLayout>
    <Deliverable
      dueDate={new Date(mock_data_single.dueDate)}
      title={mock_data_single.title}
      id={mock_data_single._id}
      totalMarks={mock_data_single.totalMarks}
      description={mock_data_single.description}
      instructor={mock_data_single.instructor}
    />
    </PageLayout>
  );

  }

}
export default DeliverablePage;
