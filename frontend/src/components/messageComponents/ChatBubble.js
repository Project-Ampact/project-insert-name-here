import React from 'react'
import './ChatBubble.css'

function ChatBubble({msg}) {
  return (
    <div>
      <div className={`chat-bubble ${msg.type}`}>
          <p>{msg.message}</p>
      </div>
      <div className="chat-meta">{msg.type === 'recieve'}</div>
    </div>
  )
}

export default ChatBubble;