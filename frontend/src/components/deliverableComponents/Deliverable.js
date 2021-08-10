import "./Deliverable.css";
/*jshint esversion: 10*/
import APIAccess from "../../controller.js";
import { useParams, useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";
import PageLayout from "../pages/DefaultPage";
import { Col, Row, Card, Form, Button, Container } from "react-bootstrap";
import { propTypes } from "react-bootstrap/esm/Image";


function Deliverable(props) {
  let { did } = useParams();
  let history = useHistory(); 
  const username = document.cookie.split("user=")[1].split("%20")[0];
  const role = document.cookie.split('user=')[1].split('%20')[1];

  let backtoDeliverable = `../assignmentsFeed`;
  let mock_data;

  if (role === 'instructor'){
    backtoDeliverable = `../deliverableFeed`;
  }
  
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [DeliverableData, setDeliverableData] = useState({});
  const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:8000/assignment/", {
      credentials: 'include'
    })
      .then((response) => {
        //console.log(response.json())
        return response.json();
      })
      .then((data) => {
        // console.log(data)
        mock_data = data;
        setDeliverableData(data);
        setIsLoading(false);
      });
  }, []);

  const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsFilePicked(true);
	};


  const newSubmission = async (e) => {
    e.preventDefault();
    try {
      let assignment = props.id;
      const fileData = new FormData();
		  fileData.append('file', selectedFile);
      fileData.append('assignment', assignment)

      let result = await APIAccess.createNewSubmission(fileData);
      console.log("Made it here");
      history.push(backtoDeliverable);
    } catch (err) {
      console.log(err);
    }
  };

  if (isLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }

  return (
    <Container className="profile container-fluid">
      <h1 className="h1-cus"> {props.title}</h1>
      <div className="mid-width"> 
        <Card><Card.Body>
          <Card.Title> <h2>{props.title}</h2> </Card.Title>
          <Card.Subtitle></Card.Subtitle>
          <Card.Text>
          <Row>
            <Col>
            <h4>Instructor: {props.instructor}</h4>
            </Col>
            <Col>Total Marks: {props.totalMarks}</Col>
            {role === 'nobody' &&
            <Col sm={15}> <Button  type="submit" variant="danger" > Delete Task </Button>
            </Col> 
            } 
          </Row> 
          <Row>
            <Col>
            <p id="description">
            {props.description}
            </p>

          <h6 className="dead-line" controlId="deliverableddl">
            Assignment Deadline: {props.dueDate.toLocaleDateString() + ' ' + props.dueDate.toLocaleTimeString()}</h6>
            </Col>
          </Row>
          </Card.Text>
          </Card.Body></Card></div>
      <div className="mid-width"> 
          <Card><Card.Body>
          <Card.Title>Submit your work:</Card.Title>
          <Form.Group controlId="inputfile">
            <Form.Label>Select the file to upload:</Form.Label>
            <Form.File onChange={changeHandler} id="inputfile" required/>
            {selectedFile ? (
				    <div><p>
            <Row><Col>Filetype: {selectedFile.type}</Col>
            <Col>Size in bytes: {selectedFile.size}</Col>
            <Col>
              Last Modified Date:{' '}
              {selectedFile.lastModifiedDate.toLocaleDateString()}
					  </Col></Row></p>
				    </div>) : (
				    <p></p>
            )}
          </Form.Group>
          

          <Row className="container-fluid"><Col>
          <div className="register del-button"> 
          {selectedFile ? (
            <Row>
				     <Col sm={5}><Button type="reset" variant="secondary" href={backtoDeliverable}>
             Cancel</Button></Col>
             <Col sm={5}><Button onClick={newSubmission} type="submit" variant="primary"  href={backtoDeliverable}>
             Upload </Button></Col> 
				    </Row>) : (
				    <div>
            <Col><Button type="reset" variant="secondary" href={backtoDeliverable}>
            Cancel</Button></Col>
           </div>
            )}
             
            </div>
            <div className="wrapper-register"><p id="error-message">Error: please change your information*</p></div>
          </Col>
        </Row>
        </Card.Body></Card>
        
      </div>
    </Container>
  );
}

export default Deliverable;
