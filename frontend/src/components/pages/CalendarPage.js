import {React, useState, useEffect} from "react";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import PageLayout from "./DefaultPage";
import './CalendarPage.css'
import APIAccess from "../../controller";
import AddEventPopup from "../calendarComponents/AddEventPopup";
import EventPopup from "../calendarComponents/EventPopup";

const PERSONAL_COLOR = '#54e0ff';
const GROUP_COLOR = '#80eb34';
const GENERAL_COLOR = '#ff5454';
const ASSIGNMENT_COLOR = '#f5c542';

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
  const role = document.cookie.split('user=')[1].split('%20')[1]

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

  useEffect(() => {
    setIsLoading(true);
    fetch(`http://localhost:8000/calendar/${username}`, {
      credentials: 'include'
    })
    .then(response => response.json())
    .then(data => {
      setLoadedEventData(data)
      setIsLoading(false)
    })
  }, [username, role])

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
    else if (data.type === 'assignment') eventColor = ASSIGNMENT_COLOR
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
      <AddEventPopup show={showAddEvent} closeWindow={closeAddEventWindow} loadedGroupData={loadedGroupData}/>
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