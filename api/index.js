const express = require('express');
const config = require('../config');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');

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