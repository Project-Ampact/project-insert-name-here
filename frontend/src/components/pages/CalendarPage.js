import {React, useState, useEffect} from "react";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import PageLayout from "./DefaultPage";
import './CalendarPage.css'
import { Button, Modal } from "react-bootstrap";

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

function EventPopup({show, closeWindow, eventData}) {
  let showGroup = null;
  let typeColor = 'white';
  if (eventData.type === 'group') {
    showGroup = (<p><b>Group: <a href={`/groupProfile/${eventData.groupId}`}>{eventData.groupId}</a></b></p>)
    typeColor = GROUP_COLOR;
  } else if (eventData.type === 'personal') {
    typeColor = PERSONAL_COLOR
  } else if (eventData.type === 'general') {
    typeColor = GENERAL_COLOR
  }

  return (
    <>
      <Modal show={show} onHide={closeWindow} centered size="lg">
        <Modal.Header closeButton className="event-header">
          <Modal.Title>{eventData.title}</Modal.Title>
          <div className="event-type" style={{backgroundColor: typeColor}}><b>{eventData.type}</b></div>
        </Modal.Header>
        <Modal.Body>
          <p><b>Created by: <a href={`/profile/${eventData.userId}`}>{eventData.userId}</a></b></p>
          {showGroup}
          <p><b>Start: </b>{eventData.start.toLocaleDateString()} {eventData.start.toLocaleTimeString()}</p>
          <p><b>End:   </b>{eventData.end.toLocaleDateString()} {eventData.end.toLocaleTimeString()}</p>
          {eventData.description}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeWindow}>Close</Button>
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
            customButtons={{addEvent: {text: "Add Event"}}} // add functionality for button here
            headerToolbar={{left: "addEvent", center: "title", right: "today dayGridMonth,timeGridWeek,timeGridDay prev,next"}}
            buttonText={{today: 'Today', month: 'Month', week: 'Week', day: 'Day'}}
            events={loadedEventData.map(x => convertData(x))}
            dayMaxEvents={true}
            eventClick={handleEventClick}
            />
        </div>
      </PageLayout>
    </>
  )
}

export default CalendarPage;