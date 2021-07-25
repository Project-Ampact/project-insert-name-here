import {React, useEffect, useRef, useState} from "react";
import { Button, InputGroup, FormControl, Form } from "react-bootstrap";
import './MessageSection.css'
import ChatBubble from "../messageComponents/ChatBubble";
import PageLayout from "./DefaultPage";

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
  const [messageData, setMessageData] = useState(mock_data)
  const [currentMessage, setCurrentMessage] = useState('')
  const bottom = useRef(null);

  useEffect(() => {
    bottom.current.scrollIntoView();
  }, [messageData])

  const setMessage = (event) => {
    event.preventDefault();
    setCurrentMessage(event.target.value)
  }

  const sendMessage = (e) => {
    e.preventDefault()

    if (currentMessage.trim()) {
      setMessageData(messageData.concat({message: currentMessage, type: 'self'}))
      setCurrentMessage('')
      document.getElementById('textbox').value = ''
    }
  }

  return (
    <PageLayout>
      <div className="message-page">
        <header className="message-header">
            <h1>Tom Smith</h1>
        </header>
        <div className="message-log" id="latest-message">
          {messageData && messageData.map(x => <ChatBubble msg={x}/>)}
          <div ref={bottom}/>
        </div>
        <Form onSubmit={sendMessage}>
          <InputGroup className="send-message">
            <FormControl style={{resize: 'none'}} onChange={setMessage} id="textbox"/>
            <InputGroup.Append>
                <Button onClick={sendMessage}>Send</Button>
            </InputGroup.Append>
          </InputGroup>
        </Form>
      </div>
    </PageLayout>
  )
}

export default MessageSection;