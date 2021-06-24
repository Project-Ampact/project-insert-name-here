import Card from 'react-bootstrap/Card';
import "./VideoTagSection.css";

function VideoPreview(props) {
  /*  const videoSelectedCallback = async (e) => {
        e.preventDefault();
      };*/
//onClick={videoSelectedCallback}
let videoLink = "http://localhost:3000/video/" + props.id;
//console.log(toString(props._id));
//let videoLink = "http://localhost:3000/video/60d4c24fe069ec38e4248dc3";
    return(
        <Card key={props.key}>
            <a className="links" style={{ cursor: 'pointer' }} href= {videoLink} >
            <Card.Img variant="top" src= {props.picture}/>
            <Card.Body>
                <Card.Title>{props.title}</Card.Title>
                <Card.Text>{props.description}</Card.Text>
            </Card.Body>
            </a>
        </Card>
    )
}; 

export default VideoPreview; 