import React, { useState, useEffect } from "react";
import "./SingleVideoPage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Logo from "../../assets/logo.png";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import PageLayout from "./DefaultPage";
import Feedback from "../feedbackComponents/feedback.js";

let mock_data = [
  {
    title: "one",
    poster: "david",
    subject: "bootstrap",
    description: "Lorem ipsum",
    videoUrl: "https://www.youtube.com/embed/Ih2N_vPI9FY",
  },
];


function SingleFeedbackPage() {

  return (
    <PageLayout>
        <Feedback 
        title={"Assignment Title Test "}
        user={"david"}
        grade={"20"}
        totalGrade={"30"}/>


    </PageLayout>
  );
}

export default SingleFeedbackPage;