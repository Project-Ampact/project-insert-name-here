import React from "react";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import PageLayout from "./DefaultPage";
import './CalendarPage.css'

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

function CalendarPage() {

  const convertData = data => {
    let eventColor;
    if (data.type === 'personal') eventColor = '#54e0ff'
    else if (data.type === 'group') eventColor = '#80eb34'
    else if (data.type === 'general') eventColor = '#ff5454'
    return {...data, color: eventColor}
  }

  return (
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
          />
      </div>
    </PageLayout>
  )
}

export default CalendarPage;