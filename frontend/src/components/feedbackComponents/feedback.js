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
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function Feedback(props) {
  let gradePrecentage = ((props.grade / props.totalGrade) * 100).toFixed(2);
  const file = useMemo(
    () =>
      "https://www.antennahouse.com/hubfs/xsl-fo-sample/pdf/basic-link-1.pdf?hsLang=en"
  );

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scaleNumber, setScaleNumber] = useState(1);

  /*useEffect(() => {
    fetch("http://localhost:8000/post/", 
    {
      credentials: 'include'
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        mock_data = data;
        setLoadedPostData(mock_data)
        setIsLoading(false);
      });
  }, []);
*/


  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
    setScaleNumber(1);
  }

  function changePage(offset) {
    setPageNumber((prevNumber) => prevNumber + offset);
  }

  function nextPage() {
    changePage(1);
  }

  function previousPage() {
    changePage(-1);
  }

  function changeScale(offset) {
    setScaleNumber((prevNumber) => prevNumber + offset);
  }

  function largerScale() {
    changeScale(0.25);
  }

  function smallerScale() {
    changeScale(-0.25);
  }

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
      <div>
        <div class="grid-container bg-info rounded-top">
          <button  
            type="button"
            class="btn"
            disabled={pageNumber <= 1}
            onClick={previousPage}
          >
            <FaArrowLeft />
          </button>
          <button
            type="button"
            class="btn"
            disabled={pageNumber >= numPages}
            onClick={nextPage}
          >
            <FaArrowRight />
          </button>
          <div id="grid-gap"></div>
          <button
            type="button"
            class="btn"
            disabled={scaleNumber <= 0.75}
            onClick={smallerScale}
          >
            <RiZoomOutLine />
          </button>
          <button
            type="button"
            class="btn"
            disabled={scaleNumber >= 1.5}
            onClick={largerScale}
          >
            <RiZoomInLine />
          </button>
          <h6 id="page-number">
            Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
          </h6>
        </div>
        <div id="pdf">
          <Document file={props.file} onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={pageNumber} height={1000} scale={scaleNumber} />
          </Document>
        </div>
      </div>

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

        

          <Form id="feedback-form">
            <Form.Group controlId="feedback">
                <h3>Submit Feedback</h3>
              <Form.Label>Feedback:</Form.Label>
            
              <Form.Control
                type="text"
                id="feedback-description"
                name="eventdesc"
                placeholder="Additional notes about the submission..."
                as="textarea"
                rows={5}
              />
            </Form.Group>

            <Form.Group controlId="feedback-grade">
              <Form.Label>Grade:</Form.Label>
              <Form.Control type="number" id="grade-input" />
              <Form.Text id="grade-error"></Form.Text>
            </Form.Group>
            <Button
              onClick={update}
              variant="primary"
              type="submit"
              //href="http://localhost:3000/browse"
            >
              Submit
            </Button>
          </Form>
        </div>
      </div>

    </div>
    
  );
}

export default Feedback;
