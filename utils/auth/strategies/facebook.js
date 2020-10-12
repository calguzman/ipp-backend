const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const axios = require("axios");
const config = require("../../../config/index");
const boom = require('boom');

passport.use(
  new FacebookStrategy(
    {
      // clientID: config.facebookClientId,
      clientID:config.api.facebookClientId,
      // clientSecret: config.facebookClientSecret,
      clientSecret: config.api.facebookClientSecret,
      callbackURL: `${config.api.apiUrl}/api/auth/facebook/callback`,
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
