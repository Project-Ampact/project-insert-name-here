import "./feedback.css";
import React, { useState, useEffect, useMemo } from "react";
import APIAccess from "../../controller.js";
import { Form, Container, Button } from "react-bootstrap";
import FormControl from "react-bootstrap/FormControl";
import "bootstrap/dist/css/bootstrap.min.css";

function FeedbackForm(props) {
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
    <div id="feedbackForm-wrapper">
        <div className="card">
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
             
            >
              Submit
            </Button>
          </Form>
        </div>
        </div>

    
  );
}

export default FeedbackForm;
