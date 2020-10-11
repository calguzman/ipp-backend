const express = require('express');
const response = require('../../../network/response.js');
const UsersController = require('../users/user-controller');
const router = express.Router();


/* -------------------------------------------------------------------------- */
/*                               Paths for Users                              */
/* -------------------------------------------------------------------------- */


// Get User 
router.get('/:userId', getUserById);

// Get All Users
router.get('/', getAllUsers);

// createOrUpdate User
router.post('/', createOrUpdateUser);
  
// Remove User
router.delete('/:userId', removeUser);
// Functions for User Paths


/* -------------------------------------------------------------------------- */
/*                                  Get User                                  */
/* -------------------------------------------------------------------------- */
 

async function getUserById(req,res,next){
  try {

  } catch (error) {
    
  }
  res.send("ok").status(200);
}


/* -------------------------------------------------------------------------- */
/*                                Get All Users                               */
/* -------------------------------------------------------------------------- */

async function getAllUsers(req,res,next){
  try {
    
  } catch (error) {
  
  }
}

/* -------------------------------------------------------------------------- */
/*                             createOrUpdate User                            */
/* -------------------------------------------------------------------------- */

async function createOrUpdateUser(req,res,next){
  console.log("Recibido");
  res.send("ok").status(200);
}
/* -------------------------------------------------------------------------- */
/*                                 Remove User                                */
/* -------------------------------------------------------------------------- */

async function removeUser(req,res,next){
  console.log("Recibido");
  res.send("ok").status(200);
}

module.exports = router;