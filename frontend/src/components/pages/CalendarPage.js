import {React, useState, useEffect} from "react";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import PageLayout from "./DefaultPage";
import './CalendarPage.css'
import { Row, Col, Button, Modal, Form } from "react-bootstrap";
import APIAccess from "../../controller";

const PERSONAL_COLOR = '#54e0ff';
const GROUP_COLOR = '#80eb34';
const GENERAL_COLOR = '#ff5454';

const placeholderData = {
  title: 'Personal Meeting',
  description: 'Test desription',
  start: new Date('July 10, 2021 03:00:00'),
  end: new Date('July 10, 2021 05:00:00'),
  type: 'personal',
  groupId: 'testgroup',
  userId: 'testuser',
}

function CalendarPage() {
  const [showEvent, setShowEvent] = useState(false);
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(placeholderData);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedEventData, setLoadedEventData] = useState([])
  const username = document.cookie.split('user=')[1].split('%20')[0]


 

  
function AddEventPopup({show, closeWindow}) {
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
        type = "group";
        console.log("WORKKKKKKKKKKK");
      }



      let userId = username;
      //window.location.reload();
      await APIAccess.createEvent(title, description, conferenceLink, start, end, type, groupId, userId);
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
        <Form.Control type="text" id="title" placeholder="Title of this new event" /></p>
        <p><b>Event Type:</b>
        <Form>
        <div id="type">
        <Form.Check inline label="general" id="type-general" value="general"  name="type" type="radio" />
        <Form.Check inline label="personal" id="type-personal"  value="personal" name="type" type="radio" />
        <Form.Check inline label="group" id="type-group" value="group" name="type" type="radio" />
        </div>
        </Form>
        </p>
        <p><Row>
        <Col md><b>Start Date: </b> <Form.Control type="datetime-local" id="start" /></Col>
        </Row></p>
        <p><Row><Col md><b>End Date: </b> <Form.Control type="datetime-local" id="end" /></Col>
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
          <Button variant="primary" onClick={update} >Update</Button>
          <Button variant="secondary" onClick={closeWindow}>Close</Button>
        </div>
      </Modal.Footer>
    </Modal>
  </>
  )
}

function EventPopup({show, closeWindow, eventData}) {
  let typeColor = 'white';
  if (eventData.type === 'group') {
    typeColor = GROUP_COLOR;
  } else if (eventData.type === 'personal') {
    typeColor = PERSONAL_COLOR
  } else if (eventData.type === 'general') {
    typeColor = GENERAL_COLOR
  }

  const joinButton = (eventData.conferenceLink) ? 
    (<Button variant="primary" href={eventData.conferenceLink} target="_blank">Join Meeting</Button>)
    : null

  return (
    <>
      <Modal show={show} onHide={closeWindow} centered size="lg">
        <Modal.Header closeButton className="event-header">
          <Modal.Title>{eventData.title}</Modal.Title>
          <div className="event-type" style={{backgroundColor: typeColor}}>{eventData.type}</div>
        </Modal.Header>
        <Modal.Body>
          <p><b>Created by: <a href={`/profile/${eventData.userId}`}>{eventData.userId}</a></b></p>
          <p><b>Start: </b>{eventData.start.toLocaleDateString()} {eventData.start.toLocaleTimeString()}</p>
          <p><b>End:   </b>{eventData.end.toLocaleDateString()} {eventData.end.toLocaleTimeString()}</p>
          {eventData.description}
        </Modal.Body>
        <Modal.Footer className="justify-content-between">
          <Button variant="danger">Delete Event</Button>
          <div className="event-exit-area">
            {joinButton}
            <Button variant="secondary" onClick={closeWindow}>Close</Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  )
}

  useEffect(() => {
    setIsLoading(true);
    fetch(`http://localhost:8000/calendar/${username}`, {})
    .then(response => response.json())
    .then(data => {
      setLoadedEventData(data)
      setIsLoading(false)
    })
  }, [username])

  const closeEventWindow = () => setShowEvent(false);
  const closeAddEventWindow = () => setShowAddEvent(false);
  const showAddEventWindow = () => setShowAddEvent(true);
  const showEventWindow = () => setShowEvent(true);
  const handleEventClick = (info) => {
    const showData = {
      title: info.event.title,
      description: info.event.extendedProps.description,
      conferenceLink: info.event.extendedProps.conferenceLink,
      start: info.event.start,
      end: info.event.end,
      type: info.event.extendedProps.type,
      groupId: info.event.groupId,
      userId: info.event.extendedProps.userId
    }
    setCurrentEvent(showData)
    showEventWindow()
  }

  const convertData = data => {
    let eventColor;
    if (data.type === 'personal') eventColor = PERSONAL_COLOR
    else if (data.type === 'group') eventColor = GROUP_COLOR
    else if (data.type === 'general') eventColor = GENERAL_COLOR
    return {...data, color: eventColor}
  }

  if (isLoading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <>
      <EventPopup show={showEvent} closeWindow={closeEventWindow} eventData={currentEvent}/>
      <AddEventPopup show={showAddEvent} closeWindow={closeAddEventWindow}/>
      <PageLayout>
        <div className="container-xl mt-5 card calendar">
          <FullCalendar
            plugins={[ dayGridPlugin, timeGridPlugin ]}
            initialView="dayGridMonth"
            height={700}
            eventTextColor={"black"}
            customButtons={{addEvent: {text: "Add Event", click:()=>showAddEventWindow()}}} //add functionality for button here: https://fullcalendar.io/docs/customButtons
            headerToolbar={{left: "addEvent", center: "title", right: "today dayGridMonth,timeGridWeek,timeGridDay prev,next"}}
            buttonText={{today: 'Today', month: 'Month', week: 'Week', day: 'Day'}}
            events={loadedEventData.map(x => convertData(x))}
            dayMaxEvents={true}
            eventClick={handleEventClick}
            navLinks={true}
            />
        </div>
      </PageLayout>
    </>
  )
}

export default CalendarPage;