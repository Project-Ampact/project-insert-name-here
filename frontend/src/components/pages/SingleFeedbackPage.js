import React, { useState, useEffect } from "react";
import "./SingleVideoPage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Logo from "../../assets/logo.png";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import PageLayout from "./DefaultPage";
import Feedback from "../feedbackComponents/feedback.js";
import APIAccess from "../../controller.js";

let mock_data = [
  {
/*    title: "one",
    user: "david",
    grade: "20",
    totalGrade: "30",*/
  },
];

let mock_data2 = [
  {
/*    title: "one",
    user: "david",
    grade: "20",
    totalGrade: "30",*/
  },
];

let feedbackInfo ;
let assignmentInfo;

function SingleFeedbackPage() {
  let { fid } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [loadedVideoData, setLoadedVideoData] = useState([]);
  let assignmentValues;
  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:8000/assignment/submission/metadata/?id=60fdd64ec53efa18e0e09572", {
      credentials: 'include'
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        mock_data = data;
        setLoadedVideoData(data);
     
        console.log("TEST");
        console.log(data.assignment);
        assignmentValues = data.map((x => x.assignment)); 
        console.log("assignmentValues: " + assignmentValues);
        return fetch("http://localhost:8000/assignment/?id=" + assignmentValues);
      })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        mock_data2 = data;
        assignmentValues = data.map((x => x.title)); 
        console.log("assignmentValues: " + assignmentValues);
        setIsLoading(false);
      });
      
      
    
  }, [fid]);

  {
    mock_data.map((feedback) => {
      feedbackInfo = feedback;
    });
    console.log("Feedback assignment id: "+ feedbackInfo._id);

  }

  {
    mock_data2.map((assignment) => {
      assignmentInfo =assignment;
    });
    console.log("Feedback assignment title: "+ assignmentInfo.title);
    console.log("Feedback assignment instructor: "+ assignmentInfo.instructor);
    
  }

 
  









  if (isLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }



  return (
    <PageLayout>
        <Feedback 
        title={assignmentInfo.title}
        user={feedbackInfo.user}
        grade={feedbackInfo.grade}
        totalGrade={assignmentInfo.totalMarks}
        file={`http://localhost:8000/assignment/submission/file/${feedbackInfo._id}`}
        submissionId={feedbackInfo._id}
        currentFeedback={feedbackInfo.feedback}
        />


    </PageLayout>
  );
}

export default SingleFeedbackPage;