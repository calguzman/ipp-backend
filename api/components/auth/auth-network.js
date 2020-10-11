const express = require('express');
const passport = require('passport');
const response = require('../../../network/response');
const boom = require('boom');
const jwt = require('jsonwebtoken');
const config = require('../../../config');
const cookieParser = require('cookie-parser');
const UserController = require('../users/user-controller');
const ApiKeysController = require('../api_keys/api_key_controller');

const userController = new UserController();
const apiKeyTokenController = new ApiKeysController();


// Basic strategy
require("../../../utils/auth/strategies/basic");

const router = express.Router();

const {
  userSchema,
  createUserSchema,
  createProviderUserSchema
} = require('../../../utils/schemas/users');

const validationHandler = require('../../../utils/middlewares/validationHandler');


// Route for Users Accounts

router.post('/sign-in', sign_in);
router.post('/sign-up',validationHandler(createUserSchema), sign_up);


async function sign_in (req,res,next){
  try {
    const {apiKeyToken} = req.body;
    // Validate API TOKEN
    if(!apiKeyToken){
      next(boom.unauthorized('apiKeyToken is required...'));
    }
    
    passport.authenticate('basic',function(error,user){
      try {
        if(error || !user){
          next(boom.unauthorized('....UnAuthorized...'));
        }
        else{
          req.login(user,{session:false}, async function (err){
            if(err){
              next(err);
            }
            
            const apikey = await apiKeyTokenController.getApiKeyToken({"token":apiKeyToken});    
        
              if(!apikey){
                next(boom.unauthorized());
              }
  
              const {_id, name, email} = user;
              console.log("USER ID SEARCH");
              console.log(user);
  
              const payload = {
                sub:_id,
                name,
                email,
                scopes:apikey.scopes
              }
              const token = jwt.sign(payload,config.api.authJwtSecret,{
                expiresIn:'30m'
              });

              const userToReturn = {
                userId:_id,
                token:token,
                ...payload,
              }
              delete userToReturn.sub;
              // delete userToReturn.scopes;
              response.success(req,res,'Success Login',200,userToReturn);
          })
        }
      } 
      catch (error) {
        next(error);
      }
    })(req,res,next); // REVISAR CLOUSURE

  } catch (err) {
    next(err);
  }
}

async function sign_up(req,res,next){ 
  const user = req.body;
  try {
    const findUser = await userController.getUser(user);
    if(findUser){
      next(boom.unauthorized('Email Already Exist'));
    }
    else{
      const idNewUser = await userController.createUser({user});
      const newUser = {
        id:idNewUser
      }
      response.success(req,res,'Success',201,newUser);
    }
  } catch (error) {
      console.log(error);
      next(error);
  }
}


/* -------------------------------------------------------------------------- */
/*                           Facebook Authentication                          */
/* -------------------------------------------------------------------------- */

// router.get("/auth/facebook", passport.authenticate("facebook"), {
//   scope: ["email", "profile", "openid"]
// });

// router.get("/auth/facebook/callback",
//   passport.authenticate("facebook", { session: false }),
//   function(req, res, next) {
//     if (!req.user) {
//       next(boom.unauthorized());
//     }

//     const { token, ...user } = req.user;

//     console.log(req.user);

//     res.cookie("token", token, {
//       httpOnly: !config.dev,
//       secure: !config.dev
//     });

//     res.status(200).json(user);
//   }
// );

module.exports = router;