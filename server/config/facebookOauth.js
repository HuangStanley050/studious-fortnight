const passport = require("passport");
const FacebookStrategy = require("passport-github2").Strategy;

passport.use(
  "facebook",
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT,
      clientSecret: process.env.FACEBOOK_SECRET,
      callbackURL: "/auth/facebook/callback",
      proxy: true
    },
    (accessToken, refreshToken, profile, cb) => {
      console.log(profile);
    }
  )
);
