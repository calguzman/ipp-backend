const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const axios = require("axios");
const config = require("../../../config/index");
const boom = require('boom');

passport.use(
  new FacebookStrategy(
    {
      // clientID: config.facebookClientId,
      clientID: "371953133939916",
      // clientSecret: config.facebookClientSecret,
      clientSecret: "a0cf2b722641f7b4ceb21f39b760036f",
      callbackURL: "http://localhost:8080/api/auth/facebook/callback",
      profileFields: ["id", "displayName", "photos", "email"],
    },
    async function (accessToken, refreshToken, profile, done) {
      
      // Validate Belongs To 
      const { data, status } = await axios({
        url: `https://graph.facebook.com/v8.0/me/groups?access_token=${accessToken}`,
        method: "get",
      });
      const group = data.data.filter(group =>group.id == config.api.facebookGroupIdFilter);

      if(group.length==0){
        return done(boom.unauthorized(), false);
      }
      else{
        console.log("You are a member! YEa!");
        const { data, status } = await axios({
          url: `${config.api.apiUrl}/api/auth/sign-provider`,
          method: "post",
          data: {
              facebookId: profile.id,
              name: profile.displayName,
              email: profile.emails[0].value,
              password: profile.id,
          }
        });

        if (!data || status !== 200) {
          return done(boom.unauthorized(), false);
        }
  
        return done(null, data);
      }
    }
  )
);
