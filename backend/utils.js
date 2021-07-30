// for misc. helper functions

function retrieveBacklog(user1, user2) {
    return [
        {
          message: 'Hello good sir',
          from: 'laragomez', 
          to: 'raymondma' 
        },
        {
          message: 'How are you',
          from: 'raymondma',
          to: 'laragomez' 
        },
    ]
}

function storeMessage(user1, user2, message) {
}

module.exports = {
    retrieveBacklog,
    storeMessage
}