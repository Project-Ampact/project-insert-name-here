import React, { useState, useEffect } from "react";
import "./SingleFeedbackPage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Logo from "../../assets/logo.png";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import PageLayout from "./DefaultPage";
import APIAccess from "../../controller.js";
import Feedback from "../feedbackComponents/feedback.js";
import FeedbackPdf from "../feedbackComponents/feedbackPdf";
import FeedbackForm from "../feedbackComponents/fedbackForm";
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

let mock_data = [
  {
  },
];

let mock_data2 = [
  {
  },
];

let feedbackInfo ;
let assignmentInfo;

function SingleFeedbackPage() {
  let { sid } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [loadedVideoData, setLoadedVideoData] = useState([]);
  let assignmentValues;
  useEffect(() => {
    setIsLoading(true);
    fetch(`http://localhost:8000/assignment/submission/metadata/?id=${sid}`, {
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
      
      
    
  }, []);

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
      <div id="single-feedback-page-wrapper">
      <FeedbackPdf file={`http://localhost:8000/assignment/submission/file/${feedbackInfo._id}`}/>
      <div id="submission-info-wrapper">
        <Feedback 
        title={assignmentInfo.title}
        user={feedbackInfo.user}
        grade={feedbackInfo.grade}
        totalGrade={assignmentInfo.totalMarks}
        submissionId={feedbackInfo._id}
        currentFeedback={feedbackInfo.feedback}
        dueDate={feedbackInfo.submissionTime}
        />
        <FeedbackForm  totalGrade={assignmentInfo.totalMarks}/>
        </div>
        </div>
      

    </PageLayout>
  );
}

export default SingleFeedbackPage;