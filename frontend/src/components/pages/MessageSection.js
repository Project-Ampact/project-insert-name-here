import {React} from "react";
import { Button, InputGroup, FormControl, ButtonGroup } from "react-bootstrap";
import './MessageSection.css'
import ChatBubble from "../messageComponents/ChatBubble";

const mock_data = [
  {
    message: 'Hello good sir',
    type: 'self'
  },
  {
    message: 'How are you',
    type: 'recieve'
  },
  {
    message: 'big bobbig bobbig bobbig bobbig bobbig bobbig bobbig bobbig bobbig bobbig bobbig bobbig bobbig bob',
    type: 'self'
  },
  {
    message: 'big bobbig bobbig bobbig bobbig bobbig bobbig bobbig bobbig bobbig bobbig bobbig bobbig bobbig bob',
    type: 'self'
  },
  {
    message: 'big bobbig bobbig bobbig bobbig bobbig bobbig bobbig bobbig bobbig bobbig bobbig bobbig bobbig bob',
    type: 'self'
  },
  {
    message: 'big bobbig bobbig bobbig bobbig bobbig bobbig bobbig bobbig bobbig bobbig bobbig bobbig bobbig bob',
    type: 'self'
  },
  {
    message: 'big bobbig bobbig bobbig bobbig bobbig bobbig bobbig bobbig bobbig bobbig bobbig bobbig bobbig bob',
    type: 'self'
  },
  {
    message: 'big bobbig bobbig bobbig bobbig bobbig bobbig bobbig bobbig bobbig bobbig bobbig bobbig bobbig bob',
    type: 'self'
  },
  {
    message: 'big bobbig bobbig bobbig bobbig bobbig bobbig bobbig bobbig bobbig bobbig bobbig bobbig bobbig bob',
    type: 'self'
  },
  {
    message: 'big bobbig bobbig bobbig bobbig bobbig bobbig bobbig bobbig bobbig bobbig bobbig bobbig bobbig bob',
    type: 'recieve'
  },
  {
    message: 'big bobbig bobbig bobbig bobbig bobbig bobbig bobbig bobbig bobbig bobbig bobbig bobbig bobbig bob',
    type: 'self'
  },
  {
    message: 'big bobbig bobbig bobbig bobbig bobbig bobbig bobbig bobbig bobbig bobbig bobbig bobbig bobbig bob',
    type: 'self'
  },
]

function MessageSection() {

  return (
    <div className="message-page">
      <header className="message-header">
          <h1>Tom Smith</h1>
      </header>
      <div className="message-log">
        {mock_data.map(x => <ChatBubble msg={x}/>)}
      </div>
      <InputGroup className="send-message">
        <FormControl style={{resize: 'none'}} as="textarea"/>
        <InputGroup.Append>
            <Button>Send</Button>
        </InputGroup.Append>
      </InputGroup>
    </div>
  )
}

export default MessageSection;