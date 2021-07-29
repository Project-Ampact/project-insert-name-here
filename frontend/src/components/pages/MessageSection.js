import {React, useEffect, useRef, useState} from "react";
import { Button, InputGroup, FormControl, Form } from "react-bootstrap";
import './MessageSection.css'
import ChatBubble from "../messageComponents/ChatBubble";
import PageLayout from "./DefaultPage";
import io from 'socket.io-client';
import { useParams } from "react-router";

const mock_data = [
  {
    message: 'Hello good sir',
    type: 'self'
  },
  {
    message: 'How are you',
    type: 'recieve'
  },
]

const socket = io('http://localhost:8000', {autoConnect: false});

function MessageSection() {
  const {uid} = useParams();
  const [messageData, setMessageData] = useState(mock_data)
  const [currentMessage, setCurrentMessage] = useState('')
  const [newMessage, setNewMessage] = useState({})
  const bottom = useRef(null);
  const username = document.cookie.split("user=")[1].split("%20")[0];

  useEffect(() => {
    bottom.current.scrollIntoView();
  }, [messageData])

  useEffect(() => {
    socket.auth = {username};
    socket.connect();
  }, [])

  useEffect(() => {
    socket.on('connection', () => {
      console.log("Hello!");
    })
  }, [])

  useEffect(() => {
    socket.on('private message', ({message, from}) => {
      if (from == uid) {
        setNewMessage({
            message: message,
            type: 'recieve'
          })
      }
    });
  }, [])

  useEffect(() => {
    setMessageData(
      messageData.concat(
        newMessage
      )
    )
  }, [newMessage])

  const setMessage = (event) => {
    event.preventDefault();
    setCurrentMessage(event.target.value)
  }

  const sendMessage = (e) => {
    e.preventDefault()

    if (currentMessage.trim()) {
      socket.emit('private message', {
        message: currentMessage,
        to: uid
      });
      setMessageData(messageData.concat({message: currentMessage, type: 'self'}))
      setCurrentMessage('')
      document.getElementById('textbox').value = ''
    }
  }

  return (
    <PageLayout>
      <div className="message-page">
        <header className="message-header">
            <h1>{uid}</h1>
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