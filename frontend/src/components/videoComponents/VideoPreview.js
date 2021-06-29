import Card from 'react-bootstrap/Card';
import "./VideoTagSection.css";

function VideoPreview(props) {
    
//onClick={videoSelectedCallback}
let videoLink = "http://localhost:3000/video/" + props.id;
    return(
        <Card className="custom-card" key={props.key}>
            <a className="links" style={{ cursor: 'pointer' }} href= {videoLink} >
            <Card.Img className="custom-card-img" variant="top" src= {props.picture}/>
            <Card.Body className="custom-card-body">
                <Card.Title>{props.title}</Card.Title>
                <Card.Text>{props.description}</Card.Text>
            </Card.Body>
            </a>
        </Card>
    )
}; 

export default VideoPreview; 