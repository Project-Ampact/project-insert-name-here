import {React, useState} from "react";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import PageLayout from "./DefaultPage";
import './CalendarPage.css'
import { Button, Modal } from "react-bootstrap";

const PERSONAL_COLOR = '#54e0ff';
const GROUP_COLOR = '#80eb34';
const GENERAL_COLOR = '#ff5454';

const mock_data = [
  {
    title: 'Personal Meeting',
    description: 'Test desription',
    start: new Date('July 10, 2021 03:00:00'),
    end: new Date('July 10, 2021 05:00:00'),
    type: 'personal',
    groupId: 'testgroup',
    userId: 'testuser',
  },
  {
    title: 'Group Meeting',
    description: 'Test desription',
    start: new Date('July 15, 2021 03:00:00'),
    end: new Date('July 15, 2021 05:00:00'),
    type: 'group',
    groupId: 'testgroup',
    userId: 'testuser'
  },
  {
    title: 'General Meeting',
    description: 'Test desription',
    start: new Date('July 17, 2021 03:00:00'),
    end: new Date('July 17, 2021 05:00:00'),
    type: 'general',
    groupId: 'testgroup',
    userId: 'testuser'
  }
]

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
  const [currentEvent, setCurrentEvent] = useState(mock_data[0]);

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
            events={mock_data.map(x => convertData(x))}
            dayMaxEvents={true}
            eventClick={handleEventClick}
            />
        </div>
      </PageLayout>
    </>
  )
}

export default CalendarPage;