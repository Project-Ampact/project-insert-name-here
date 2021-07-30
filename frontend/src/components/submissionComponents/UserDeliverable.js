import "./Deliverable.css";
import React, { useState, useEffect } from "react";
import APIAccess from "../../controller.js";
import {
  Row,
  Container,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import UserSubmission from "./UserSubmission";
import {toast} from "react-toastify";

function Deliverable(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedUserData, setLoadedUserData] = useState([]);

  return (
    <Container>
    <div class="card" id="post-wrapper"> 
      <div class="card-body rounded" id="post-body">
        <div class="flex-container">
          <h3 className="deliverable-title">{props.title}</h3>
          <h6 className="deliverable-date"> Date Created: {props.date}</h6>
        </div>
        <div class="flex-container">
          <h6 className="due-date"> Due: {props.dueDate}</h6>
          <h6 className="total-marks"> TotalMarks: {props.total}</h6>
        </div>
      </div>
      <UserSubmission id={props.id} total={props.total} user={props.instructor}></UserSubmission>
    </div>
  </Container>
  );
}

export default Deliverable;
