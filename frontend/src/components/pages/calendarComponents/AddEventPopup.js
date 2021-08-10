import {React} from 'react';
import { Button, Modal, Form, Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import APIAccess from "../../../controller";

function AddEventPopup({show, closeWindow, loadedGroupData}) {
  let currentTime = new Date();
  currentTime.setDate(currentTime.getDate() - 1);
  const username = document.cookie.split('user=')[1].split('%20')[0]
  const role = document.cookie.split('user=')[1].split('%20')[1];
  
  const update = async (e) => {
    e.preventDefault();
    try {
      let title = document.getElementById("title").value;
      let description = document.getElementById("eventdesc").value;
      let conferenceLink = document.getElementById("conference-link").value;
      let start = document.getElementById("start").value;
      let end = document.getElementById("end").value;
    

      let groupId = null;
      let type = "";
      if (document.getElementById("type-general").checked) {
        type = document.getElementById("type-general").value;
      }
      else if (document.getElementById("type-personal").checked) {
        type = document.getElementById("type-personal").value;
      }
      else if (document.getElementById("type-group").checked) {
        type = document.getElementById("type-group").value;
        if (groupId !== "undefined") {
          groupId = loadedGroupData;
        }

      }

      if (start === end || title === "" || description === "" || type === "") {
        console.log("NOT ALLOWED");
        document.getElementById("add-event-missing").innerHTML = "Please make sure title, event type, and description is not blank and start/end date aren't the same*";
        return;
      }

      if (conferenceLink !== '') {
          if (!conferenceLink.startsWith('https://')){
              toast.error('Conference link not valid');
              return;
          }

          if (conferenceLink.includes(' ')) {
            toast.error('Conference link not valid');
            return;
          }

          if (!conferenceLink.includes('zoom.us') && !conferenceLink.includes('meet.google.com') && !conferenceLink.includes('teams.microsoft.com')) {
              toast.error('Conference link not valid');
              return;
          }
      }

      const startDate = new Date(start);
      const endDate = new Date(end);
      if (startDate > endDate) {
        toast.error('Invalid time set')
        return
      }

      window.location.reload();
      await APIAccess.createEvent(title, description, conferenceLink, start, end, type, groupId, username);
      console.log("Made it here");
    } catch (err) {
      console.log(err);
    }
  };
  
  return (
    <>
      <Modal show={show} onHide={closeWindow} centered size="lg">
        <Modal.Header closeButton className="event-header">
          <Modal.Title>Add Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p> <b>Event Title: </b>
          <Form.Control required type="text" id="title" placeholder="Title of this new event" /></p>
          <p><b>Event Type:</b>
          <Form>
          <div id="type">
          <Form.Check inline label="personal" id="type-personal"  value="personal" name="type" type="radio" defaultChecked={true}/>
          <Form.Check style={{display: loadedGroupData != null ? 'inline-block': 'none'}}inline label="group" id="type-group" value="group" name="type" type="radio"/>
          <Form.Check style={{display: role === "instructor" ? 'inline-block': 'none'}}inline label="general" id="type-general" value="general"  name="type" type="radio" />
          </div>
          </Form>
          </p>
          <p><Row>
          <Col md><b>Start Date: </b> <Form.Control type="datetime-local" id="start" min={currentTime.toISOString().substring(0,16)}/></Col>
          </Row></p>
          <p><Row><Col md><b>End Date: </b> <Form.Control type="datetime-local" id="end" min={currentTime.toISOString().substring(0,16)}/></Col>
          </Row></p>
          <p><b>Event description:</b>
          <Form.Control type="text" id="eventdesc" name="eventdesc"
            placeholder="Additional Notes about the event..." as="textarea" rows={3} />
          </p>
  
          <p><b>Conference Link:</b>
          <Form.Control type="text" id="conference-link" name="conference-link"
            placeholder="Input conference link" />
          </p>
          
        </Modal.Body>
        <Modal.Footer className="justify-content-between">
          <div className="event-exit-area">
            <Button variant="primary" onClick={update}>Add Event</Button>
            <Button variant="secondary" onClick={closeWindow}>Close</Button>
            <p id="add-event-missing"></p>
          </div>
        </Modal.Footer>
      </Modal>
    </>
    )
  }

export default AddEventPopup;