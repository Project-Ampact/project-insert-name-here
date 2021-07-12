import "./Post.css";
import {
  Row,
  Container,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import CommentSection from "../commentComponents/CommentSection";
function Post(props) {
  //let postLink = "http://localhost:3000/postFeed/" + props.gid;

  return (
    <Container>
    <div class="card" id="post-wrapper"> 
      <div class="card-body rounded" id="post-body">
      <h3 class="card-title" id="post-user">{props.user}</h3>
      <div class="grid-container">
      <h6 className="text-secondary" id="post-type">Type: {props.type}</h6>
       <h6 className="text-secondary" id="post-date">{props.date}</h6>
       </div>
       <p id="post-content">{props.content}</p>
       </div>
       <CommentSection></CommentSection>
    </div>
  </Container>
  );
}

export default Post;
