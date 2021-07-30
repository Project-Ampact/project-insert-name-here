// for misc. helper functions

const Chatroom = require("./models/chatroom");
const Message = require("./models/message");

async function retrieveBacklog(user1, user2) {
    let chatroom = await Chatroom.findOne({"members":
        {$all: [user1, user2]}}).populate({
          path: "messageLog",
          model: "Message",
          options: {
            limit: 50
          }
       });
    if (!chatroom) return [];

    return chatroom.messageLog;
}

async function storeMessage(user1, user2, message) {
    let chatroom = await Chatroom.findOne({"members":
      {$all: [user1, user2]}});
    if (!chatroom) {
      chatroom = await new Chatroom({
        members: [user1, user2],
        messageLog: []
      });
    }

    let date = Date.now();
    let msg = await new Message({
        message: message.message, 
        from: message.from,
        date: date
    });

    chatroom.lastMessage = date;
    chatroom.messageLog.push(msg._id);
    msg.save();
    chatroom.save();
  }

module.exports = {
    retrieveBacklog,
    storeMessage
}