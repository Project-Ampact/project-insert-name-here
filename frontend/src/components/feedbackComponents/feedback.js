import "./feedback.css";
import React, { useState, useEffect } from "react";
import APIAccess from "../../controller.js";
import {
  Form, Container, Button
} from "react-bootstrap";
import FormControl from "react-bootstrap/FormControl";
import "bootstrap/dist/css/bootstrap.min.css";
//import PDFViewer from 'pdf-viewer-reactjs' 

function Feedback(props) {
  let gradePrecentage = ((props.grade / props.totalGrade) * 100).toFixed(2);


  const update = async (e) => {
    e.preventDefault();
    try {
      let feedbackDescription = document.getElementById("feedback-description").value;
      let gradeInput = document.getElementById("grade-input").value;

      console.log(gradeInput);
      console.log("Description: " + feedbackDescription);

      if (gradeInput == "") {
        document.getElementById("grade-error").innerHTML = "Please input a grade";
        return;
      }
      else if (gradeInput > props.totalGrade) {
        document.getElementById("grade-error").innerHTML = "The grade you inputted is larger than the total possible grade";
        return;
      }

      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>

    <div class="card" id="post-wrapper"> 
      <div class="card-body rounded" id="feedback-body">
      <div class="flex-container">
      <h3 class="card-title" id="feedback-title">{props.title}</h3>  

      </div>
      <div>
      <h5 class="card-title" id="feedback-user">{"Submitted by: " + props.user}</h5>
       <h6 className="text-secondary" id="feedback-grade">{props.grade + " / " + props.totalGrade + " (" + gradePrecentage  + "%)"}</h6>
       </div>
       <Form>
       <Form.Group controlId="feedback">
                    <Form.Label>Feedback</Form.Label>
                    <Form.Control type="text" id="feedback-description" name="eventdesc"
          placeholder="Additional notes about the submission..." as="textarea" rows={5} />
                  </Form.Group>

                  <Form.Group controlId="feedback-grade">
                    <Form.Label>Grade:</Form.Label>
                    <Form.Control type="number" id="grade-input" />
                    <Form.Text id="grade-error">
                     
                    </Form.Text>
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
  </Container>
  );
}

export default Feedback;
