const express = require('express');
const config = require('../config');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const ChatService = require('chat-service');

const chatPort = 8000

function onConnect (service, id) {
  // Assuming that auth data is passed in a query string.
  let { query } = service.transport.getHandshakeData(id)
  let { userName } = query

  // Actually check auth data.
  // ...
  // Return a promise that resolves with a login string.
  return Promise.resolve(userName)
}

const chatService = new ChatService({chatPort}, {onConnect})

process.on('SIGINT', () => chatService.close().finally(() => process.exit()))


chatService.hasRoom('ipp').then(hasRoom => {
  if (!hasRoom) {
    return chatService.addRoom('ipp', { owner: 'admin' })
  }
})



// Require Paths for Network Components

const {
  logErrors,
  errorHandler,
} = require('../utils/middlewares/errorsHandler');

//  Paths 

const auth = require('./components/auth/auth-network');


// Global MiddleWares 
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Use Paths

app.use('/api/auth',auth);

app.use(logErrors);
app.use(errorHandler);




app.listen(config.api.port, () =>{
  console.log("Server Listening http://localhost:"+config.api.port);
});