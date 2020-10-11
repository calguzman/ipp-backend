const passport = require("passport");
const { BasicStrategy } = require("passport-http");
const bcrypt = require('bcrypt');
const config = require('../../../config');
const boom = require('boom');
const UserController = require ('../../../api/components/users/user-controller');
const userController = new UserController();

passport.use(
  new BasicStrategy(async function(email, password, cb) {
    try {
      const user = await userController.getUser({email});
      if (!user) {
        return cb(boom.unauthorized(), false);
      }
      if (!(await bcrypt.compare(password, user.password))) {
        return cb(boom.unauthorized(), false);
      }
      delete user.password;
    
      
      return cb(null, user);

    } catch (error) {
      return cb(error);
    }
  })
);
