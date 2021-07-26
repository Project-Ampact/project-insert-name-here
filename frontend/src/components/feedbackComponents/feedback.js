import "./feedback.css";
import React, { useState, useEffect, useMemo } from "react";
import APIAccess from "../../controller.js";
import { Form, Container, Button } from "react-bootstrap";
import FormControl from "react-bootstrap/FormControl";
import "bootstrap/dist/css/bootstrap.min.css";

import {
  FaArrowLeft,
  FaArrowRight,

} from "react-icons/fa";

import { 
  RiZoomOutLine,
  RiZoomInLine

} from "react-icons/ri";

import { Document, Page, pdfjs } from "react-pdf";
import FeedbackPdf from "./feedbackPdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function Feedback(props) {
  let gradePrecentage = ((props.grade / props.totalGrade) * 100).toFixed(2);


  const update = async (e) => {
    e.preventDefault();
    try {
      let submissionId = document.getElementById("submission-id").innerHTML;
      let feedbackDescription = document.getElementById(
        "feedback-description"
      ).value;
      let gradeInput = document.getElementById("grade-input").value;
        console.log("submission: " + submissionId);
      console.log(gradeInput);
      console.log("Description: " + feedbackDescription);

      if (gradeInput == "") {
        document.getElementById("grade-error").innerHTML =
          "Please input a grade!";
        return;
      } else if (gradeInput > props.totalGrade) {
        document.getElementById("grade-error").innerHTML =
          "The grade you inputted is larger than the total possible grade!";
        return;
      }
      window.location.reload();
    await APIAccess.updateFeedback(gradeInput, feedbackDescription, submissionId);
       
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div id="feedback-wrapper">

      <div class="card" id="submission-wrapper">
        <div class="card-body rounded" id="feedback-body">
          <div class="flex-container">
            <h1 class="card-title" id="feedback-title">
              {props.title}
            </h1>
          </div>
       
            <h5 class="card-title" id="feedback-user">
              {"Submitted by: " + props.user}
            </h5>
            <h6  className="text-secondary" id="submission-id">{props.submissionId}</h6>
            <div id="grade-wrapper">
              <h6 id="grade-title">Grade:</h6>
            <h6 className="text-secondary text-success" id="feedback-grade">
              {props.grade +
                " / " +
                props.totalGrade +
                " (" +
                gradePrecentage +
                "%)"}
             
            </h6>
            </div>
            <h6 id="current-feedback-title">Currrent Feedback:</h6>
            <div className="rounded" id="current-feedback-wrapper">
            <p id="current-feedback">{props.currentFeedback}</p>
            </div>
        </div>
      </div>

    </div>
    
  );
}

export default Feedback;
