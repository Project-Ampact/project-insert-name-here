import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Card, Button, Container } from "react-bootstrap";
import "./Group.css";
import "../groups/Groups.css";
import APIAccess from "../../../controller.js";

/*function GroupProfileContent() {
    return (
     
    )
  }*/

function Group(props) {
  //let {gid} = useParams()
  const removeMember = async (e) => {
    e.preventDefault();
    try {
      let _id = document.getElementById("_id").value;
      console.log(_id);
      await APIAccess.removeMember(props.gid, _id);
      console.log("Made it here");
    } catch (err) {
      console.log(err);
    }
  };
  const addMember = async (e) => {
    e.preventDefault();
    try {
      let _id = document.getElementById("_id").value;
      console.log(_id);
      await APIAccess.addMember(props.gid, _id);
      console.log("Made it here");
    } catch (err) {
      console.log(err);
    }
  };

  let editGroupProfile = "http://localhost:3000/groupProfile/edit/" + props.gid;

  return (
    <Container className="mt-3 profile container-fluid">
      <Row className="row2 container-fluid">
        <Col>
          <Card className="mb-3 groupProfile" style={{ color: "#000" }}>
            <Card.Img className="group-img" src={props.groupData.picture} />
            <Card.Body>
              <Card.Title className="group-title">
                {props.groupData.name}
              </Card.Title>
              <form>
                <fieldset>
                  <label for="_id">MemberID:</label>
                  <div class="wrapper-register">
                    <input type="register" name="_id" id="_id" placeholder="" />
                    <Button
                      type="submit"
                      onClick={addMember}
                      className="gbutton"
                      variant="primary"
                    >
                      Add member
                    </Button>
                    <Button
                      type="submit"
                      onClick={removeMember}
                      className="gbutton"
                      variant="primary"
                    >
                      Remove Member
                    </Button>
                    <Button
                      type="submit"
                      onClick={editGroupProfile}
                      href={editGroupProfile}
                      className="gbutton"
                      variant="primary"
                    >
                      Edit
                    </Button>
                  </div>
                </fieldset>
              </form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="container-fluid">
        <Col>
          <Card className="mb-3 groupProfile" style={{ color: "#000" }}>
            <Card.Body>
              <Card.Title className="group-about">About</Card.Title>
              <Card.Text>{props.groupData.about}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Group;
