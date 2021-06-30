import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  CardDeck,
  Carousel,
  Row,
  Container,
} from "react-bootstrap";
import "./VideoTagSection.css";
import VideoPreview from "./VideoPreview";
//import APIAccess from "../../../controller.js";

function VideoTagSection(props) {
  //let {gid} = useParams()

  var items = [];
  let cItem = 3;
  var tempItems;
  var renderCards = [];
  for (let i = 0; i < props.videos.length; i = i + cItem) {
    tempItems = props.videos.slice(i, i + cItem);
    renderCards = tempItems.map((video) => (
      <VideoPreview
        key={video._id}
        title={video.title}
        picture={video.picture}
        id={video._id}
        description={video.description}
      />
    ));
    items.push(
      <Carousel.Item className="custom-carousel-item">
        <CardDeck className="cardDeck">{renderCards}</CardDeck>
      </Carousel.Item>
    );
  }

  return (
    <Container fluid className="mt-3 vid-section profile container-fluid">
      <Row className="row-section">
        <h1 className="sec-name"> {props.section} </h1>
        <Carousel className="custom-carousel">{items}</Carousel>
      </Row>
    </Container>
  );
}

export default VideoTagSection;
