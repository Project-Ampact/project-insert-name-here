import {React} from 'react';
import { Button, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import APIAccess from "../../controller";

const PERSONAL_COLOR = '#54e0ff';
const GROUP_COLOR = '#80eb34';
const GENERAL_COLOR = '#ff5454';
const ASSIGNMENT_COLOR = '#f5c542';

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
  } else if (eventData.type === 'assignment') {
    typeColor = ASSIGNMENT_COLOR
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

export default EventPopup;