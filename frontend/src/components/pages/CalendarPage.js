import {React, useState, useEffect} from "react";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import PageLayout from "./DefaultPage";
import './CalendarPage.css'
import { Row, Col, Button, Modal, Form } from "react-bootstrap";
import APIAccess from "../../controller";
import { toast } from "react-toastify";

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
  const [loadedGroupData, setLoadedGroupData] = useState([])
  const username = document.cookie.split('user=')[1].split('%20')[0]


  useEffect(() => {
    async function fetchData() {
      let data = await APIAccess.getGroupIdFromUserId(username);
      return data;
    }
    fetchData().then((x) => {
      setLoadedGroupData(x._id);
      console.log("GROUP: " + x._id);
    });
  }, [username]);

  
function AddEventPopup({show, closeWindow}) {
  const role = document.cookie.split('user=')[1].split('%20')[1];
  const update = async (e) => {
    e.preventDefault();
    try {
      let title = document.getElementById("title").value;
      let description = document.getElementById("eventdesc").value;
      let conferenceLink = document.getElementById("conference-link").value;
      let start = document.getElementById("start").value;
      let end = document.getElementById("end").value;
      console.log("TITLE:" + title);
   

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
        if (groupId != "undefined") {
          groupId = loadedGroupData;
        }

      }

      console.log(type);

      if (start == end || title == "" || description == "" || type == "") {
        console.log("NOT ALLOWED");
        document.getElementById("add-event-missing").innerHTML = "Please make sure title, event type, and description is not blank and start/end date aren't the same*";
        return;
      }

      let userId = username;
      window.location.reload();
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
        <Form.Control required type="text" id="title" placeholder="Title of this new event" /></p>
        <p><b>Event Type:</b>
        <Form>
        <div id="type">
        <Form.Check style={{display: role == "instructor" ? 'inline-block': 'none'}}inline label="general" id="type-general" value="general"  name="type" type="radio" />
        <Form.Check inline label="personal" id="type-personal"  value="personal" name="type" type="radio" />
        <Form.Check style={{display: loadedGroupData != null ? 'inline-block': 'none'}}inline label="group" id="type-group" value="group" name="type" type="radio" />
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
          <p id="add-event-missing"></p>
        </div>
      </Modal.Footer>
    </Modal>
  </>
  )
}

function EventPopup({show, closeWindow, eventData, deleteLocal}) {
  const username = document.cookie.split('user=')[1].split('%20')[0]

  console.log(eventData)
  let typeColor = 'white';
  if (eventData.type === 'group') {
    typeColor = GROUP_COLOR;
  } else if (eventData.type === 'personal') {
    typeColor = PERSONAL_COLOR
  } else if (eventData.type === 'general') {
    typeColor = GENERAL_COLOR
  }

  const deleteEvent = async () => {
    const result = await APIAccess.deleteEvent(eventData.id)
    console.log(result)
    if (result.success) {
      toast.success('Event has been removed')
      deleteLocal(eventData.id)
      closeWindow()
    } else {
      toast.error('Unable to delete event')
    }
  }

  const joinButton = (eventData.conferenceLink) ? 
    (<Button variant="primary" href={eventData.conferenceLink} target="_blank">Join Meeting</Button>)
    : null

  const deleteButton = (eventData.userId === username) ? 
    (<Button variant="danger" onClick={deleteEvent}>Delete Event</Button>) : null

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
          <div>
            {deleteButton}
          </div>
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
      userId: info.event.extendedProps.userId,
      id: info.event.extendedProps._id
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

  const deleteEventLocal = (eventId) => {
    const newEventData = loadedEventData.filter(x => {
      return x._id !== eventId})
    setLoadedEventData(newEventData)
  }

  if (isLoading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    )
  }

  return (console.log('render calendar', loadedEventData),
    <>
      <EventPopup show={showEvent} closeWindow={closeEventWindow} eventData={currentEvent} deleteLocal={deleteEventLocal}/>
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