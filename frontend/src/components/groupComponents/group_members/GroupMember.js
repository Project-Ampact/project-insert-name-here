import Card from "react-bootstrap/Card";
import "../groups/Groups.css";

function GroupMember(props) {
  let groupMemberLink = "http://localhost:3000/profile/" + props.uid;

  return (
    <Card key={props.key}>
      <a className="links" style={{ cursor: "pointer" }} href={groupMemberLink}>
        <Card.Body>
          <Card.Title className="cus-title">{props.name}</Card.Title>
          <Card.Text>{props.role}</Card.Text>
        </Card.Body>
      </a>
    </Card>
  );
}

export default GroupMember;
