import React from "react";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import PageLayout from "./DefaultPage";
import './CalendarPage.css'

const mock_data = [
  {
    title: 'Sprint Meeting',
    start: new Date('July 10, 2021 03:00:00'),
    end: new Date('July 10, 2021 05:00:00')
  },
  {
    title: 'Sprint Meeting',
    start: new Date('July 12, 2021 12:00:00'),
    end: new Date('July 12, 2021 13:00:00')
  }
]

function CalendarPage() {
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
          events={mock_data}
          />
      </div>
    </PageLayout>
  )
}

export default CalendarPage;