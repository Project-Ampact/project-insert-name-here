import Card from "react-bootstrap/Card";
import "./Groups.css";

function Groups(props) {
  let groupLink = "http://localhost:3000/groupProfile/" + props.gid;

  return (
    <Card key={props.key}>
      <a className="links" style={{ cursor: "pointer" }} href={groupLink}>
        <Card.Body>
          <Card.Img className="cus-img" src={props.picture}></Card.Img>
          <Card.Title className="cus-title">{props.name}</Card.Title>
          <Card.Text>{props.about}</Card.Text>
        </Card.Body>
      </a>
    </Card>
  );
}

export default Groups;
