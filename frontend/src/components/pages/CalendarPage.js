import {React, useState, useEffect} from "react";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import PageLayout from "./DefaultPage";
import './CalendarPage.css'
import { Row, Col, Button, Modal, Form } from "react-bootstrap";

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

function AddEventPopup({show, closeWindow, eventData}) {
  return (
    <>
    <Modal show={show} onHide={closeWindow} centered size="lg">
      <Modal.Header closeButton className="event-header">
        <Modal.Title>Add Event</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p> <b>Event Title: </b>
        <Form.Control type="title" placeholder="Title of this new event" /></p>
        <p><b>Event Type:</b>
        <Form>
        <Form.Check inline label="general"  name="general" type="radio" />
        <Form.Check inline label="personal"  name="personal" type="radio" />
        <Form.Check inline label="group"  name="group" type="radio" />
        </Form>
        </p>
        <p><Row>
        <Col md><b>Start Date: </b> <Form.Control type="email" placeholder="YYYY/MM/DD" default="2021/07/10"/></Col>
        <Col md><b>Start Time: </b> <Form.Control type="email" placeholder="HH:MM" default="03:00"/></Col>
        </Row></p>
        <p><Row><Col md><b>End Date: </b> <Form.Control type="email" placeholder="YYYY/MM/DD" default="2021/07/10"/></Col>
        <Col md><b>End Time: </b> <Form.Control type="email" placeholder="HH:MM" default="03:00"/></Col>
        </Row></p>
        <p><b>Event description:</b>
        <Form.Control type="eventdesc" name="eventdesc"
          placeholder="Additional Notes about the event..." as="textarea" rows={3} />
        </p>
      </Modal.Body>
      <Modal.Footer className="justify-content-between">
        <div className="event-exit-area">
          <Button variant="primary" >Update</Button>
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

function CalendarPage() {
  const [showEvent, setShowEvent] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(placeholderData);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedEventData, setLoadedEventData] = useState([])
  const username = document.cookie.split('user=')[1].split('%20')[0]


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
      <PageLayout>
        <div className="container-xl mt-5 card calendar">
          <FullCalendar
            plugins={[ dayGridPlugin, timeGridPlugin ]}
            initialView="dayGridMonth"
            height={700}
            eventTextColor={"black"}
            customButtons={{addEvent: {text: "Add Event"}}} //, click:()=>this.AddEventPopup(); add functionality for button here: https://fullcalendar.io/docs/customButtons
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