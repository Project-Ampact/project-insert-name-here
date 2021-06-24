import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { CardDeck, Carousel, Row, Col, Card, Button, Container } from "react-bootstrap";
import "./VideoTagSection.css";
import VideoPreview from './VideoPreview'; 
//import APIAccess from "../../../controller.js";


function VideoTagSection(props) {
  //let {gid} = useParams()
  
  var items = []
  let cItem = 3;
  var tempItems;
  var renderCards = [];
  for (let i=0; i < props.videos.length; i = i + cItem) {
    tempItems = props.videos.slice(i, i + cItem);
    renderCards = tempItems.map(video => (
        <VideoPreview key={video._id} title={video.title} picture={video.picture} id={video._id} description={video.description}/>
    ));
    items.push( 
        <Carousel.Item>
            <CardDeck className="cardDeck">
                {renderCards}
            </CardDeck>
        </Carousel.Item>
    )
  }

  return (
      <Container className="mt-3 profile container-fluid">
        <Row className="row2 container-fluid"> 
            <Col>
                <h1> {props.section} </h1>
                <Carousel>
                    {items}
                </Carousel>
            </Col>
        </Row>
      </Container>
  );
}

export default VideoTagSection;
