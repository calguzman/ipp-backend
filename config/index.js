require("dotenv").config();

module.exports = {
  api:{
    port: process.env.SERVER_API_PORT || 3000,
    defaultAdminUsername:process.env.DEFAULT_ADMIN_USERNAME,
    defaultAdminPassword:process.env.DEFAULT_ADMIN_PASSWORD,
    defaultAdminEmail:process.env.DEFAULT_ADMIN_EMAIL,
    authJwtSecret:process.env.AUTH_JWT_SECRET,
    publicKey:process.env.PUBLIC_API_KEY_TOKEN,
    adminKey:process.env.ADMIN_API_KEY_TOKEN,
    devMode:process.env.DEV_MODE,
    facebookClientId:process.env.FACEBOOK_CLIENT_ID,
    facebookClientSecret:process.env.FACEBOOK_CLIENT_SECRET,
  },
  db:{
    username:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME,
    host:process.env.DB_HOST,
  },
  devMode:process.env.MODE,
}