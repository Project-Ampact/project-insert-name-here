import Card from "react-bootstrap/Card";
import "./UserProfileList.css"

function UserProfileItem(props) {
  let usernameText = `User: ${props.username}`;
  let nameText;
  if (props.firstName && props.lastName) {
    nameText = `Name: ${props.firstName} ${props.lastName}`;
  } else {
    nameText = `Name: None set`;
  }
  let userLink = "http://localhost:3000/profile/" + props.username;

  return (
    <Card key={props.key}>
      <a className="links" style={{ cursor: "pointer" }} href={userLink}>
        <Card.Body>
          <Card.Title className="big-text">{usernameText}</Card.Title>
          <Card.Text>{nameText}</Card.Text>
        </Card.Body>
      </a>
    </Card>
  );
}

export default UserProfileItem;
