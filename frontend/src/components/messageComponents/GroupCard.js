import {React} from 'react';
import { Button, Card } from 'react-bootstrap';
import '../groupComponents/groupProfile/Group.css'

function GroupCard({groupData}) {
  return (
    <Card key={groupData._id}>
      <Card.Body>
        <a className="links" style={{ cursor: "pointer" }} href={`http://localhost:3000/groupProfile/${groupData._id}`}>
          <Card.Img className="cus-img" src={groupData.picture}></Card.Img>
          <Card.Title className="cus-title">{groupData.name}</Card.Title>
          <Card.Text>{groupData.about}</Card.Text>
        </a>
        {/* TODO: implement group chat link here */}
        <Button className="mt-2">Message</Button>
      </Card.Body>
  </Card>
  )
}

export default GroupCard;