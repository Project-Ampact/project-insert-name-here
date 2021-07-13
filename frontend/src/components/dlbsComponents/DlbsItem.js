import Card from "react-bootstrap/Card";
import "./Dlbs.css";

function DlbsItem(props) {
  let submitDlbs = "http://localhost:3000/Dlbs/submit/"; //+ props.id;

  return (

  <Row className="row2 container-fluid">
    <Col>
    <Card key={props.key} className="mb-3 groupProfile">
        <Card.Body>
          <Card.Title className="group-title">
          {props.name}
          </Card.Title>
          <Card.Text>
          <div className="deadline"> Deadlines: {props.ddl} </div> </Card.Text>
          <Button className="floatRight" href={submitDlbs} variant="primary" type="submit">
          Details
          </Button>
        </Card.Body>
    </Card>
    </Col>
 </Row>
  );
}

export default DlbsItem;
