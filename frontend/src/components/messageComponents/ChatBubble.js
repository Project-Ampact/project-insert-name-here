import react from 'react'
import './ChatBubble.css'

function ChatBubble({msg}) {
  return (
    <div className="chat-bubble">
        <p>{msg}</p>
    </div>
  )
}

export default ChatBubble;